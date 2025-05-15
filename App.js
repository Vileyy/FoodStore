import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/LoginScreen";
import SignUpScreen from "./src/SignUpScreen";
import HomeScreen from "./src/HomeScreen";
import CuisineDetailScreen from "./src/CuisineDetailScreen";
import { CartProvider } from "./src/context/CartContext";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CuisineDetail" component={CuisineDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </CartProvider>
  );
};

export default App;
