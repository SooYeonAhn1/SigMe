import { useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    scopes: ['email', 'profile'],
    offlineAccess: true,
});

export const useGoogleAuth  = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [googleError, setError] = useState(null);

    const googleSignIn = async () => {
        setError(null);
        try {
            const userInfo = await GoogleSignin.signIn();
            setUserInfro(userInfo.user);
            return userInfo.idToken;
        } catch (err) {
            if (err.code === statusCodes.SIGN_IN_CANCELLED) {
                setError('User cancelled the login flow');
            } else {
                setError(err.message || "An unknown iOS sign-in error occurred.");
            }
            return null;
        }
    };

    const googleSignOut = async () => {
        try {
            await GoogleSignin.signOut();
            setUser(null);
        } catch (err) {
            console.error('iOS sign-out error:', err);
            setError(err.message || "An unknown iOS sign-out error occurred.");
        }
    };

    return {
        googleUser: userInfo, googleError, googleSignIn, googleSignOut, googleIsSignedIn: !!userInfo,
    }
}