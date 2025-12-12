// apps/mobile/src/hooks/useGoogleAuth.jsx

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { authGoogleLogin } from "../services/authApi";
import { useAuth } from "./AuthContext";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [authSuccess, setAuthSuccess] = useState(false);
  const WEB_REDIRECT_URI =
    process.env.EXPO_PUBLIC_GOOGLE_API_BASE_URL || "http://127.0.0.1:5000";

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
    web: process.env.NODE_ENV === "development" ? WEB_REDIRECT_URI : undefined,
  });

  console.log("google login redirectUri:", redirectUri);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    redirectUri: redirectUri,
    responseType: AuthSession.ResponseType.Code,
    scopes: ["profile", "email", "openid"],
    extraParams: {
        prompt: 'select_account consent', 
    },
  });

  useEffect(() => {
    const handleLogin = async () => {
      if (response?.type === "success" && response.params?.code) {
        console.log("responsetype is success");
        const code = response.params.code;
        console.log("code validy:", !!code);
        if (!code) {
          console.error(
            "Code not received. Check 'response_type' and 'scopes'."
          );
          return;
        }
        try {
          const data = await authGoogleLogin(code, redirectUri);
          await login(data.accessToken, data.refreshToken, data.user);
          console.log("google login worked");
          setAuthSuccess(true);
        } catch (error) {
          console.error("Error during backend authentication: ", error);
          console.error("Error stack:", error.stack);
        }
      }
    };
    handleLogin();
  }, [response]);

  useEffect(() => {
    if (authSuccess) {
      console.log("Navigating to Dashboard from successful auth state.");
      navigation.navigate("Dashboard");
    }
  }, [authSuccess, navigation]);

  return { promptAsync, request };
};
