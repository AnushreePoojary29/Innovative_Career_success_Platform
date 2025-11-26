import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { SiweMessage } from 'siwe';

// Backend API base URL. Use Vite env var when available, otherwise default to localhost:5005
const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [address, setAddress] = useState(null);
  const [role, setRole] = useState(null); // 'student' | 'officer' | null

  useEffect(() => {
    // On mount, check session with backend
    (async () => {
      try {
        const resp = await fetch(`${API_BASE}/auth/me`, { credentials: 'include' });
        const json = await resp.json().catch(() => null);
        if (json && json.authenticated) {
          setIsAuthenticated(true);
          setAddress(json.address);
          // For now, assume existing sessions are students if address is present
          // In a real app, the backend should return the role
          setRole(json.role || 'student');
        }
      } catch (err) {
        // ignore
      }
    })();
  }, []);

  const loginWithMetaMask = async () => {
    if (typeof window === 'undefined' || !window.ethereum) throw new Error('MetaMask not found');

    const provider = new BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
    const lower = addr.toLowerCase();

    // Fetch nonce from backend
    const nonceResp = await fetch(`${API_BASE}/auth/nonce?address=${lower}`);
    if (!nonceResp.ok) throw new Error('Failed to fetch nonce');
    const { nonce } = await nonceResp.json();

    const message = new SiweMessage({
      domain: window.location.host,
      address: addr,
      statement: 'Sign in to Placement Dashboard',
      uri: window.location.origin,
      version: '1',
      chainId: 1,
      nonce
    });

    const prepared = message.prepareMessage();
    const signature = await signer.signMessage(prepared);

    // Send to backend for verification (cookie-based session will be set)
    const verifyResp = await fetch(`${API_BASE}/auth/verify`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prepared, signature })
    });
    if (!verifyResp.ok) {
      const err = await verifyResp.json().catch(() => ({}));
      throw new Error(err.message || 'SIWE verification failed');
    }

    const result = await verifyResp.json();
    setIsAuthenticated(true);
    setAddress(result.address || addr);
    setRole('student');
    return result;
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch (err) {
      // ignore
    }
    setIsAuthenticated(false);
    setAddress(null);
    setRole(null);
  };

  const loginBasic = async (email, password) => {
    // TODO: Implement actual backend auth
    console.log("Logging in as Placement Officer:", email);
    setIsAuthenticated(true);
    setAddress(email); // Use email as address for now
    setRole('officer');
  };

  const signupBasic = async (email, password) => {
    // TODO: Implement actual backend auth
    console.log("Signing up as Placement Officer:", email);
    // For simulation, we just log them in immediately after signup
    setIsAuthenticated(true);
    setAddress(email);
    setRole('officer');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, address, role, loginWithMetaMask, loginBasic, signupBasic, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
