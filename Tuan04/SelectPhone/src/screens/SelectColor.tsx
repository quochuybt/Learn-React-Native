import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const SelectColor = ({ navigation }: any) => {
  const [selectedColor, setSelectedColor] = useState("blue");

  const images: any = {
    blue: require("../../assets/blue.png"),
    red: require("../../assets/red.png"),
    den: require("../../assets/den.png"),
    silver: require("../../assets/silver.png"),
  };

  const handleDone = () => {
    navigation.popTo("PhoneDetail", {
      selectedColor: selectedColor,
    });
  };

  const colors: any = {
    silver: "#C5F1FB",
    red: "red",
    den: "black",
    blue: "#234896",
  };

  return (
    <View style={styles.container}>
      <View style={styles.inf}>
        <Image source={images[selectedColor]} style={styles.image} />
        <Text style={styles.title}>
          Điện Thoại Vsmart Joy 3 Hàng chính hãng
        </Text>
      </View>
      <View style={styles.colorContainer}>
        <Text style={styles.chooseText}>Chọn một màu bên dưới:</Text>
        <View style={styles.colors}>
          {Object.keys(colors).map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.color,
                {
                  backgroundColor: colors[color],
                },
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleDone}>
        <Text style={styles.buttonText}>XONG</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectColor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
  },
  inf: {
    height: 165,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  image: {
    width: 120,
    height: 140,
    resizeMode: "contain",
  },
  title: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  colorContainer: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 15,
  },
  colors: {
    alignItems: "center",
    justifyContent: "center",
  },
  color: {
    width: 100,
    height: 100,
    marginVertical: 7,
  },
  chooseText: {
    fontSize: 20,
    marginBottom: 5,
  },
  button: {
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 30,
    borderRadius: 10,
    backgroundColor: "blue",
    borderWidth: 1,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
