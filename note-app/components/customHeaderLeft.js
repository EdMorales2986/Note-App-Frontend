import React from "react";
import { Pressable, Text } from "react-native";
import { removeData, removeUser } from "../components/storage";

export default CustomHeaderLeft = ({ navigation }) => {
  function handleLogout() {
    removeData();
    removeUser();
    navigation.goBack();
  }

  return (
    <Pressable onPress={handleLogout}>
      <Text style={{ color: "#fff", fontWeight: "bold" }}>LogOut</Text>
    </Pressable>
  );
};
