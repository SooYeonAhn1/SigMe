import { Platform } from 'react-native';

const ENV_BASE_URL = process.env.EXPO_PUBLIC_AUTH_API_BASE_URL; // port: 8081
const GOOGLE_ENDPOINT_PATH = '/auth/google';
const LOCAL_ENDPOINT_PATH_REGISTER = '/api/register';
const LOCAL_ENDPOINT_PATH_LOGIN = '/api/login';

const GOOGLE_AUTH_API_URL = (() => {
  try {
    const url = new URL(ENV_BASE_URL);

    if (Platform.OS === 'android') {
      return `http://10.0.2.2:${url.port}${GOOGLE_ENDPOINT_PATH}`;
    }

    return `${ENV_BASE_URL}${GOOGLE_ENDPOINT_PATH}`;

  } catch (e) {
    console.error("Invalid AUTH_API_BASE_URL format in .env file:", e);
    return `${ENV_BASE_URL}${GOOGLE_ENDPOINT_PATH}`; // Fallback, though likely to fail
  }
})();

const LOCAL_AUTH_API_URL_REGISTER = (() => {
  try {
    const url = new URL(ENV_BASE_URL);

    if (Platform.OS === 'android') {
      return `http://10.0.2.2:${url.port}${LOCAL_ENDPOINT_PATH_REGISTER}`;
    }

    return `${ENV_BASE_URL}${LOCAL_ENDPOINT_PATH_REGISTER}`;

  } catch (e) {
    console.error("Invalid AUTH_API_BASE_URL format in .env file:", e);
    return `${ENV_BASE_URL}${LOCAL_ENDPOINT_PATH_REGISTER}`; // Fallback, though likely to fail
  }
})();

const LOCAL_AUTH_API_URL_LOGIN = (() => {
  try {
    const url = new URL(ENV_BASE_URL);

    if (Platform.OS === 'android') {
      return `http://10.0.2.2:${url.port}${LOCAL_ENDPOINT_PATH_LOGIN}`;
    }

    return `${ENV_BASE_URL}${LOCAL_ENDPOINT_PATH_LOGIN}`;

  } catch (e) {
    console.error("Invalid AUTH_API_BASE_URL format in .env file:", e);
    return `${ENV_BASE_URL}${LOCAL_ENDPOINT_PATH_LOGIN}`; // Fallback, though likely to fail
  }
})();

export const authGoogleUserWithBackend = async (idToken) => {
  try {
    const response = await fetch(GOOGLE_AUTH_API_URL, {
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

    const data = await response.json();
    console.log("successfully received data: ", data);

    return data;
  } catch (error) {
    console.error('Error in authGoogleUserWithBackend:', error);
    throw error;
  }
};

export const registerUser = async (email, password) => {
  console.log("registerUser called with email: ", email);
  const registrationData = {
    email: email,
    password: password
  };

  try {
    const response = await fetch('LOCAL_AUTH_API_URL_REGISTER', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });

    if (response.status === 409) {
      const errorData = await response.json().catch(() => ({ message: 'Email already taken.' }));
      throw new Error('Email already taken.');
    }

    if (!response.ok) { // non 2xx returns
      const errorData = await response.json().catch(() => ({ message: 'Registration failed on the server.' }));
      throw new Error(errorData.message || 'Registration failed on the server.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Frontend Error In authAPi:', error.message);
    console.log("LOCAL_AUTH_API_URL_REGISTER: ", LOCAL_AUTH_API_URL_REGISTER);
    throw error;
  }
};