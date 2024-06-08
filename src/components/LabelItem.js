import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NotesContext } from "../data/store/AppContext";
import { constraints } from "../constraints/style";
export default function LabelItem({ labelIds }) {
  const context = useContext(NotesContext);
  const { labels } = context;

  const getLabelName = (id) => {
    const label = labels.find((label) => label.id === id);
    return label ? label.label : "";
  };

  return (
    <View style={styles.container}>
      {labelIds?.map((labelId) => (
        <View key={labelId} style={constraints.label}>
          <Text style={constraints.labelText}>{getLabelName(labelId)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
    justifyContent: "start",
  },
});
