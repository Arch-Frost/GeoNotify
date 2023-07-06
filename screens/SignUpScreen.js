import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const handleSignUp = () => {
    // Handle sign up process
  };

  const loginLink = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#808080" // Gray
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#808080" // Gray
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#808080" // Gray
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginLink} onPress={loginLink}>
        <Text style={styles.loginLinkText}>Already have an account? Login</Text>
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
    paddingHorizontal: 40,
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
    width: '100%',
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
  loginLink: {
    marginTop: 20,
  },
  loginLinkText: {
    color: '#008080', // Teal
    fontSize: 16,
  },
});

export default SignUpScreen;
