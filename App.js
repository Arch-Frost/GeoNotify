import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import './config/firebase'
import AppNavigator from './navigation/AppNavigator';
import LocationMapScreen from './screens/LocationMapScreen';

export default function App() {
  return (
    <>
      <AppNavigator />
      {/* <LocationMapScreen /> */}
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: '#D3D3D3', // Light Gray
    alignItems: 'center',
    justifyContent: 'center',
  }
})