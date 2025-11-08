// apps/mobile/src/screens/Register.jsx

import { View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable } from "react-native";
import { useState } from 'react';
import { useLocalAuth } from '../hooks/useLocalAuth';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useLocalAuth();

  const handleSubmit = async () => {
    console.log("Submitting registration for email: ", email);
    try {
      await register(email, password);
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

  const MobileInput = (
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
        title="Register"
        onPress={handleSubmit}
      >
        <Text>Submit</Text>
      </Pressable>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text>Please follow the steps to register</Text>
      {console.log("registration component rendered")}
      {MobileInput}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
