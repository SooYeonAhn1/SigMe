import { View, Text, StyleSheet } from "react-native";

export default function Register({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Please follow the steps to register</Text>
      {console.log("registration component rendered")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
