import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle the login process
    // You can access the entered email and password using the 'email' and 'password' state variables
  };

  const handleGoogleLogin = () => {
    // Handle Google login
  };

  const signupLink = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to GeoNotify!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#808080" // Gray
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#808080" // Gray
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <FontAwesome name="google" size={24} color="white" />
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupLink} onPress={signupLink}>
        <Text style={styles.signupLinkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3', // Light Gray
  },
  logo: {
    width: 200,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#008080', // Teal
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#008080', // Teal
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#008080', // Teal
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#006766', // Dark Teal
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  signupLink: {
    marginTop: 20,
  },
  signupLinkText: {
    color: '#008080',
    fontSize: 16,
  },
});

export default LoginScreen;
