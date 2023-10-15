import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getUser } from "../components/storage";
import CircleButtonV2 from "../components/circleButtonV2";
import ComplexListItem from "../components/complexListItem";
import axios from "axios";

export default function NotesPage() {
  const [noteModif, watchModif] = useState(0);
  const [noteArray, setNoteArray] = useState([]);

  async function getNotes() {
    const user = await getUser();
    try {
      const http = await axios.get(
        `https://note-app-backend.up.railway.app/notes/${user}`
      );
      if (http) {
        // console.log("update");
        setNoteArray(http.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNotes();
    watchModif(0);
  }, [noteModif]);

  return (
    <View>
      <View>
        <FlatList
          data={noteArray}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ padding: 10 }} />}
          ListFooterComponent={() => <View style={{ padding: 10 }} />}
          ListHeaderComponent={() => <View style={{ padding: 10 }} />}
          renderItem={({ item }) => (
            <ComplexListItem
              title={item.title}
              content={item.content}
              col={item.col}
              id={item._id}
              watchModif={watchModif}
            />
          )}
        />
      </View>
      <CircleButtonV2 watchModif={watchModif} />
    </View>
  );
}
