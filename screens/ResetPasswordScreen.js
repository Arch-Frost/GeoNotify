import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  getAuth,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

const auth = getAuth();

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleResetPassword = async () => {
    // Check whether the email is valid
    if (email === "") {
      setError("Email cannot be empty!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email!");
      return;
    }

    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length === 0) {
      setError("Account associated with email does not exist!");
      return;
    }

    // Handle the reset password process
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log("Password reset email sent!");
        alert("Password reset email sent!");
        setError(null);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Error sending password reset email: " + errorMessage);
        // alert("Error sending password reset email: " + errorMessage);
        setError("Error sending password reset email: " + errorMessage);
      });
  };

  const loginLink = () => {
    // Navigate to the Login screen
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgotten Password</Text>
      <Text style={styles.subtitle}>
        Enter your email address below to reset your password
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#808080" // Gray
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={loginLink}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 10,
    color: "#008080", // Teal
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 50,
    marginBottom: 50,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "#008080", // Teal
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#008080", // Teal
    width: "80%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#008080", // Teal
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  error: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
});
