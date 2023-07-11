import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import TaskDetailsScreen from './screens/TaskDetailsScreen';
import NewTaskScreen from './screens/NewTaskScreen';
import HomeScreen from './screens/HomeScreen';
import AuthNavigator from './navigation/AuthNavigator';

export default function App() {
  return (
    <>
      {/* <TaskDetailsScreen /> */}
      {/* <NewTaskScreen />  */}
      {/* <HomeScreen /> */}
      <AuthNavigator />
      <StatusBar style="auto" hidden={true}/>
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