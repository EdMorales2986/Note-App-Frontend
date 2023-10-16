import { View, Text, Pressable, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { simpleListStyle } from "../styles/globalStyles";
import { Formik } from "formik";
import { getUser } from "./storage";
import axios from "axios";

export default function SimpleListItem({ title, id }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [TITLE, setTitle] = useState(title);
  const [ID, setId] = useState(id);

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
        `https://note-app-backend.up.railway.app/signin/${user}/cols/update/${id}`,
        // `http://192.168.0.185:4000/signin/${user}/cols/update/${id}`,
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
  const deleteData = async (e) => {
    const user = await getUser();
    try {
      const http = await axios.post(
        `https://note-app-backend.up.railway.app/signin/${user}/cols/delete/${id}`
        // `http://192.168.0.185:4000/signin/${user}/cols/delete/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={simpleListStyle.container}>
        <Text style={simpleListStyle.title}>{title}</Text>
        <Pressable style={simpleListStyle.wrapper1} onPress={handleOpenModal}>
          <AntDesign name="edit" size={24} color="black" />
        </Pressable>
        <Pressable style={simpleListStyle.wrapper2} onPress={deleteData}>
          <AntDesign name="delete" size={24} color="black" />
        </Pressable>
      </View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => handleCloseModal()}
      >
        <View style={simpleListStyle.modalContainer}>
          <View style={simpleListStyle.modalBody}>
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
                    style={simpleListStyle.inputs}
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
                      style={simpleListStyle.btnWrapper}
                      onPress={handleSubmit}
                    >
                      <Text style={simpleListStyle.btnText}>Update</Text>
                    </Pressable>
                    <Pressable
                      style={simpleListStyle.btnWrapper}
                      onPress={handleCloseModal}
                    >
                      <Text style={simpleListStyle.btnText}>Close</Text>
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
