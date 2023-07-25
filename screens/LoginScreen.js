import React, { useState } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCredential,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
} from "firebase/auth";
import { useAuthentication } from "../utils/hooks/useAuthentication";


// TODO: Add Forgot Password functionality

const auth = getAuth();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  const handleLogin = async () => {
    // Handle the login process
    if (email === "" || password === "") {
      alert("Please fill out all fields");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    // Check if the email exists
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length === 0) {
      alert("Email does not exist");
      return;
    }

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("User logged in successfully");
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Error logging in: " + errorMessage);
        alert("Error logging in: " + errorMessage);
      });

    // Navigate to the Main screen
    navigation.navigate("Main");
  };

  const signupLink = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Welcome to GeoNotify!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
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
      {/* <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Image
          style={{ width: 20, height: 20 }}
          source={{
            uri: "https://i.ibb.co/j82DCcR/search.png",
          }}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.signupLink} onPress={signupLink}>
        <Text style={styles.signupLinkText}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D3D3D3", // Light Gray
  },
  logo: {
    width: 200,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#008080", // Teal
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#008080", // Teal
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#000",
  },
  button: {
    backgroundColor: "#008080", // Teal
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E4E4E4", // Teal
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  googleButtonText: {
    // color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  signupLink: {
    marginTop: 20,
  },
  signupLinkText: {
    color: "#008080",
    fontSize: 16,
  },
});

export default LoginScreen;
