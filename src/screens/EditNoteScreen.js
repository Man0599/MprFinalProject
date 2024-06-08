import React, {
  useState,
  useRef,
  useContext,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  format,
  formatDistanceToNow,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NotesContext } from "../data/store/AppContext";
import Label from "../components/LabelItem";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
export default function EditNoteScreen({ route, navigation }) {
  const { noteId } = route.params;
  const context = useContext(NotesContext);

  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "70%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );
  const handleColorChange = (color) => {
    context.updateNote(note.id, {
      ...note,
      updatedAt: new Date().toISOString(),
      color: color,
    });
  };
  const handleFolderChange = (folderId) => {
    context.updateNote(note.id, {
      ...note,
      updatedAt: new Date().toISOString(),
      folderId: folderId,
    });
  };
  const note = context.notes.find((note) => note.id === noteId);
  const { notes, labels, folders } = context;
  const [content, setContent] = useState(note.content);
  const contentRef = useRef();

  const updateContent = () => {
    context.updateNote(noteId, {
      ...note,
      content: content,
      updatedAt: new Date().toISOString(),
    });
  };
  const time = (date) => {
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
      <View
        style={{
          padding: 10,
          flex: 1,
        }}
      >
        <Label labelIds={note.labelIds} />
        <TextInput
          placeholder="Update the text here"
          value={content}
          onChangeText={(text) => {
            setContent(text);
            updateContent();
          }}
          style={{
            fontSize: 16,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: "gray",
          }}
        />
        <Text
          style={{
            fontSize: 16,
            margin: 10,
            color: "blue",
            fontWeight: "bold",
          }}
        >
          If you want to add notes to a folder, select one of the folders below:{" "}
        </Text>
        <FlatList
          data={folders}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => handleFolderChange(item.id)}
                style={{
                  backgroundColor: note.folderId === item.id ? "white" : "blue",
                  margin: 10,
                  padding: 10,
                  borderRadius: 10,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: note.folderId === item.id ? "blue" : "white",
                  }}
                >
                  {note.folderId === item.id ? "Current in " : null}
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "lightgray",
        }}
      >
        <Text>{time(note.updatedAt)}</Text>
        <TouchableOpacity
          onPress={() => {
            context.updateNote(noteId, {
              ...note,
              isBookmarked: !note.isBookmarked,
              updatedAt: new Date().toISOString(),
            });
          }}
        >
          <Ionicons
            name={note.isBookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            sheetRef.current?.expand();
          }}
        >
          <Ionicons name="ellipsis-vertical-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        borderRadius={10}
        backdropComponent={renderBackdrop}
        onChange={(index) => console.log("snapped to index:", index)}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "transparent" }}
        enableDismissOnClose={false}
        style={{ borderRadius: 10, borderWidth: 1, borderColor: "gray" }}
      >
        <View style={{ backgroundColor: "white", height: "100%", padding: 10 }}>
          <FlatList
            horizontal
            data={context.colors}
            style={{ maxHeight: 70 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleColorChange(item)}>
                <View
                  style={{
                    backgroundColor: item || "white",
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    margin: 5,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  {item === null && (
                    <Ionicons
                      name="ban-outline"
                      size={32}
                      color="#ababab"
                      style={{ position: "absolute" }}
                    />
                  )}

                  {item === note.color && (
                    <Ionicons name="checkmark" size={30} color="black" />
                  )}
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Label labelIds={note.labelIds} />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#f0f0f0",
              marginRight: 5,
              marginBottom: 5,
            }}
            onPress={() => {
              navigation.navigate("ManageLabels", {
                noteId: note.id,
              });
            }}
          >
            <Text
              style={{
                padding: 4,
                textAlign: "center",
              }}
            >
              +Manage labels
            </Text>
          </TouchableOpacity>
          <ScrollView
            style={{
              flex: 1,
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                sheetRef.current?.close();
              }}
            >
              <Ionicons name="clipboard-outline" size={25} />
              <Text style={styles.textOption}>Copy to clipboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                sheetRef.current?.close();
              }}
            >
              <Ionicons name="share-social-outline" size={25} />
              <Text style={styles.textOption}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                context.deleteNote(note.id);
                navigation.goBack();
              }}
            >
              <Ionicons name="trash" size={25} />
              <Text style={styles.textOption}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                Alert.alert("Copied to clipboard");
              }}
            >
              <Ionicons name="copy" size={25} />
              <Text style={styles.textOption}>Make a copy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                sheetRef.current?.close();
              }}
            >
              <Ionicons name="pin-outline" size={25} />
              <Text style={styles.textOption}>Pin</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={() => {
                sheetRef.current?.close();
              }}
            >
              <Ionicons name="alarm-outline" size={25} />
              <Text style={styles.textOption}>Create a reminder</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetOption: {
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexDirection: "row",
    marginBottom: 5,
  },
  textOption: {
    marginLeft: 10,
    fontSize: 16,
  },
});
