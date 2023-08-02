import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const auth = getAuth();

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  const handleSignUp = async () => {
    // Handle sign up process
    if (
      name === "" ||
      email === "" ||
      passwordOne === "" ||
      passwordTwo === ""
    ) {
      alert("Please fill out all fields");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }
    if (passwordOne !== passwordTwo) {
      alert("Passwords do not match");
      return;
    }
    if (passwordOne.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    await createUserWithEmailAndPassword(auth, email, passwordOne)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User created successfully");
        await updateDisplayName(name);
        // alert("Account created successfully");
        navigation.navigate("Login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Error creating user: " + errorMessage);
        alert("Error creating user: " + errorMessage);
      });

  };

  const updateDisplayName = async (displayName) => {
    const user = auth.currentUser;
    await updateProfile(user, {
      displayName: displayName,
    });
  };

  const loginLink = () => {
    navigation.navigate("Login");
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#808080" // Gray
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#808080" // Gray
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#808080" // Gray
        secureTextEntry
        value={passwordOne}
        onChangeText={(text) => setPasswordOne(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#808080" // Gray
        secureTextEntry
        value={passwordTwo}
        onChangeText={(text) => setPasswordTwo(text)}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D3D3D3", // Light Gray
    paddingHorizontal: 40,
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
    width: "100%",
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
  loginLink: {
    marginTop: 20,
  },
  loginLinkText: {
    color: "#008080", // Teal
    fontSize: 16,
  },
});

export default SignUpScreen;
