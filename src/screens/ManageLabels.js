import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NotesContext } from "../data/store/AppContext";
export default function ManageLabels({ route }) {
  const context = useContext(NotesContext);
  const { labels, notes } = context;
  const { noteId } = route.params;
  let note = notes.find((note) => note.id === noteId);
  const getLabelName = (id) => {
    const label = labels.find((label) => label.id === id);
    return label ? label.label : "";
  };

  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  const [displayList, setDisplayList] = useState("");
  useEffect(() => {
    if (searchQuery) {
      const filterData = labels.filter((label) =>
        label.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayList(filterData);
    } else {
      setDisplayList(labels);
    }
  }, [searchQuery, labels]);

  const updateChosenLabel = (chosenLabelId) => {
    if (note.labelIds.includes(chosenLabelId)) {
      note.labelIds = note.labelIds.filter((id) => id !== chosenLabelId);
    } else {
      note.labelIds.push(chosenLabelId);
    }
    context.updateNote(noteId, {
      ...note,
      labelIds: note.labelIds,
      updatedAt: new Date().toISOString(),
    });
  };
  return (
    <View>
      <TextInput
        placeholder="Enter key word to search or create new"
        ref={searchRef}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={{
          borderWidth: 1,
          borderColor: "blue",
          margin: 10,
          padding: 10,
          fontSize: 16,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          padding: 10,
          margin: 10,
          borderRadius: 10,
          backgroundColor: "lightblue",
        }}
      >
        <Text>
          {note.labelIds.length
            ? "Selected Labels: " + note.labelIds.map(getLabelName).join(", ")
            : "No labels selected"}
        </Text>
        <Text>
          {labels.length
            ? "Available Labels: " + labels.length
            : "No labels available. Create new label"}
        </Text>
      </View>
      <Text
        style={{
          padding: 10,
          fontSize: 16,
          fontWeight: "bold",
          color: "blue",
        }}
      >
        Choose labels to add to the note
      </Text>
      <FlatList
        style={{ padding: 5 }}
        data={displayList}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={(item) => {
          return (
            <TouchableOpacity
              style={[
                styles.labelItem,
                note.labelIds.includes(item.item.id)
                  ? styles.selectedLabel
                  : styles.unselectedLabel,
              ]}
              onPress={() => {
                updateChosenLabel(item.item.id);
              }}
            >
              <Text
                style={[
                  styles.labelText,
                  note.labelIds.includes(item.item.id)
                    ? styles.selectedLabelText
                    : styles.unselectedLabelText,
                ]}
              >
                {item.item.label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  labelItem: {
    flex: 1,
    padding: 10,
    margin: 5,
    elevation: 2,
    borderRadius: 10,
    justifyContent: "center",
  },
  selectedLabel: {
    backgroundColor: "blue",
  },
  unselectedLabel: {
    backgroundColor: "lightblue",
  },
  labelText: {
    textAlign: "center",
    fontSize: 14,
  },
  selectedLabelText: {
    color: "white",
    fontWeight: "bold",
  },
  unselectedLabelText: {
    color: "blue",
  },
});
