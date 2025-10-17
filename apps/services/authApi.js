import { Platform } from 'react-native';
import { AUTH_API_BASE_URL } from '@env';

const ENV_BASE_URL = Config.AUTH_API_BASE_URL; // port: 5000
const ENDPOINT_PATH = '/api/auth/social';

const AUTH_API_URL = (() => {
    try {
        const url = new URL(ENV_BASE_URL);
        
        if (Platform.OS === 'android') {
            // Swap the host IP for the Android Emulator's reserved address (10.0.2.2)
            return `http://10.0.2.2:${url.port}${ENDPOINT_PATH}`;
        }
        
        // For iOS Simulator, physical devices, or web
        return `${ENV_BASE_URL}${ENDPOINT_PATH}`;

    } catch (e) {
        console.error("Invalid AUTH_API_BASE_URL format in .env file:", e);
        return `${ENV_BASE_URL}${ENDPOINT_PATH}`; // Fallback, though likely to fail
    }
})();

export const authenticateUserWithBackend = async (idToken, userInfo) => {
  const response = await fetch(AUTH_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idToken: idToken,
      // You can send basic profile info too, but the backend must verify the token!
      email: userInfo.email,
      name: userInfo.name,
    }),
  });

  if (!response.ok) {
    // The backend should return a specific error if user is already registered, etc.
    throw new Error('Backend authentication failed.');
  }

  // Expect your backend to return a session/JWT and user object
  return await response.json(); 
};