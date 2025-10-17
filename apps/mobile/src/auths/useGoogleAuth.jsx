import { Platform } from 'react-native';

const useGoogleAuth = Platform.select({
    ios: () => require('./useGoogleAuth.ios').useGoogleAuth,
    android: () => require('./useGoogleAuth.android').useGoogleAuth,
    default: () => {
        console.warn('GoogleAuth not supported on this platform/environment.');
        return { user: null, error: 'Unsupported Platform', signIn: async() => null };
    }
})();

export { useGoogleAuth };