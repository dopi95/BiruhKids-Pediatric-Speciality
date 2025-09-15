import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Generate JWT Access Token (short-lived)
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '15m'
  });
};

// Generate JWT Refresh Token (long-lived)
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d'
  });
};

// Generate secure random token for password reset/email verification
export const generateSecureToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Hash token for database storage
export const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

// Verify refresh token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

// Generate both tokens
export const generateTokenPair = (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  
  return { accessToken, refreshToken };
};