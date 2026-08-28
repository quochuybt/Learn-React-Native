import {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

type Gender = 'male' | 'female' | 'other';

const GenderSelector = () => {
  const [gender, setGender] = useState<Gender>('male');

  return (
    <>
      <View>
      <Text>
        Chọn giới tính
      </Text>
      <TouchableOpacity onPress={() => setGender('male')}>
        <Text>Nam</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setGender('female')}>
        <Text>Nữ</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setGender('other')}>
        <Text>Khác</Text>
      </TouchableOpacity>
      <Text>
        Giới tính: {gender}
      </Text>
    </View>
    </>
  );
};

export default GenderSelector;