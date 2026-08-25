import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';


const Counter = () => {
  const [count, setCount] = useState<number>(0)
  return (
    <View>
      <Text>Giá trị: {count}</Text>
      <Pressable onPress={()=>{setCount(count+1)}}>Increase</Pressable>
      <Pressable onPress={()=>{if (count>0) setCount(count-1)}}>Decrease</Pressable>
    </View>
  );
};

export default Counter;