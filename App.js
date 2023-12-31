import "react-native-gesture-handler";
import "expo-dev-client";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import { addBadgeCount } from "./utils/NotificationManager";
import "./config/firebase";
import AppNavigator from "./navigation/AppNavigator";
import {
  requestLocationPermissionsAsync,
  startLocationUpdatesAsync,
  getDistanceFromCurrentLocationAsync,
  startAllRegisteredGeofencesAsync,
} from "./utils/LocationManager";
import { requestNotificationPermissionsAsync } from "./utils/NotificationManager";
import { getAllTasks, getTaskDetails } from "./utils/FirestoreManager";

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
const BACKGROUND_LOCATION_TASK = "BACKGROUND-LOCATION-TASK";
const BACKGROUND_GEOFENCING_TASK = "BACKGROUND-GEOFENCING-TASK";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log("Error in background notification task: ", error.message);
    return;
  }
  if (data) {
    const { content } = data;
    // Do something with the notification data
    console.log(
      `Notification received in background: ${content.title} : ${content.body}`
    );
  }
});

TaskManager.defineTask(
  BACKGROUND_LOCATION_TASK,
  ({ data: { locations }, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
      console.log("Error in background location task: ", error.message);
      return;
    }
    console.log(
      "Received new locations\n",
      "Latitude: ",
      locations[0].coords.latitude,
      "Longitude: ",
      locations[0].coords.longitude
    );
  }
);

TaskManager.defineTask(BACKGROUND_GEOFENCING_TASK,
  async ({ data: { eventType, region }, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
      console.log("Error in background geofencing task: ", error.message);
      return;
    }
    const task = await getTaskDetails(region.identifier);

    if (eventType === Location.GeofencingEventType.Enter) {
      if (!task.status) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: task.taskName,
            body: task.locationName + " is nearby!",
          },
          trigger: null,
        });
        addBadgeCount();
      }
    }
  }
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

export default function App() {
  useEffect(() => {
    const backgroundLocationTask = async () => {
      await requestLocationPermissionsAsync();
      await requestNotificationPermissionsAsync();
    };
    const backgroundNotificationTask = async () => {
      await startLocationUpdatesAsync();
    };

    backgroundLocationTask();
    backgroundNotificationTask();
  }, []);

  return (
    <>
      <AppNavigator />
      {/* <LocationMapScreen /> */}

      <StatusBar style="auto" />
    </>
  );
}
