import React, { useContext, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NotesContext } from "../data/store/AppContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeItem from "../components/HomeItem";
export default function HomeScreen({ navigation }) {
  const { notes } = useContext(NotesContext);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  useEffect(() => {
    const sortedNotes = [...notes]
      .filter((note) =>
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setFilteredNotes(sortedNotes);
  }, [searchQuery, notes]);
  const renderNotes = () => {
    if (searchQuery.length === 0) {
      if (notes.length === 0) {
        return (
          <Text
            style={{
              color: "red",
              paddingLeft: 10,
            }}
          >
            Please add a new note
          </Text>
        );
      } else {
        return (
          <Text
            style={{
              color: "blue",
              paddingLeft: 10,
            }}
          >
            {notes.length} notes
          </Text>
        );
      }
    } else {
      if (filteredNotes.length === 0) {
        return (
          <Text
            style={{
              color: "red",
              paddingLeft: 10,
            }}
          >
            Not Found!
          </Text>
        );
      } else {
        return (
          <Text
            style={{
              paddingLeft: 10,
              color: "blue",
            }}
          >
            {filteredNotes.length} {filteredNotes.length > 1 ? "notes" : "note"}{" "}
            found
          </Text>
        );
      }
    }
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
        {isSearching ? (
          <View style={styles.search}>
            <TextInput
              ref={searchRef}
              placeholder="Search"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              style={[
                styles.headerText,
                { borderBottomWidth: 1, flex: 1, borderColor: "blue" },
              ]}
            />
            <TouchableOpacity
              onPress={() => {
                setIsSearching(false);
                setSearchQuery("");
              }}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.search}>
            <Text style={styles.headerText}>Notes</Text>
            <TouchableOpacity
              onPress={() => {
                setIsSearching(true);
              }}
            >
              <Ionicons name="search" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {renderNotes()}
      <FlatList
        data={filteredNotes}
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
        onPress={() => navigation.navigate("NewNote", { folderId: null })}
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
