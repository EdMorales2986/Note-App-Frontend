// import react, { useState } from "react";
import { StyleSheet, View } from "react-native";
import LoginPage from "./screens/loginPage";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
