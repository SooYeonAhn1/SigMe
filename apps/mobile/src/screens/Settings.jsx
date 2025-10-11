import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Settings({ navigation }) {
  const goToDailyLogs = () => {
    navigation.navigate("DailyLogs");
  };

  return (
    <View style={styles.container}>
      <Text>You can manage your settings here</Text>
      {console.log("settings component rendered")}
      <TouchableOpacity onPress={goToDailyLogs}>
        <Text>Go log your day</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
