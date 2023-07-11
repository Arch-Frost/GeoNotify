import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
} from "react-native";

import { MaterialIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import DatePicker from "react-native-modern-datepicker";

// Primary Color: Teal (#008080)
// Secondary Color: Light Gray (#D3D3D3)
// Accent Color: Dark Teal (#006766)

const Separator = () => <View style={styles.separator}></View>;

const NewTaskScreen = () => {
  const [isRingAlarmEnabled, setIsRingAlarmEnabled] = useState(false);
  const [isAnytimeEnabled, setIsAnytimeEnabled] = useState(true);
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);

  const alarmSwitch = () => {
    setIsRingAlarmEnabled((previousState) => !previousState);
  };

  const anytimeSwitch = () => {
    setIsAnytimeEnabled((previousState) => !previousState);
  };

  const repeatSwitch = () => {
    setIsRepeatEnabled((previousState) => !previousState);
  }

  // ===================================================================================
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDateModalVisible, setStartDateModalVisible] = useState(false);
  const [endDateModalVisible, setEndDateModalVisible] = useState(false);

  const handleStartDateModal = () => {
    setStartDateModalVisible(!startDateModalVisible);
  };

  const handleEndDateModal = () => {
    setEndDateModalVisible(!endDateModalVisible);
  };

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const clearDates = () => {
    setStartDate("");
    setEndDate("");
  };
  // ===================================================================================

  return (
    <KeyboardAvoidingView
      style={styles.container}
      abehavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        keyboardDismissMode="interactive"
        contentContainerStyle={styles.contentContainer}
      >
        {/* =============================== Task Details Heading =============================== */}
        <Text style={styles.sectionHeading}>Task Details</Text>

        {/* =============================== Reminder TextBox =============================== */}
        <View style={styles.optionContainer}>
          <TextInput
            style={styles.reminderInput}
            placeholder="Remind Me About"
            placeholderTextColor="#808080" // Gray
          />
        </View>

        <Separator />
        {/* =============================== Location Selector =============================== */}
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.locationButton}>
            <MaterialIcons name="place" size={24} color="#008080" />
            <Text style={[styles.infoText, { width: "80%" }]}>
              Select Location
            </Text>
            <MaterialIcons name="search" size={24} color="#808080" />
          </TouchableOpacity>
        </View>

        <Separator />
        {/* =============================== Geofence Radius =============================== */}
        <View style={styles.optionContainer}>
          <FontAwesome name="location-arrow" size={24} color="#008080" />
          <Text style={[styles.infoText]}>Geofence Radius: </Text>
          <TextInput
            style={styles.radiusInput}
            placeholder="75"
            placeholderTextColor="#808080"
            keyboardType="number-pad"
          />
          <Text style={[styles.infoText]}>m</Text>
          <View style={{ width: "35%" }}></View>
        </View>

        <Separator />
        {/* =============================== Alarm Switch =============================== */}
        <View style={styles.optionContainer} onTouchEnd={alarmSwitch}>
          <MaterialIcons name="access-alarm" size={24} color="#008080" />
          <Text style={[styles.infoText]}>Ring Alarm </Text>
          <View style={{ width: "50%" }}></View>
          <Switch
            trackColor={{ false: "#808080", true: "#008080" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#808080"
            value={isRingAlarmEnabled}
          />
        </View>

        <Separator />
        <Separator />
        {/* =============================== Scheduling Options =============================== */}
        <Text style={styles.sectionHeading}>Scheduling Options</Text>

        <Separator />

        <View style={styles.optionContainer} onTouchEnd={anytimeSwitch}>
          <FontAwesome5 name="clock" size={24} color="#008080" />
          <Text style={[styles.infoText]}>Anytime </Text>
          <View style={{ width: "55%" }}></View>
          <Switch
            trackColor={{ false: "#808080", true: "#008080" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#808080"
            value={isAnytimeEnabled}
          />
        </View>

        <Separator />

        <View style={isAnytimeEnabled ? {alignItems: "center", opacity: 0} : {alignItems: "center", opacity: 1}}>
          <View style={styles.optionContainer}>
            <FontAwesome5 name="calendar-alt" size={24} color="#008080" />
            <Text style={[styles.infoText]}>Date Interval</Text>
            <View style={{ width: "61%" }}></View>
          </View>

          <TouchableOpacity
            style={styles.optionContainer}
            onPress={handleStartDateModal}
            disabled={isAnytimeEnabled}
          >
            <Text style={[styles.infoText]}>Start Date: </Text>
            <TextInput
              style={[styles.radiusInput, { width: "30%" }]}
              placeholder="YYYY/MM/DD"
              placeholderTextColor="#808080"
              editable={false}
              value={startDate}
            />
            <MaterialIcons name="arrow-drop-down" size={24} color="#008080" />
          </TouchableOpacity>

          {/* ==================================== Start Date Modal ==================================== */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={startDateModalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  selected={startDate}
                  onDateChange={handleStartDate}
                  maximumDate={endDate}
                  options={styles.calendarCustomization}
                />

                <TouchableOpacity onPress={handleStartDateModal}>
                  <Text
                    style={[
                      styles.infoText,
                      { color: "#008080", fontWeight: "bold" },
                    ]}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            style={styles.optionContainer}
            onPress={handleEndDateModal}
            disabled={isAnytimeEnabled}
          >
            <Text style={[styles.infoText]}> End Date: </Text>
            <TextInput
              style={[styles.radiusInput, { width: "30%" }]}
              placeholder="YYYY/MM/DD"
              placeholderTextColor="#808080"
              editable={false}
              value={endDate}
            />
            <MaterialIcons name="arrow-drop-down" size={24} color="#008080" />
          </TouchableOpacity>

          {/* ==================================== End Date Modal ==================================== */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={endDateModalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  selected={endDate}
                  onDateChange={handleEndDate}
                  minimumDate={startDate}
                  options={styles.calendarCustomization}
                />

                <TouchableOpacity onPress={handleEndDateModal}>
                  <Text
                    style={[
                      styles.infoText,
                      { color: "#008080", fontWeight: "bold" },
                    ]}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity style={styles.optionContainer} onPress={clearDates} disabled={isAnytimeEnabled}>
            <Text
              style={[
                styles.infoText,
                { color: "#008080", fontWeight: "bold" },
              ]}
            >
              Clear Dates
            </Text>
          </TouchableOpacity>

          <Separator />
          <View style={styles.optionContainer} onTouchEnd={repeatSwitch}>
            <MaterialIcons name="repeat" size={24} color="#008080" />
            <Text style={[styles.infoText]}>Repeat </Text>
            <View style={{ width: "58%" }}></View>
            <Switch 
            trackColor={{ false: "#808080", true: "#008080" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#808080"
            value={isRepeatEnabled}
            />
          </View>

          {/* ================================================= Save Button ================================================= */}
          <View style={{ height: 50 }}></View>
        </View>

        <TouchableOpacity style={[styles.saveButton]}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor: "#D3D3D3", // Light Gray
  },
  contentContainer: {
    paddingTop: 30,
    alignItems: "center", // Horizontal
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#008080",
    padding: 25,
    alignItems: "center",
    width: "90%",
    shadowColor: "#008080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  calendarCustomization: {
    // backgroundColor: "#D3D3D3", // Secondary Color: Light Gray (background)
    textHeaderColor: "#006766", // Accent Color: Dark Teal (header text)
    textDefaultColor: "#008080", // Primary Color: Teal (default text)
    selectedTextColor: "#fff", // White (selected text)
    mainColor: "#006766", // Accent Color: Dark Teal (main color)
    textSecondaryColor: "#008080", // Secondary Color: Light Gray (secondary text)
    borderColor: "rgba(0, 128, 128, 0.1)", // Secondary Color: Light Gray with reduced opacity (border color)
  },

  reminderInput: {
    width: "95%",
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#008080", // Teal
    paddingHorizontal: 5,
    color: "#000",
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#808080",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  separator: {
    marginVertical: 0,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
  },
  locationButton: {
    // backgroundColor: "#D3D3D3", // Light Gray
    width: "100%",
    borderColor: "#008080", // Teal
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
  infoText: {
    color: "#808080", // Gray
    fontSize: 16,
    marginLeft: 10,
  },
  radiusInput: {
    width: 30,
    borderBottomWidth: 1,
    borderColor: "#008080", // Teal
    paddingHorizontal: 5,
    color: "#000",
  },
  saveButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#008080", // Teal
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NewTaskScreen;
