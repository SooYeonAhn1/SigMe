import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MedsInfo({ navigation }) {
    const goToSettings = () => {
        navigation.navigate("Settings");
    };
    return (
        <View style={styles.container}>
            <Text>Medication Information</Text>
            {console.log("medsinfo component rendered")}
            <TouchableOpacity onPress={goToSettings}>
                <Text>update medication</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
