// apps/mobile/src/screens/Dashboard.jsx

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../hooks/AuthContext";
// import { usNavigate } from '@react-navigation/native';

export default function Dashboard({ navigation }) {
  const developing = process.env.NODE_ENV === 'development';
  const goToSettings = () => {
    navigation.navigate("Settings");
  };

  const { userData, isLoading, logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  console.log("Dashboard screen - isLoading: ", isLoading, " userData: ", userData);

  if (isLoading) {
    {
      console.log("dashboard loading");
    }
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!developing && !userData) {
    {
      console.log("User is not not logged in");
    }
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    return null;
  }

  return (
    <View>
      {console.log("dashboard component rendered")}
      {console.log("isLoading: ", isLoading, " userData: ", userData)}
      <Text>Dashboard</Text>
      <Text>Hi, {userData ? userData.username : <Text>SigMe</Text>}</Text>
      <TouchableOpacity onPress={goToSettings}>
        <Text>Go to settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!developing}
        onPress={() => navigation.navigate("Landing")}
      >
        <Text>Landing</Text>
      </TouchableOpacity> 
      <Text>
        {
          userData ?
          <TouchableOpacity onPress={handleSignOut}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>Sign In</Text>
          </TouchableOpacity>
        }
      </Text>
      
    </View>
  );
}
