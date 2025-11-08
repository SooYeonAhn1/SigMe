// apps/mobile/src/screens/Login.jsx

import { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput
} from "react-native";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useLocalAuth } from '../hooks/useLocalAuth';

export default function Login({ navigation }) {
  const developing = process.env.NODE_ENV === 'development';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { promptAsync, request } = useGoogleAuth();
  const { login } = useLocalAuth();

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  const handleGoogleSignIn = async () => {
    if (!request) {
      console.warn("Google Auth configuration not ready.");
      return;
    }
    setIsLoading(true);
    try {
      const sessionData = await promptAsync();
      if (sessionData && sessionData.type === "success") {
        console.log("Sign-in successful: ", sessionData);
        // navigation.navigate('Dashboard');
      } else {
        console.error("Sign-in was not successful: ", sessionData);
      }
    } catch (error) {
      console.error("Sign-in failed at UI level: ", error);
      alert("Sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // const disabled = !request || isLoading;
  
  // local login
  const handleSubmit = async () => {
    console.log("Submitting registration for email: ", email);
    try {
      await login(email, password);
      navigation.navigate("Dashboard");
    } catch (error) {
      if (error.message && error.message.includes('already registered')) {
        alert('Your email is already registered. Redirecting to login page.');
        navigation.navigate("Login");
        return; // no further action needed
      }
      console.error('Registration Error:', error.message);
      alert('An error occurred during registration. Check the console for details.');
    }
  };

  const localInput = (
    <View>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={!showPassword}
        textContentType="password"
      />
      <Pressable title="deleteAccount" onPress={() => setShowPassword(!showPassword)}>
        <Text>{showPassword ? "Hide" : "Show"}</Text>
      </Pressable>
      <Pressable
        title="Login"
        onPress={handleSubmit}
      >
        <Text>Submit</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      {localInput}
      <TouchableOpacity
        onPress={handleGoogleSignIn}
        style={styles.container}
      >
        {isLoading ? (
          <View>
            <ActivityIndicator size="small" color="#fff" />
            <Text>Loading...</Text>
          </View>
        ) : (
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={goToRegister}>
        <Text>Need to register?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!developing}
        onPress={() => {
          navigation.navigate("Landing");
        }}
      >
        <Text>Go back to Landing page...</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: "auto",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#000000ff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});
