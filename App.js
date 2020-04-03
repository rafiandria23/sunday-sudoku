// NPM PACKAGES
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// LOCAL DEPS
import store from "./src/stores";

// LOCAL COMPONENTS
import {
  HomeScreen,
  BoardScreen,
  FinishScreen,
  DifficultySelectionScreen
} from "./src/screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerTitle: "Welcome to Sunday Sudoku!" }}
          />
          <Stack.Screen
            name="Difficulty Selection"
            component={DifficultySelectionScreen}
            options={{ headerTitle: "Select a Difficulty!" }}
          />
          <Stack.Screen
            name="Board"
            component={BoardScreen}
            options={{ headerTitle: "Sunday Sudoku" }}
          />
          <Stack.Screen
            name="Finish"
            component={FinishScreen}
            options={{ headerTitle: "Sunday Sudoku" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
