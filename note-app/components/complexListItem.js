import { View, Text, Pressable, Modal, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { complexListStyle } from "../styles/globalStyles";
import { Formik } from "formik";
import { getUser } from "./storage";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

export default function ComplexListItem({ title, content, id, watchModif }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [TITLE, setTitle] = useState(title);
  const [CONTENT, setContent] = useState(content);
  const [ID, setId] = useState(id);
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
  });

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
        `https://note-app-backend.up.railway.app/signin/${user}/notes/update/${id}`,
        // `http://192.168.0.185:4000/signin/${user}/notes/update/${id}`,
        {
          title: e.title,
          content: e.content,
          col: e.col,
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
  const deleteData = async (e) => {
    const user = await getUser();
    try {
      const http = await axios.post(
        `https://note-app-backend.up.railway.app/signin/${user}/notes/delete/${id}`
        // `http://192.168.0.185:4000/signin/${user}/notes/delete/${id}`
      );
      if (http) {
        watchModif(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={complexListStyle.container}>
        <Text style={complexListStyle.title}>{title}</Text>
        <Pressable style={complexListStyle.wrapper1} onPress={handleOpenModal}>
          <AntDesign name="edit" size={24} color="black" />
        </Pressable>
        <Pressable style={complexListStyle.wrapper2} onPress={deleteData}>
          <AntDesign name="delete" size={24} color="black" />
        </Pressable>
        <Text>{content}</Text>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => handleCloseModal()}
      >
        <View>
          <View>
            <Formik
              initialValues={{ title: title, content: content, col: col }}
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
                    style={complexListStyle.inputs}
                    name="title"
                    placeholder="Note Title"
                    placeholderTextColor={"#092C70"}
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                    autoCapitalize="none"
                  />
                  <View style={complexListStyle.picker}>
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
                    style={complexListStyle.inputsContent}
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
                      style={complexListStyle.btnWrapper}
                      onPress={handleSubmit}
                    >
                      <Text style={complexListStyle.btnText}>Create</Text>
                    </Pressable>
                    <Pressable
                      style={complexListStyle.btnWrapper}
                      onPress={handleCloseModal}
                    >
                      <Text style={complexListStyle.btnText}>Close</Text>
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
