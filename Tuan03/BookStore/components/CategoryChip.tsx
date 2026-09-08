import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CATEGORY = [
  "Văn học",
  "Kinh tế",
  "Thiếu nhi",
  "Truyện tranh",
  "Ngoại ngữ",
  "Lịch sử",
];

const CategoryChip = () => {
  return (
    <View style={styles.container}>
      {CATEGORY.map((cat) => {
        return (
          <View style={styles.chip}>
            <Text>{cat}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default CategoryChip;

const styles = StyleSheet.create({
  container: {
    margin: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "indigo",
    borderStyle: "solid",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
