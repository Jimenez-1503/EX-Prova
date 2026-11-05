const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';

// Garante que a chave existe e é interpretada no formato correto (ex: Hex de 64 chars -> 32 bytes)
const RAW_KEY = process.env.ENCRYPTION_KEY || '';
const SECRET_KEY = RAW_KEY.length === 64 
  ? Buffer.from(RAW_KEY, 'hex') 
  : Buffer.from(RAW_KEY.padEnd(32, '0').slice(0, 32), 'utf8');

if (SECRET_KEY.length !== 32) {
  throw new Error('ENCRYPTION_KEY deve ter 32 bytes (ou 64 caracteres hexadecimais).');
}

function encrypt(text) {
  if (!text) return text;

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return `${iv.toString('hex')}:${encrypted}`;
}

function decrypt(text) {
  if (!text) return text;
  
  // Se não contiver ':', assume que é texto puro antigo
  if (!text.includes(':')) return text;

  const [ivHex, encryptedText] = text.split(':');
  if (!ivHex || !encryptedText) return text;

  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

module.exports = { encrypt, decrypt };