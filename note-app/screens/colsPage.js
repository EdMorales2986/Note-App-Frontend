import { View, ImageBackground, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getUser } from "../components/storage";
import CircleButton from "../components/circleButton";
import SimpleListItem from "../components/simpleListItem";
import axios from "axios";

export default function ColsPage() {
  const [colModif, watchModif] = useState(0);
  const [colArray, setColArray] = useState([]);

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
    watchModif(0);
  }, [colModif]);

  return (
    <ImageBackground
      source={require("../assets/custom/layered-waves-haikei.png")}
      style={{ backgroundColor: "#fff", flex: 1 }}
    >
      <View>
        <FlatList
          data={colArray}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ padding: 10 }} />}
          ListFooterComponent={() => <View style={{ padding: 10 }} />}
          ListHeaderComponent={() => <View style={{ padding: 10 }} />}
          renderItem={({ item }) => (
            <SimpleListItem
              title={item.name}
              id={item._id}
              watchModif={watchModif}
            />
          )}
        />
      </View>
      <CircleButton watchModif={watchModif} />
    </ImageBackground>
  );
}
