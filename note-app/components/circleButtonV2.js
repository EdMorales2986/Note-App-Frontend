import { View, Text, TextInput, Pressable, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { circleButtonStyleV2 } from "../styles/globalStyles";
import { Formik } from "formik";
import { getUser } from "./storage";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

export default function CircleButtonV2() {
  const [modalVisible, setModalVisible] = useState(false);
  const [colArray, setColArray] = useState([]);
  const [col, setCol] = useState("");

  async function getCollections() {
    const user = await getUser();
    try {
      const http = await axios.get(
        `https://note-app-backend.up.railway.app/cols/${user}`
      );
      if (http) {
        // console.log("update");
        setColArray(http.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCollections();
  }, []);

  const handleOpenModal = () => {
    getCollections();
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const submitData = async (e) => {
    const user = await getUser();
    try {
      const http = await axios.post(
        `https://note-app-backend.up.railway.app/signin/${user}/notes/create`,
        // `http://192.168.0.185:4000/signin/${user}/notes/create`,
        {
          title: e.title,
          content: e.content,
          col: e.col,
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
      <View style={circleButtonStyleV2.container}>
        <Pressable
          style={circleButtonStyleV2.wrapper}
          onPress={handleOpenModal}
        >
          <AntDesign name="plus" size={38} color="#fff" />
        </Pressable>
      </View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => handleCloseModal()}
      >
        <View>
          <View>
            <Formik
              initialValues={{ title: "", content: "", col: "" }}
              onSubmit={(e) => submitData(e)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <TextInput
                    style={circleButtonStyleV2.inputs}
                    name="title"
                    placeholder="Note Title"
                    placeholderTextColor={"#092C70"}
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                    autoCapitalize="none"
                  />
                  <View style={circleButtonStyleV2.picker}>
                    <Picker
                      prompt="Choose a collection"
                      name="col"
                      selectedValue={values.col}
                      onValueChange={handleChange("col")}
                    >
                      <Picker.Item label="Default" value="" />
                      {colArray.map((item) => (
                        <Picker.Item
                          key={item._id}
                          label={item.name}
                          value={item.name}
                        />
                      ))}
                    </Picker>
                  </View>
                  <TextInput
                    style={circleButtonStyleV2.inputsContent}
                    multiline
                    name="content"
                    placeholder="Note Content"
                    placeholderTextColor={"#092C70"}
                    onChangeText={handleChange("content")}
                    onBlur={handleBlur("content")}
                    value={values.content}
                    autoCapitalize="none"
                  />
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <Pressable
                      style={circleButtonStyleV2.btnWrapper}
                      onPress={handleSubmit}
                    >
                      <Text style={circleButtonStyleV2.btnText}>Create</Text>
                    </Pressable>
                    <Pressable
                      style={circleButtonStyleV2.btnWrapper}
                      onPress={handleCloseModal}
                    >
                      <Text style={circleButtonStyleV2.btnText}>Close</Text>
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
