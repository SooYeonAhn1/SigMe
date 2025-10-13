import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Checklist({ navigation }) {
  const goToSettings = () => {
    navigation.navigate("Settings");
  };
  return (
    <View style={styles.container}>
      <Text>Checklist</Text>
      {console.log("checklist component rendered")}
      <TouchableOpacity onPress={goToSettings}>
        <Text>update checklist</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
