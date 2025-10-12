import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Landing({ navigation }) {
  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to SigMe. You landed to our homepage</Text>
      {console.log("landing component rendered")}
      <TouchableOpacity onPress={goToRegister}>
        <Text>Click to register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
