// apps/mobile/src/screens/settings/index.jsx

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Settings({ navigation }) {
    const goToDashboard = () => {
        navigation.navigate("Dashboard");
    };
    const goToDailyLogs = () => {
        navigation.navigate("DailyLogs");
    };
    const goToMedsInfo = () => {
        navigation.navigate("Medication Information");
    };
    const goToChecklist = () => {
        navigation.navigate("Checklist");
    };
    const goToReport = () => {
        navigation.navigate("Report");
    };
    const goToDeleteAccount = () => {
        navigation.navigate("Delete Account");
    };
    return (
        <View style={styles.container}>
            <Text>You can manage your settings here</Text>
            {console.log("settings component rendered")}
            <TouchableOpacity onPress={goToDashboard}>
                <Text>Go to dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToDailyLogs}>
                <Text>Go log your day</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToReport}>
                <Text>Visit your report</Text>
            </TouchableOpacity>  
            <TouchableOpacity onPress={goToMedsInfo}>
                <Text>Update your medication</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToChecklist}>
                <Text>Update your checklist</Text>
            </TouchableOpacity>  
            <TouchableOpacity onPress={goToDeleteAccount}>
                <Text style={{ color : "red"}}>Delete Account</Text>
            </TouchableOpacity>  
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
