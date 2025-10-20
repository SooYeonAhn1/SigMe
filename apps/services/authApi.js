import { Platform } from 'react-native';

const ENV_BASE_URL = process.env.EXPO_PUBLIC_AUTH_API_BASE_URL; // port: 5000
const ENDPOINT_PATH = '/auth/google';

const AUTH_API_URL = (() => {
    try {
        const url = new URL(ENV_BASE_URL);
        
        if (Platform.OS === 'android') {
            return `http://10.0.2.2:${url.port}${ENDPOINT_PATH}`;
        }
        
        return `${ENV_BASE_URL}${ENDPOINT_PATH}`;

    } catch (e) {
        console.error("Invalid AUTH_API_BASE_URL format in .env file:", e);
        return `${ENV_BASE_URL}${ENDPOINT_PATH}`; // Fallback, though likely to fail
    }
})();

export const authenticateUserWithBackend = async (idToken) => {
  const response = await fetch(AUTH_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: idToken,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Backend authentication failed.' }));
    throw new Error(errorData.message || 'Backend authentication failed.');
  }

  // Expect your backend to return a session/JWT and user object
  return await response.json(); 
};