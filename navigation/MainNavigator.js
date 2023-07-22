import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import NewTaskScreen from "../screens/NewTaskScreen";
import EditTaskScreen from "../screens/EditTaskScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import LocationMapScreen from "../screens/LocationMapScreen";
import { Alert } from "react-native";
import { getAuth } from "firebase/auth";

const Stack = createStackNavigator();
const auth = getAuth();

export default function MainNavigator({ navigation }) {
  const logoutFunction = () => {
    console.log("Logout function called");
    auth.signOut().then(() => {
      navigation.navigate("Auth");
    });
  }
  
  const logout = () => {
    return (
      <Ionicons
        name="log-out-outline"
        size={30}
        color="#008080"
        style={{ marginHorizontal: 10 }}
        onPress={() => {
          // Handle logout
          Alert.alert("Logout", "Are you sure you want to logout?", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Log Out",
              onPress: () => logoutFunction(),
            },
          ]);
        }}
      />
    );
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: "GeoNotify",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#008080",
            fontSize: 24,
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: "#fff",
            borderBottomWidth: 1,
          },
          headerRight: () => logout(),
        }}
      />
      <Stack.Screen
        name="New Task"
        component={NewTaskScreen}
        options={{
          headerShown: true,
          headerTitle: "Create New Task",
          headerStyle: { borderBottomWidth: 1 },
        }}
      />
      <Stack.Screen
        name="Edit Task"
        component={EditTaskScreen}
        options={{
          headerShown: true,
          headerStyle: { borderBottomWidth: 1 },
        }}
      />
      <Stack.Screen
        name="Task Details"
        component={TaskDetailsScreen}
        options={{
          headerShown: false,
          headerStyle: { borderBottomWidth: 1 },
        }}
      />
      <Stack.Screen
        name="Map"
        component={LocationMapScreen}
        options={{
          headerShown: true,
          headerTitle: "Select Location",
          headerStyle: { borderBottomWidth: 1 },
        }}
      />
    </Stack.Navigator>
  );
}
