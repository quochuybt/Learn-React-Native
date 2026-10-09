import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants/images";
import { AntDesign } from "@expo/vector-icons";

const DetailScreen = ({ navigation, route }: any) => {
  const item = route?.params?.item;
  const [isLiked, setIsLiked] = useState(false);
  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View
        style={{
          backgroundColor: "#E941411A",
          height: 388,
          paddingHorizontal: 25,
          borderRadius: 10,
        }}
      >
        <Image
          source={images[item.image]}
          style={{ height: "100%", width: "100%", resizeMode: "contain" }}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 35, fontWeight: "500" }}>{item.title}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 30, marginTop: 10 }}>
        <Text style={{ fontSize: 24, color: "#00000096" }}>15% OFF I 350$</Text>
        <Text style={{ fontSize: 24, textDecorationLine: "line-through" }}>
          {item.price}$
        </Text>
      </View>
      <View>
        <Text style={{ marginVertical: 30, fontSize: 22 }}>Description</Text>
        <Text style={{ fontSize: 21, color: "#00000091" }}>
          It is a very important form of writing as we write almost everything
          in paragraphs, be it an answer, essay, story, emails, etc.
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          marginVertical: 30,
        }}
      >
        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
          <AntDesign
            name="heart"
            size={40}
            color={isLiked ? "#E95555" : "#8A8A8A"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#E94141",
            paddingHorizontal: 60,
            paddingVertical: 10,
            borderRadius: 30,
          }}
        >
          <Text style={{ fontSize: 26, color: "white" }}>Add to card</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
