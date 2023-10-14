import React from "react";
import { Text, Pressable } from "react-native";

export default function CustomHeaderRight({ navigation }) {
  return (
    <Pressable onPress={() => navigation.navigate("Account")}>
      <Text style={{ color: "#fff", fontWeight: "bold" }}>Account</Text>
    </Pressable>
  );
}
