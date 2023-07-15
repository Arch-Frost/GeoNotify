import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { useAuthentication } from "../utils/hooks/useAuthentication";

const Stack = createStackNavigator();

export default function AppNavigator() {
    const user = useAuthentication();

    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? 'Main' : 'Auth'}>
            <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{ headerShown: false, gestureEnabled: false,  } }
            />
        </Stack.Navigator>
        </NavigationContainer>
    );
}