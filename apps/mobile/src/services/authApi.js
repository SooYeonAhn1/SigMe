import { Platform } from "react-native";

const ENV_BASE_URL = process.env.EXPO_PUBLIC_AUTH_API_BASE_URL; // port: 8081
const GOOGLE_LOGIN_ENDPOINT_PATH = "/auth/google";
const GOOGLE_DELETE_ENDPOINT_PATH = "api/users/delete"; // "/auth/google/delete";
const LOCAL_ENDPOINT_PATH_REGISTER = "/api/register";
const LOCAL_ENDPOINT_PATH_LOGIN = "/api/login";

const GOOGLE_AUTH_API_URL_LOGIN = (() => {
  try {
    const url = new URL(ENV_BASE_URL);

    if (Platform.OS === "android") {
      return `http://10.0.2.2:${url.port}${GOOGLE_LOGIN_ENDPOINT_PATH}`;
    }

    return `${ENV_BASE_URL}${GOOGLE_LOGIN_ENDPOINT_PATH}`;
  } catch (e) {
    console.error("Invalid AUTH_API_BASE_URL format in .env file:", e);
    return `${ENV_BASE_URL}${GOOGLE_LOGIN_ENDPOINT_PATH}`; // Fallback, though likely to fail
  }
})();


const GOOGLE_AUTH_API_URL_DELETE = (() => {
  try {
    const url = new URL(ENV_BASE_URL);

    if (Platform.OS === "android") {
      return `http://10.0.2.2:${url.port}${GOOGLE_DELETE_ENDPOINT_PATH}`;
    }

    return `${ENV_BASE_URL}${GOOGLE_DELETE_ENDPOINT_PATH}`;
  } catch (e) {
    console.error("Invalid AUTH_API_BASE_URL format in .env file:", e);
    return `${ENV_BASE_URL}${GOOGLE_DELETE_ENDPOINT_PATH}`; // Fallback, though likely to fail
  }
})();


const LOCAL_AUTH_API_URL_REGISTER = (() => {
  try {
    const url = new URL(ENV_BASE_URL);

    if (Platform.OS === "android") {
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

    if (Platform.OS === "android") {
      return `http://10.0.2.2:${url.port}${LOCAL_ENDPOINT_PATH_LOGIN}`;
    }

    return `${ENV_BASE_URL}${LOCAL_ENDPOINT_PATH_LOGIN}`;
  } catch (e) {
    console.error("Invalid AUTH_API_BASE_URL format in .env file:", e);
    return `${ENV_BASE_URL}${LOCAL_ENDPOINT_PATH_LOGIN}`; // Fallback, though likely to fail
  }
})();

export const authGoogleLogin = async (code, redirectUri) => {
  console.log("redirectUri authApi:", redirectUri);
  try {
    const response = await fetch(GOOGLE_AUTH_API_URL_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        redirectUri: redirectUri,
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Backend authentication failed." }));
      throw new Error(errorData.message || "Backend authentication failed.");
    }

    const data = await response.json();
    console.log("successfully received data: ", data);

    return data;
  } catch (error) {
    console.error("Error in authGoogleUserWithBackend:", error);
    throw error;
  }
};

export const authGoogleDelete = async (accessToken, refreshToken) => {
const tokenToRevoke = refreshToken || accessToken;
  try {
    const response = await fetch(GOOGLE_AUTH_API_URL_DELETE, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenToRevoke}`,
      },
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Backend failed - Google Auth Account Deletion" }));
      throw new Error(errorData.message || "Backend failed - Google Auth Account Deletion");
    }
  } catch (error) {
    console.error("Error in authGoogleDelete:", error);
    throw error;
  }
};

export const registerUser = async (email, password) => {
  console.log("registerUser called with email: ", email);
  const registrationData = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(LOCAL_AUTH_API_URL_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    if (response.status === 409) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Email already taken." }));
      throw new Error("Email already taken.");
    }

    if (!response.ok) {
      // non 2xx returns
      const errorData = await response
        .json()
        .catch(() => ({ message: "Registration failed on the server." }));
      throw new Error(
        errorData.message || "Registration failed on the server."
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Frontend Error In authAPi:", error.message);
    console.log("LOCAL_AUTH_API_URL_REGISTER: ", LOCAL_AUTH_API_URL_REGISTER);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  console.log("loginUser called with email: ", email);
  const loginDAta = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(LOCAL_AUTH_API_URL_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDAta),
    });

    if (response.status === 401) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Invalid email or password" }));
      throw new Error("Invalid email or password");
    }

    if (response.status === 401) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "This account uses Google sign-in. Please use Google to log in." }));
      throw new Error("This account uses Google sign-in. Please use Google to log in.");
    }

    if (!response.ok) {
      // non 2xx returns
      const errorData = await response
        .json()
        .catch(() => ({ message: "login failed on the server." }));
      throw new Error(
        errorData.message || "login failed on the server."
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Frontend Error In authAPi:", error.message);
    console.log("LOCAL_AUTH_API_URL_LOGIN: ", LOCAL_AUTH_API_URL_LOGIN);
    throw error;
  }
};
