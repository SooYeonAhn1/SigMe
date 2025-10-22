import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from '../hooks/AuthContext';
// import { usNavigate } from '@react-navigation/native';

export default function Dashboard({ navigation }) {
    const developing = true;
    const goToSettings = () => {
        navigation.navigate("Settings");
    };

    const { user, isLoading, signOut } = useAuth();

    const handleSignOut = async () => {
        await signOut();
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }

    console.log("Dashboard screen - isLoading: ", isLoading, " user: ", user);

    if (isLoading || !user) {
        console.log("you reached to Dashboard.jsx:line 21");
        return (
            <View>
                <Text>Signing out...</Text>
            </View>
        );
    }

    return (
        <View>
            {console.log("dashboard component rendered")}
            {console.log("isLoading: ", isLoading, " user: ", user)}
            <Text>Dashboard</Text>
            <Text>Hi, {user.username}</Text>
            <TouchableOpacity onPress={goToSettings}>
                <Text>Go to settings</Text>
            </TouchableOpacity>  
            <TouchableOpacity disable={!developing} onPress={() => navigation.navigate("Landing")}>
                <Text>Landing</Text>
            </TouchableOpacity>  
            <TouchableOpacity onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>  
        </View>
    )
}