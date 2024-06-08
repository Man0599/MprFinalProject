import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function DrawerComponent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes App</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});
