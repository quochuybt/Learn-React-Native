import {View,Pressable,Alert} from 'react-native';

type CustomError = {
  message: string;
};

const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/productssss');
    if (!response.ok) {
      throw new Error('Không thể lấy dữ liệu sản phẩm');
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    const customError = error as CustomError;
    alert(
      'Lỗi '+ 
      customError.message
    );
  }
};

const APIErrorHandling = () => {
  return (
    <View>
      <Pressable onPress={fetchProducts}>Call API</Pressable>
    </View>
  );
}

export default APIErrorHandling;