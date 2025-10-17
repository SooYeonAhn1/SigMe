import { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useGoogleAuth } from '../auths/useGoogleAuth';

export default function LoginScreen({ navigation }) {
    const [ loading, setLoading ] = useState(false);
    const { googleSignIn, googleError } = useGoogleAuth(); 
  
    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const sessionData = await googleSignIn(); 
            if (sessionData) {
                navigation.navigate('Landing'); 
            }
        } catch (e) {
            console.error("Sign-in failed at UI level:", e);
        } finally {
            setLoading(false);
        }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In to SigMe</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#4285F4" />
      ) : (
        <>
          {googleError && <Text style={styles.error}>Error: {error}</Text>}

          {/* The button calls the hook for google */}
          <Button 
            title="Sign In with Google" 
            onPress={handleGoogleSignIn} 
            disabled={loading}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({ 
    
});