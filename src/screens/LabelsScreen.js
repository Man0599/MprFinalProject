import React, { useContext, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NotesContext } from "../data/store/AppContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dialog from "react-native-dialog";

export default function LabelsScreen() {
  const context = useContext(NotesContext);
  const { labels, notes, trash } = context;

  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  const [isSearching, setIsSearching] = useState(false);
  const [displayList, setDisplayList] = useState("");

  const [dialogVisible, setDialogVisible] = useState(false);
  const [editLabel, setEditLabel] = useState("");
  const [editLabelId, setEditLabelId] = useState("");

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
  const handleInput = (text) => {
    setSearchQuery(text);
    if (text.length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  const handleLabelEdit = (label) => {
    setEditLabel(label.label);
    setEditLabelId(label.id);
    setDialogVisible(true);
  };

  const createNewLabel = () => {
    let isExist = labels.find((label) => label.label === searchQuery);
    if (isExist) {
      alert("Label already exist");
      setSearchQuery("");
      setIsSearching(false);
      return;
    }
    context.addLabel({ label: searchQuery });
    setSearchQuery("");
    setIsSearching(false);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: "blue",
          padding: 10,
          fontSize: 16,
          flexDirection: "row",
          borderRadius: 10,
        }}
      >
        <TextInput
          placeholder="Enter key word to search or create new"
          style={{
            flex: 1,
            fontSize: 16,
          }}
          value={searchQuery}
          onChangeText={handleInput}
          ref={searchRef}
        />
        <Ionicons
          name={isSearching ? "close" : "search"}
          size={25}
          color="black"
          onPress={() => {
            if (isSearching) {
              setSearchQuery("");
              setIsSearching(false);
              searchRef.current.clear();
            }
          }}
        />
      </View>
      {isSearching ? (
        <View>
          <TouchableOpacity onPress={createNewLabel}>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              +Create new label '{searchQuery}'
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 5,
              color: displayList.length === 0 ? "red" : "blue",
            }}
          >
            {displayList.length === 0
              ? "No labels found match with " + searchQuery
              : "Found " +
                displayList.length +
                " labels match with " +
                searchQuery +
                ":"}
          </Text>
        </View>
      ) : (
        <Text
          style={{
            marginVertical: 10,
          }}
        >
          {labels.length === 0 ? "No labels found" : labels.length + " total"}
        </Text>
      )}
      <FlatList
        data={displayList}
        key={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 10,
              marginRight: 5,
              backgroundColor: "blue",
              maxWidth: "45%",
              elevation: 5,
              alignContent: "center",
              justifyContent: "center",
              marginBottom: 5,
            }}
            onPress={() => {
              handleLabelEdit(item);
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
      {dialogVisible ? (
        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>Edit label</Dialog.Title>
          <Dialog.Input
            value={editLabel}
            onChangeText={(text) => setEditLabel(text)}
          />
          <Dialog.Button
            label="Save"
            onPress={() => {
              context.updateLabel(editLabelId, { label: editLabel });
              setDialogVisible(false);
            }}
          />
          <Dialog.Button
            label="Remove"
            style={{ color: "red" }}
            onPress={async () => {
              try {
                // Iterate over each note and update if it contains the editLabelId
                for (const note of notes) {
                  if (note.labelIds.includes(editLabelId)) {
                    await context.updateNote(note.id, {
                      ...note,
                      labelIds: note.labelIds.filter(
                        (id) => id !== editLabelId
                      ),
                    });
                  }
                }
                for (const note of trash) {
                  if (note.labelIds.includes(editLabelId)) {
                    await context.updateTrash(note.id, {
                      ...note,
                      labelIds: note.labelIds.filter(
                        (id) => id !== editLabelId
                      ),
                    });
                  }
                }
                context.deleteLabel(editLabelId);
              } catch (error) {
                console.error(error);
              }

              setDialogVisible(false);
            }}
          />
        </Dialog.Container>
      ) : null}
    </View>
  );
}
