import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { NotesContext } from "../data/store/AppContext";
import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function FolderScreen({ navigation }) {
  const { notes, folders } = useContext(NotesContext);

  // Group notes by folder
  const groupNotesByFolder = () => {
    const folderMap = {};
    folders.forEach((folder) => {
      folderMap[folder.id] = [];
    });
    notes.forEach((note) => {
      if (!folderMap[note.folderId]) {
        folderMap[note.folderId] = [];
      }
      folderMap[note.folderId].push(note);
    });

    const folderArray = Object.entries(folderMap)
      .map(([folderId, notes]) => {
        const folder = folders.find((folder) => folder.id === folderId);
        return {
          folder,
          noteInside: notes.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          ),
        };
      })
      .filter((item) => item.folder);

    return folderArray;
  };

  const [groupedNotes, setGroupedNotes] = useState([]);

  useEffect(() => {
    setGroupedNotes(groupNotesByFolder());
  }, [notes, folders]);

  const formatUpdateDate = (date) => {
    const updatedAt = new Date(date);
    const currentTime = new Date();

    const diffInMinutes = differenceInMinutes(currentTime, updatedAt);
    const diffInHours = differenceInHours(currentTime, updatedAt);
    const diffInDays = differenceInDays(currentTime, updatedAt);

    if (diffInMinutes < 1) {
      return "Just now";
    }
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? "min" : "mins"} ago`;
    }
    if (diffInDays === 0) {
      return `${diffInHours} ${diffInHours === 1 ? "hr" : "hrs"} ago`;
    }

    if (diffInDays < 10) {
      return `${diffInDays} days ago`;
    }

    return format(updatedAt, "MMMM d, yyyy");
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Folders</Text>
      </View>
      <Text
        style={{
          color: "blue",
          fontSize: 16,
          paddingLeft: 10,
        }}
      >
        {groupedNotes.length} {groupedNotes.length > 1 ? "folders" : "folder"}
      </Text>
      <FlatList
        data={groupedNotes}
        renderItem={({ item }) => {
          return (
            <View>
              <View
                style={{
                  backgroundColor: "white",
                  elevation: 5,
                  borderRadius: 10,
                  padding: 10,
                  margin: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text>{item.folder.name}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        marginRight: 5,
                        width: 70,
                        color: "blue",
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      {item.noteInside.length}{" "}
                      {item.noteInside.length > 1 ? "note" : "notes"}
                    </Text>
                    <Text>
                      {item.noteInside[0] && item.noteInside[0].updatedAt
                        ? formatUpdateDate(item.noteInside[0].updatedAt)
                        : "No update date"}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("NoteByFolder", {
                      folderId: item.folder.id,
                    });
                  }}
                >
                  <Ionicons name="chevron-forward-outline" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.folder.id}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
        onPress={() => navigation.navigate("NewFolder")}
      >
        <Ionicons name="add-circle" size={50} color="blue" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 25,
  },
  item: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
  },
});
