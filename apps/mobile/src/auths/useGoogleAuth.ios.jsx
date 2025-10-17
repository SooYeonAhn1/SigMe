import { useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { User } from '../../../../server/models/User';

GoogleSignin.configure({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    scopes: ['email', 'profile'],
    offlineAccess: true,
});

export const useGoogleAuth  = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    const registerUser = async (userData) => {
        try {
            const newUser = new User(userData);
            await newUser.save();
            return newUser;
        } catch (err) {
            console.error('Error registering user:', err);
            return null;
        }
    }

    const signIn = async () => {
        setError(null);
        try {
            const userInfo = await GoogleSignin.signIn();
            setUserInfro(userInfo.user);
            return userInfo.idToken;
        } catch (err) {
            if (err.code === statusCodes.SIGN_IN_CANCELLED) {
                setError('User cancelled the login flow');
            } else {
                setError(err.message || "An unknown android sign-in error occurred.");
            }
            return null;
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            setUser(null);
        } catch (err) {
            console.error('iOS sign-out error:', err);
            setError(err.message || "An unknown android sign-out error occurred.");
        }
    };
    
    return {
        user, error, signIn, signOut, isSignedIn: !!userInfo,
    }
}