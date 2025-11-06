// apps/mobile/src/screens/Register.jsx

import { View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable } from "react-native";
import { useState } from 'react';
import { useLocalAuth } from '../hooks/useLocalAuth';
import { Platform } from 'react-native'; // included for development purposes

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useLocalAuth();
    const handleSubmitDev = async (e) => {
        e.preventDefault();
        console.log("Submitting registration for email: ", email);
        try {
            await register(email, password);
            navigation.navigate("Dashboard");
        } catch (error) {
            if (error.message) {
                if (error.message.includes('already registered')) {
                alert('Your email is already registered. Redirecting to login page.');
                navigation.navigate("Login");
                return; // no further action needed
                } /* else if (error.message.includes('already taken')) {

                }*/
            }
            console.error('Registration Error:', error.message);
            alert('An error occurred during registration. Check the console for details.');
        }
    };

    const handleSubmit = async () => {
        console.log("Submitting registration for email: ", email);
        try {
            await register(email, password);
            navigation.navigate("Dashboard");
        } catch (error) {
            if (error.message && error.message.includes('already registered')) {
                alert('Your email is already registered. Redirecting to login page.');
                navigation.navigate("Login");
                return; // no further action needed
            }
            console.error('Registration Error:', error.message);
            alert('An error occurred during registration. Check the console for details.');
        }
    };


    // NOTICE: The following code is for the convenience of developing and testing mobile code in a web dev
    // Helper to determine if we are in a web development environment
    const isWebDev = Platform.OS === 'web' && process.env.NODE_ENV === 'development';

    // Mobile (React Native) / Production Web Input
    const MobileInput = (
        <View>
            {/* Input Email */}
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
            />
            {/* Input Password */}
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
                textContentType="password"
            />
            {/* Submission Button */}
            <Pressable 
                title="Register"
                onPress={handleSubmit} // Triggers handleSubmit without event object
            />
        </View>
    );
    
    
    // Web (HTML Form) Input - Only in Development
    const WebDevInput = (
        <form onSubmit={handleSubmitDev}> 
            <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                required
            />
            <input 
                type="password" 
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                required
            />
            <button type="submit">Register</button>
        </form>
    );


    return (
        <View style={styles.container}>
             <Text>Please follow the steps to register</Text>
            {console.log("registration component rendered")}
            {/* Fix the environment check: Use 'development' */}
            {process.env.NODE_ENV === 'development' && <Text>DEVELOPMENT MODE</Text>}

            {/* Render the appropriate input method */}
            {isWebDev ? WebDevInput : MobileInput}
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text>Already have an account?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
