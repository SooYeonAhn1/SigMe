// apps/mobile/src/screens/DeleteAccount.jsx

import { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
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

  // const WebDevInput = (
  //   <form onSubmit={handleSubmitDev}>
  //     <input
  //       type="email"
  //       id="email"
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //       placeholder="Email"
  //       required
  //     />
  //     <input
  //       type="password"
  //       id="password"
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //       placeholder="Password"
  //       required
  //     />
  //     <button type="submit">Register</button>
  //   </form>
  // );

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
          <Pressable title="deleteAccount" onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </Pressable>
        </>
      ) : (
        <Text>You are signed in with Google. Click delete to proceed.</Text>
      )}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Pressable
        onPress={handleDelete}
        disabled={loading || (authType === "local" && !password)}
        style={{color:"red"}}
      >
        {loading ? "Deleting..." : "Delete Account"}
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Settings")}>Back</Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});