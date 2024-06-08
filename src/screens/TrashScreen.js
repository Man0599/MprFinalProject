import React, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { NotesContext } from "../data/store/AppContext";
import Dialog from "react-native-dialog";
import TrashItem from "../components/TrashItem";
export default function TrashScreen() {
  const context = useContext(NotesContext);
  const { trash } = context;
  const [chosenNote, setChosenNote] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [displayList, setDisplayList] = useState([]);
  useEffect(() => {
    const filterData = trash.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    setDisplayList(filterData);
  }, [trash]);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "blue",
            flex: 1,
          }}
        >
          {trash.length === 0 ? "Trash is empty" : null}
          {trash.length === 1 ? "1 note in trash" : null}
          {trash.length > 1 ? `${trash.length} notes in trash` : null}
        </Text>

        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "red",
            borderRadius: 5,
            marginRight: 10,
          }}
          onPress={() => {
            context.emptyTrash();
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Empty Trash
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "lightgreen",
            borderRadius: 5,
            marginRight: 10,
          }}
          onPress={() => {
            trash.forEach((note) => {
              context.restoreNote(note.id);
            });
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Restore All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={displayList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              padding: 10,
              margin: 10,
              borderRadius: 10,
              elevation: 5,
            }}
            onPress={() => {
              setChosenNote(item.id);
              setDialogVisible(true);
            }}
          >
            <TrashItem item={item} />
          </TouchableOpacity>
        )}
      />
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Restore Note</Dialog.Title>
        <Dialog.Description>
          What do you want to do with this note?
        </Dialog.Description>
        <Dialog.Button
          label="Delete Permanent"
          onPress={() => {
            context.trashNote(chosenNote);
            setDialogVisible(false);
          }}
          style={{
            color: "red",
          }}
        />
        <Dialog.Button
          label="Restore"
          onPress={() => {
            context.restoreNote(chosenNote);
            setDialogVisible(false);
          }}
          style={{
            color: "green",
          }}
        />
      </Dialog.Container>
    </View>
  );
}
