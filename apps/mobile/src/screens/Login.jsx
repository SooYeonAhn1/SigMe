// apps/mobile/src/screens/Login.jsx

import { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
// import { useLocalAuth } from '../hooks/useLocalAuth';

export default function Login({navigation}) {
    const [ isLoading, setIsLoading ] = useState(false);
    const { promptAsync, request } = useGoogleAuth();
    
    const goToRegister = () => {
        navigation.navigate("Register");
    };

    const handleGoogleSignIn = async () => {
        if (!request) {
            console.warn("Google Auth configuration not ready.");
            return;
        }
        setIsLoading(true);
        try {
            const sessionData = await promptAsync();
            if (sessionData && sessionData.type === 'success') {
                console.log("Sign-in successful: ", sessionData);
                // navigation.navigate('Dashboard');
            } else {
                console.error("Sign-in was not successful: ", sessionData);
            }
        } catch (error) {
            console.error("Sign-in failed at UI level: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const disabled = !request || isLoading;

    // console.log('Generated Redirect URI:', redirectUri);

    return (
        <View style={styles.container}>
            <Button 
            title={isLoading ? "Loading..." : "Sign in with Google"}
                onPress={handleGoogleSignIn}
                style={styles.container} 
            >
                {isLoading && <ActivityIndicator size="small" color="#fff" />}
            </Button>
            <TouchableOpacity onPress={goToRegister}>
                <Text>Need to register?</Text>
            </TouchableOpacity>  
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#000000ff',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    }
});