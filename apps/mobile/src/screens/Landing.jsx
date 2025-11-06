// apps\mobile\src\screens\Landing.jsx

import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useAuth } from "../hooks/AuthContext";

export default function Landing({ navigation }) {
  const developing = true; //set to false when deploying the app
  const { user, isLoading, signOut } = useAuth();

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  console.log("Landing screen - isLoading: ", isLoading, " user: ", user);
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        console.log("User is logged in: ", user);
        navigation.navigate("Dashboard");
      } else {
        console.log("No user logged in, redirecting to Login.");
        if (process.env.NODE_ENV !== "development")
          navigation.navigate("Login");
      }
    }
  }, [isLoading, user, navigation]);

  // const checkLoginAndRedirect = () => {
  //     const { googelIsSignedIn } = useGoogleAuth();
  //     if (!googleIsSignedIn) {
  //         navigation.navigate("Login");
  //     }
  // }

  return (
    <View style={styles.container}>
      <Text>Welcome to SigMe. You landed to our homepage!</Text>
      {console.log("landing component rendered")}
      {/* {checkLoginAndRedirect()} */}
      <TouchableOpacity onPress={goToRegister}>
        <Text>Register</Text>
      </TouchableOpacity>

      {/* The following buttons are active when developing = true.
                These redirect links are active to check that the individual pages are fully working.
                You can click them to go to the respective pages.
                They are disabled when developing = false.
                They will be removed in the final version.    
            */}
      <TouchableOpacity
        disabled={!developing}
        onPress={() => {
          navigation.navigate("DailyLogs");
        }}
      >
        <Text>Daily Logs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!developing}
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Text>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!developing}
        onPress={() => {
          navigation.navigate("Report");
        }}
      >
        <Text>Report</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!developing}
        onPress={() => {
          navigation.navigate("Medication Information");
        }}
      >
        <Text>Medication Information</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!developing}
        onPress={() => {
          navigation.navigate("Checklist");
        }}
      >
        <Text>Checklist</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!developing}
        onPress={() => {
          navigation.navigate("Dashboard");
        }}
      >
        <Text>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={!developing}
        onPress={() => {
          navigation.navigate("Delete Account");
        }}
      >
        <Text>Delete Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={!developing}
        onPress={user ? handleSignOut : () => navigation.navigate("Login")}
      >
        <Text>{user ? "Sign out" : "Sign in"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
