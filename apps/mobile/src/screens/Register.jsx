import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { useLocalAuth } from '../hooks/useLocalAuth';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const API_BASE_URL = process.env.EXPO_PUBLIC_AUTH_API_BASE_URL;
    const handleSubmit = async () => {
        try {
            const registrationData = await registerUser(email, password);
            console.log("successfully received data: ", registrationData);
            navigation.navigate("Dashboard");
        } catch (error) {
            if (error.message && error.message.includes('already registered')) {
                alert('Your email is already registered. Redirecting to login page.');
                navigation.navigate("Login");
            } else {
                console.error('Registration Error:', error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
             <Text>Please follow the steps to register</Text>
            {console.log("registration component rendered")}
            <form onSubmit={handleSubmit}>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
                <input type="password" id="password"value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                <button type="submit">Register</button>
            </form>
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
