import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function DailyLogs({ navigation }) {
  const goToSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <Text>Daily Logs</Text>
      {console.log("daily component rendered")}
      <TouchableOpacity onPress={goToSettings}>
        <Text>settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
