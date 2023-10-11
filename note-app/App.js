import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { storeData, getDataJWT } from "./components/storage";
import axios from "axios";

import SignInPage from "./screens/signInPage";
import SignUpPage from "./screens/signUpPage";
import HomePage from "./screens/homePage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setState] = useState(false);

  async function verifyJWT() {
    const jwt = await getDataJWT();
    try {
      const http = await axios.post("http://192.168.0.182:4000/jwt-verify", {
        token: `${jwt}`,
      });
      if (http.data.state) {
        setState(true);
      }
    } catch (error) {
      console.log("Not Logged in");
    }
  }

  useEffect(() => {
    verifyJWT();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1A51BB" },
          headerTitleStyle: { color: "#fff" },
          headerTintColor: "#fff",
        }}
      >
        {loggedIn ? (
          <Stack.Screen name="Home" component={HomePage} />
        ) : (
          <>
            <Stack.Screen name="Sign In" component={SignInPage} />
            <Stack.Screen name="Sign Up" component={SignUpPage} />
            <Stack.Screen name="Home" component={HomePage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
