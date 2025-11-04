// apps/mobile/src/hooks/useGoogleAuth.jsx

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";

import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";

import { authGoogleUserWithBackend } from "../services/authApi";
import { AuthContext } from "./AuthContext";

WebBrowser.maybeCompleteAuthSession();

const ACCESS_TOKEN_KEY = "userAccessToken";
const REFRESH_TOKEN_KEY = "userRefreshToken";
const USER_DATA_KEY = "userData";

export const useGoogleAuth = () => {
  const { setUser } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [authSuccess, setAuthSuccess] = useState(false);

  const WEB_REDIRECT_URI =
    process.env.EXPO_PUBLIC_GOOGLE_API_BASE_URL || "http://127.0.0.1:5000";

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
    web: process.env.NODE_ENV === "development" ? WEB_REDIRECT_URI : undefined,
  });

  // console.log("expoClientId: ", process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID);
  // console.log("iosClientId: ", process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID);
  // console.log("androidClientId: ", process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID);
  // console.log("webClientId: ", process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID);
  // console.log("redirectUri: ", redirectUri);
  // console.log("directory: ", __dirname);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    redirectUri: redirectUri,
    responseType: AuthSession.ResponseType.IdToken,
    scopes: ["profile", "email", "openid"],
  });

  useEffect(() => {
    const handleLogin = async () => {
      if (response?.type === "success" && response.params?.id_token) {
        const idToken = response.params.id_token;
        if (!idToken) {
          console.error(
            "ID Token not received. Check 'response_type' and 'scopes'."
          );
          return;
        }
        try {
          const data = await authGoogleUserWithBackend(idToken);

          console.log("Backend data:", data);
          console.log("User object:", data.user);
          console.log("User object type:", typeof data.user);

          if (Platform.OS !== "web") {
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.accessToken);
            await SecureStore.setItemAsync(
              REFRESH_TOKEN_KEY,
              data.refreshToken
            );
          }
          // await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.accessToken);
          // await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, data.refreshToken);
          await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));

          setUser(data.user);
          setAuthSuccess(true);
        } catch (error) {
          console.error("Error during backend authentication: ", error);
          console.error("Error stack:", error.stack);
        }
      }
    };
    handleLogin();
  }, [response, setUser]);

  useEffect(() => {
    if (authSuccess) {
      console.log("Navigating to Dashboard from successful auth state.");
      navigation.navigate("Dashboard");
    }
  }, [authSuccess, navigation]);

  return { promptAsync, request };
};
