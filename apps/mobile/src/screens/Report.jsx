import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Report({ navigation }) {
  const goToSettings = () => {
    navigation.navigate("Settings");
  };
  return (
    <View style={styles.container}>
      <Text>This is the report generator</Text>
      {console.log("report component rendered")}
      <TouchableOpacity onPress={goToSettings}>
        <Text>update report</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
