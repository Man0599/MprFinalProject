import React, { useContext, useRef, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NotesContext } from "../data/store/AppContext";
export default function NewNoteScreen({ navigation, route }) {
  const context = useContext(NotesContext);
  const [content, setContent] = useState("");
  const contentRef = useRef(null);
  const { folderId } = route.params;
  const handleDone = () => {
    if (content.trim() === "") {
      return;
    }
    context.addNote({
      content,
      updatedAt: new Date().toISOString(),
      folderId: folderId,
    });
    setContent("");
    contentRef.current.clear();
    navigation.goBack();
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TextInput
        ref={contentRef}
        placeholder="Take a note here..."
        value={content}
        onChangeText={(text) => setContent(text)}
        multiline
        style={{
          fontSize: 20,
          padding: 10,
          borderRadius: 10,
          borderWidth: 2,
          margin: 10,
          borderColor: "lightgreen",
        }}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
        onPress={handleDone}
      >
        <Ionicons name="checkmark-circle" size={50} color="blue" />
      </TouchableOpacity>
    </View>
  );
}
