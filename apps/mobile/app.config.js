// Due to the nature of monorepos, EXPO_PUBLIC_ environment variables
// may not be picked up correctly by Expo unless we explicitly load them here.
import 'dotenv/config'; 

// forcing the path to the .env file
const path = require('path');
// console.log("dirname in app.config.js: ", __dirname);
require('dotenv').config({
  path: path.resolve(__dirname, '..', '..', '.env'), 
});

export default {
  expo: {
    name: "sigme-mobile",
    slug: "sigme",
    version: "1.0.0",
    orientation: "portrait",

    extra: {
        EXPO_PUBLIC_AUTH_API_BASE_URL: process.env.EXPO_PUBLIC_AUTH_API_BASE_URL,
        EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
        EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        EXPO_PUBLIC_GOOGLE_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
        NODE_ENV: process.env.NODE_ENV
        // This is generally the variable Expo uses to know the URL of the packager
        // You may not need to explicitly expose this, but it can be useful for debugging.
        // EXPO_PACKAGER_PROXY_URL: process.env.EXPO_PACKAGER_PROXY_URL, 
    },
  },
};