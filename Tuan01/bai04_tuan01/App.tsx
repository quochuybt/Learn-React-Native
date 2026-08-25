import React from 'react';
import { Pressable, Text , View} from 'react-native';

interface ButtonType {
  label:string,
  onPress: () => void,
  color?:string
}
const MyButton = ({label,onPress,color="blue"}:ButtonType) => {
  return (
   <Pressable onPress={onPress} style={{backgroundColor:color}}>{label}</Pressable>
  );
};

const Test = () => {
  return (
    <View>
      <MyButton label="OnPress" onPress={()=>alert("Hello")} color="red"/>
    </View>
  );
};

export default Test;