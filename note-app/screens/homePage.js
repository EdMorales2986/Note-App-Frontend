import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import NotePage from "../screens/notesPage";
import ColPage from "../screens/colsPage";

const Tab = createBottomTabNavigator();

export default function HomePage() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Notes"
        component={NotePage}
        options={{
          tabBarIcon: () => <AntDesign name="inbox" size={16} color="black" />,
        }}
      />
      <Tab.Screen
        name="Collections"
        component={ColPage}
        options={{
          tabBarIcon: () => (
            <AntDesign name="folder1" size={16} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
