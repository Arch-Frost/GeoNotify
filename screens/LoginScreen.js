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
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleLogin = async () => {
    // Handle the login process
    if (email === "" || password === "") {
      setError("Please fill out all fields!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email!");
      return;
    }

    // Check if the email exists
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length === 0) {
      setError("Account associated with email does not exist!");
      return;
    }

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("User logged in successfully");
        const user = userCredential.user;
        // Navigate to the Main screen
        navigation.navigate("Main");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Error logging in: " + errorMessage);
        // alert("Error logging in: " + errorMessage);

        if (
          error.code === "auth/wrong-password"
        ) {
          setError("Your password was incorrect!");
        } else if (error.code === "auth/email-already-in-use") {
          setError("An account with this email already exists");
        } else {
          setError("There was a problem with your request! Please try again later.");
        }
      });
  };

  const signupLink = () => {
    navigation.navigate("SignUp");
  };

  const resetPassword = () => {
    navigation.navigate("ResetPassword");
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
        style={[styles.input, {marginBottom: 5}]}
        placeholder="Password"
        placeholderTextColor="#808080" // Gray
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      {error && <Text style={styles.error}>{error}</Text>}

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

      <TouchableOpacity style={[styles.link, {marginTop: 30}]} onPress={resetPassword}>
        <Text style={styles.linkText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={signupLink}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
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
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: "#008080",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  }
});

export default LoginScreen;
