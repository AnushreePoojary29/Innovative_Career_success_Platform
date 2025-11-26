const fetch = require('node-fetch');
const { Wallet } = require('ethers');
const { SiweMessage } = require('siwe');

(async () => {
  try {
    const API = process.env.API || 'http://localhost:5005';
    // create a random wallet (for test only)
    const wallet = Wallet.createRandom();
    const address = await wallet.getAddress();
    console.log('Using test wallet', address);

    // 1) fetch nonce
    const nonceResp = await fetch(`${API}/auth/nonce?address=${address.toLowerCase()}`);
    const nonceJson = await nonceResp.json();
    console.log('nonce response:', nonceJson);
    const nonce = nonceJson.nonce;

    // 2) prepare SIWE message
    const message = new SiweMessage({
      domain: 'localhost:5174',
      address,
      statement: 'Sign in to Placement Dashboard',
      uri: 'http://localhost:5174',
      version: '1',
      chainId: 1,
      nonce,
    });
    const prepared = message.prepareMessage();
    console.log('Prepared message:\n', prepared);

    // 3) sign message
    const signature = await wallet.signMessage(prepared);
    console.log('Signature:', signature.substring(0,20) + '...');

    // 4) post to verify
    const verifyResp = await fetch(`${API}/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prepared, signature })
    });
    const verifyJson = await verifyResp.json().catch(() => null);
    console.log('verify status', verifyResp.status, verifyJson);
  } catch (err) {
    console.error('Test SIWE failed', err);
    process.exit(1);
  }
})();
