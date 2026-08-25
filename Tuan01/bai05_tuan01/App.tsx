import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const LiveInput = () => {
  const [text, setText] = useState<string>("")
  return (
    <View>
      <Text>{text.length}</Text>
      <TextInput value={text} onChangeText={(value: string) => {
          setText(value);
        }} placeholder="Nhập nội dung..."/>
    </View>
  );
};

export default LiveInput;