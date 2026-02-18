// JWT utility functions for decoding and handling tokens

export const decodeJWT = (token) => {
  try {
    // JWT tokens have 3 parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }
    
    // Decode the payload (second part)
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));
    
    return decoded;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

export const getTokenPayload = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) return null;
  
  return decodeJWT(token);
};

export const getUserRole = () => {
  const payload = getTokenPayload();
  return payload?.role || null;
};

export const getUserId = () => {
  const payload = getTokenPayload();
  return payload?.id || null;
};

export const isTokenExpired = () => {
  const payload = getTokenPayload();
  if (!payload || !payload.exp) return true;
  
  // Check if current time is past expiration time
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > payload.exp;
};

export const isUserAuthenticated = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return token && !isTokenExpired();
};
