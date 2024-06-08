import React from "react";
import { View, Text } from "react-native";
import {
  format,
  formatDistanceToNow,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

import Ionicons from "react-native-vector-icons/Ionicons";
import LabelItem from "./LabelItem";
export default function TrashItem({ item }) {
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
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {item.color ? (
          <View
            style={{
              backgroundColor: item.color,
              width: 15,
              height: 15,
              borderRadius: 10,
              marginRight: 10,
            }}
          />
        ) : null}
        <Text
          style={{
            flex: 1,
          }}
        >
          {time(item.updatedAt)}
        </Text>
        {item.isBookmarked ? (
          <Ionicons name="bookmark" size={20} color="lightblue" />
        ) : null}
      </View>
      <LabelItem labelIds={item.labelIds} />

      <Text>{item.content}</Text>
    </View>
  );
}
