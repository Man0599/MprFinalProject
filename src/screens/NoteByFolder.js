import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NotesContext } from "../data/store/AppContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeItem from "../components/HomeItem";
export default function NoteByFolder({ navigation, route }) {
  const { notes, folders } = useContext(NotesContext);
  const [displayList, setDisplayList] = useState(null);
  const folderId = route.params.folderId;
  const folder = folders.find((f) => f.id === folderId);
  useEffect(() => {
    const sortedNotes = [...notes]
      .filter((note) => note.folderId === folderId)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setDisplayList(sortedNotes);
    if (folder) {
      navigation.setOptions({ title: folder.name });
    }
  }, [notes]);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {notes.length == 0 ? (
        <Text
          style={{
            color: "red",
            paddingLeft: 10,
          }}
        >
          Please add a new note
        </Text>
      ) : null}

      <FlatList
        data={displayList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <HomeItem item={item} navigation={navigation} />;
        }}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
        onPress={() => {
          navigation.navigate("NewNote", { folderId: folderId })
        }}
      >
        <Ionicons name="add-circle" size={50} color="blue" />
      </TouchableOpacity>
    </View>
  );
}
