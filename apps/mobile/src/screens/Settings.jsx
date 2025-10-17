import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Settings({ navigation }) {
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

    return (
        <View style={styles.container}>
            <Text>You can manage your settings here</Text>
            {console.log("settings component rendered")}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
