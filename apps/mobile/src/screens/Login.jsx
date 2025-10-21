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
/*
    const handleLocalSignIn = async () => {
        const registrationData = {
            email: email,
            password: password
        };
        console.log("API_BASE_URL: ", API_BASE_URL);
        try {
            const response = await fetch(`${API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            })

            if (response.status === 409) {
                alert('Your email is already registered. Redirecting to login page.');
                navigate(ROUTES.LOGIN);
                return; // no further action needed
            }
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed on the server.');
            }
            const data = await response.json();
            console.log("successfully received data: ", data);
            navigation.navigate("Dashboard");
        } catch (error) {
            console.error('Frontend Error:', error.message);
            // alert('An error occurred. Check the console for details.');
        }
    }
*/

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
            {/* <form onSubmit={handleLocalSignIn}>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
                <input type="password" id="password"value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                <button type="submit">Register</button>
            </form> */}
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