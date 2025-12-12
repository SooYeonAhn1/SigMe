// apps/mobile/src/screens/DeleteAccount.jsx

import { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Platform } from "react-native";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";
import { useAuth } from "../../hooks/AuthContext";

export default function DeleteAccont({ navigation }) {
  const developing = process.env.NODE_ENV === "development";

  const [password, setPassword] = useState("");
  const [authType, setAuthType] = useState("local");
  const [showPassword, setShowPassword] = useState(false);
  const { deleteLocalAccount, deleteGoogleAccount, error, loading } = useDeleteAccount();
  const { userData, logout } = useAuth();

  useEffect(() => {
    if (userData?.authType) {
      setAuthType(userData.authType);
    }
  }, [userData]);

  const handleDelete = async () => {
    try {
      if (authType == "local") {
        await deleteLocalAccount(password, authType);      
      } else {
        await deleteGoogleAccount();
      }
      
      await logout();
      alert("Account deleted successfully");
      if (!developing) navigation.navigate("Landing");
    } catch (error) {
      alert("An error occurred while deleting your account. Please try again.");
      console.error("Delete failed:", error);
    }
  };

  return (
    <View>
      <Text>Delete Account. Are you sure you want to delete your account?</Text>
      {console.log("deleteAccount component rendered")}
      <Text>
        • All your data will be permanently deleted
      </Text>
      <Text>
        • This action cannot be undone
      </Text>
      {authType === "local" ? (
          <View>
            <Text>Enter your password to confirm</Text>
            <TextInput
                secureTextEntry={!showPassword} // secureTextEntry is TRUE if showPassword is FALSE
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Pressable title="deleteAccount" onPress={() => setShowPassword(!showPassword)}>
              <Text>{showPassword ? "Hide" : "Show"}</Text>
            </Pressable>
          </View>
      ) : (
        <Text>You are signed in with Google. Click delete to proceed.</Text>
      )}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Pressable
        onPress={handleDelete}
        disabled={loading || (authType === "local" && !password)}
      >
        {loading ? (
          <Text style={{color:"red"}}>Deleting...</Text>
         ) : (<Text style={{color:"red"}}>Delete Account</Text>
        )}
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Settings")}>
      <Text>Back</Text>
      </Pressable>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});