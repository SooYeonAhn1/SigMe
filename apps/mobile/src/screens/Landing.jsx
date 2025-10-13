import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Landing({ navigation }) {
  const developing = true; //set to false when deploying the app
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
      
      {/* The following buttons are active when developing = true.
          These redirect links are active to check that the individual pages are fully working.
          You can click them to go to the respective pages.
          They are disabled when developing = false.
          They will be removed in the final version.    
      */}
      <TouchableOpacity disabled={!developing} onPress={() => {navigation.navigate("DailyLogs")}}>
        <Text>Daily Logs</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={!developing} onPress={() => {navigation.navigate("Settings")}}>
        <Text>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={!developing} onPress={() => {navigation.navigate("Report")}}>
        <Text>Report</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={!developing} onPress={() => {navigation.navigate("Medication Information")}}>
        <Text>Medication Information</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={!developing} onPress={() => {navigation.navigate("Checklist")}}>
        <Text>Checklist</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
