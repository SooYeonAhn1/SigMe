import { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Item, Button, WarningList, StyleSheet, useColorScheme } from "react-native";
// import { useNavigate } from "react-router-dom";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";
import { useAuth } from "../../hooks/AuthContext";
// import { Button, TextInput } from "react-native";

export default function DeleteAccont({ navigation }) {
  const [password, setPassword] = useState("");
  const [authType, setAuthType] = useState("local");
  const [showPassword, setShowPassword] = useState(false);
  const { deleteAccount, error, loading } = useDeleteAccount();
  const { userData } = useAuth();

  useEffect(() => {
    if (userData?.authType) {
      setAuthType(userData.authType);
    }
  }, [userData]);

  const handleDelete = async () => {
    try {
      await deleteAccount(password, authType);
      alert("Account deleted successfully");
      navigation.navigate("Landing");
    } catch (err) {
      alert("An error occurred while deleting your account. Please try again.");
      console.error("Delete failed:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Delete Account. Are you sure you want to delete your account?</Text>
      {console.log("deleteAccount component rendered")}
      <Text>
        • All your data will be permanently deleted
      </Text>
      <Text>
        • This action cannot be undone
      </Text>      
      {authType === "local" ? (
        <>
          <Text>Enter your password to confirm</Text>
          <TextInput type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button title="deleteAccount" onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </>
      ) : (
        <Text>You are signed in with Google. Click delete to proceed.</Text>
      )}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Button
        onPress={handleDelete}
        disabled={loading || (authType === "local" && !password)}
      >
        {loading ? "Deleting..." : "Delete Account"}
      </Button>
      <Button onPress={() => navigation.navigate("Setting")}>Back</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});