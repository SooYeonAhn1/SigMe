import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from '../hooks/AuthContext';

export default function Dashboard({ navigation }) {
    const developing = true;
    const goToSettings = () => {
        navigation.navigate("Settings");
    };

    const { user, isLoading, signOut } = useAuth();
    console.log("Dashboard screen - isLoading: ", isLoading, " user: ", user);
    return (
        <View>
            {console.log("dashboard component rendered")}
            {console.log("isLoading: ", isLoading, " user: ", user)}
            <Text>Dashboard</Text>
            <Text>Hi, {user.username}</Text>
            <TouchableOpacity onPress={goToSettings}>
                <Text>Go to settings</Text>
            </TouchableOpacity>  
            {/* <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
                <Text>Landing</Text>
            </TouchableOpacity>   */}
            <TouchableOpacity onPress={signOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>  
        </View>
    )
}