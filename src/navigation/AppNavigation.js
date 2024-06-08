import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerComponent from "../components/Drawer";
import HomeScreen from "../screens/HomeScreen";
import NewNoteScreen from "../screens/NewNoteScreen";
import EditNoteScreen from "../screens/EditNoteScreen";
import ManageLabels from "../screens/ManageLabels";
import LabelsScreen from "../screens/LabelsScreen";
import TrashScreen from "../screens/TrashScreen";
import FolderScreen from "../screens/FolderScreen";
import NoteByFolder from "../screens/NoteByFolder";
import NewFolderScreen from "../screens/NewFolderScreen";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewNote"
        component={NewNoteScreen}
        options={{
          title: "New Note",
        }}
      />
      <Stack.Screen
        name="EditNote"
        component={EditNoteScreen}
        options={{
          title: "Edit Note",
        }}
      />
      <Stack.Screen
        name="ManageLabels"
        component={ManageLabels}
        options={{
          title: "Manage Labels",
        }}
      />
    </Stack.Navigator>
  );
}
function FolderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Folders"
        component={FolderScreen}
        options={{
          title: "Folders",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NoteByFolder"
        component={NoteByFolder}
        options={{
          title: "Notes",
        }}
      />
      <Stack.Screen
        name="NewFolder"
        component={NewFolderScreen}
        options={{
          title: "New Folder",
        }}
      />
      <Stack.Screen
        name="EditNote"
        component={EditNoteScreen}
        options={{
          title: "Edit Note",
        }}
      />
      <Stack.Screen
        name="ManageLabels"
        component={ManageLabels}
        options={{
          title: "Manage Labels",
        }}
      />
      <Stack.Screen
        name="NewNote"
        component={NewNoteScreen}
        options={{
          title: "New Note",
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerComponent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Labels"
          component={LabelsScreen}
          options={{
            title: "Labels",
          }}
        />
        <Drawer.Screen
          name="Trash"
          component={TrashScreen}
          options={{
            title: "Trash",
          }}
        />
        <Drawer.Screen
          name="Folder"
          component={FolderStack}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
