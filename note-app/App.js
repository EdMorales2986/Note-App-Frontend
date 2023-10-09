// import react, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInPage from "./screens/signinPage";
import SignUpPage from "./screens/signupPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1A51BB" },
          headerTitleStyle: { color: "#fff" },
          headerTintColor: "#fff",
        }}
      >
        {/* <View style={styles.container}>
          <LoginPage />
        </View> */}
        <Stack.Screen name="Sign In" component={SignInPage} />
        <Stack.Screen name="Sign Up" component={SignUpPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
