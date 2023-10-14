import { View, Text, TextInput, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { circleButtonStyle } from "../styles/globalStyles";
import { Formik } from "formik";
import { getUser } from "./storage";
import axios from "axios";

export default function CircleButton({ watchModif }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const submitData = async (e) => {
    const user = await getUser();
    try {
      const http = await axios.post(
        // "https://note-app-backend.up.railway.app/signin",
        `http://192.168.0.183:4000/signin/${user}/cols/create`,
        {
          name: e.name,
        }
      );
      if (http) {
        watchModif(1);
        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={circleButtonStyle.container}>
        <Pressable style={circleButtonStyle.wrapper} onPress={handleOpenModal}>
          <AntDesign name="plus" size={38} color="#fff" />
        </Pressable>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => handleCloseModal()}
      >
        <View style={circleButtonStyle.modalContainer}>
          <View style={circleButtonStyle.modalBody}>
            <Formik
              initialValues={{ name: "" }}
              onSubmit={(e) => submitData(e)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={circleButtonStyle.inputs}
                    name="name"
                    placeholder="Collection Name"
                    placeholderTextColor={"#092C70"}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    autoCapitalize="none"
                  />
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <Pressable
                      style={circleButtonStyle.btnWrapper}
                      onPress={handleSubmit}
                    >
                      <Text style={circleButtonStyle.btnText}>Create</Text>
                    </Pressable>
                    <Pressable
                      style={circleButtonStyle.btnWrapper}
                      onPress={handleCloseModal}
                    >
                      <Text style={circleButtonStyle.btnText}>Close</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </>
  );
}
