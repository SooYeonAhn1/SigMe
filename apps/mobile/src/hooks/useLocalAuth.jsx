import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import { registerUser, loginUser } from '../services/authApi'; 
import { AuthContext } from './AuthContext';

const ACCESS_TOKEN_KEY = 'userAccessToken';
const REFRESH_TOKEN_KEY = 'userRefreshToken';
const USER_DATA_KEY = 'userData';

export const useLocalAuth = () => {
    const { setUser } = React.useContext(AuthContext);
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const saveAuthData = async (data) => {
        if (Platform.OS !== 'web') {
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.accessToken);
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, data.refreshToken);
        } else {
            await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
            await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
        }
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
        
        setUser(data.user);
    };

    const register = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await registerUser(email, password); 

            await saveAuthData(data);
            
            navigation.navigate('Dashboard');
        } catch (e) {
            console.error('Registration failed:', e);
            setError(e.message || 'Registration failed.');
            // This hook can handle navigation to login if the server returns 409
            if (e.message && e.message.includes('already taken')) {
                 navigation.navigate('Login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Local Login Function (POST /api/login)
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            // loginUser calls the server, which returns { user, accessToken, refreshToken }
            const data = await loginUser(email, password); 

            await saveAuthData(data);
            
            navigation.navigate('Dashboard');
        } catch (e) {
            console.error('Login failed:', e);
            // Assuming the server throws an error for 401 Unauthorized
            setError(e.message || 'Invalid email or password.'); 
        } finally {
            setIsLoading(false);
        }
    };

    return { register, login, isLoading, error };
};