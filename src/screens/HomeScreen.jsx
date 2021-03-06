import React, { useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Animated
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import styles from "../styles";

import { setPlayerName } from "../actions/playerActions";

export default ({ navigation, route }) => {
  const animatedValue = new Animated.Value(0);
  const dispatch = useDispatch();
  const playerName = useSelector(state => state.playerReducer.name);

  const backgroundColorConfig = animatedValue.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [
      "#E8D7FF",
      "#FFD3E8",
      "#FFD7D5",
      "#F3FFE1",
      "#DFFFD6",
      "#DFFFD6"
    ]
  });

  const startBackgroundColorAnimation = () => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 15000
      })
    ).start();
  };

  useEffect(() => {
    startBackgroundColorAnimation();
  }, []);

  const handleChangeName = name => {
    dispatch(setPlayerName(name));
  };

  const handleNextButton = () => {
    if (playerName.length < 1) {
      alert("Player name cannot be empty!");
    } else {
      navigation.navigate("Difficulty Selection");
    }
  };

  return (
    <Animated.View
      style={[styles.centerOnly, { backgroundColor: backgroundColorConfig }]}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centerOnly}>
            <View style={customStyles.nameContainer}>
              <Text>Please type your name:</Text>
              <TextInput
                style={customStyles.nameField}
                value={playerName}
                onChangeText={text => handleChangeName(text)}
              />
            </View>

            <View>
              <TouchableOpacity
                onPress={handleNextButton}
                style={customStyles.nextButton}
              >
                <Text style={customStyles.nextButtonText}>Next!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

const customStyles = StyleSheet.create({
  nameField: {
    width: 300,
    height: 50,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 3,
    fontSize: 20,
    textAlign: "center",
    margin: 20,
    padding: 8,
    borderRadius: 8
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: "pink",
    padding: 10,
    borderRadius: 8,
    width: 200
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  nameContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  }
});
