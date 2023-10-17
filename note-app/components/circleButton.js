import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { circleButtonStyle } from "../styles/globalStyles";
import { Formik } from "formik";
import { getUser } from "./storage";
import axios from "axios";

export default function CircleButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const { height, width } = useWindowDimensions();

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
        `https://note-app-backend.up.railway.app/signin/${user}/cols/create`,
        // `http://192.168.0.185:4000/signin/${user}/cols/create`,
        {
          name: e.name,
        }
      );
      if (http) {
        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View
        style={{
          position: "absolute",
          width: 55,
          height: 55,
          borderRadius: 100,
          bottom: height * 0.01,
          right: width * 0.01,
        }}
      >
        <Pressable style={circleButtonStyle.wrapper} onPress={handleOpenModal}>
          <AntDesign name="plus" size={38} color="#fff" />
        </Pressable>
      </View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => handleCloseModal()}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
