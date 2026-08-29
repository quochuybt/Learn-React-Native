import React, { useState } from 'react';
import {View,Text,TextInput,Pressable,FlatList} from 'react-native';

type ProductType = {
  id: number;
  title: string;
  price: number;
};

const fetchProducts = async (keyword:string,limit:number) => {
  const response = await fetch(`https://dummyjson.com/products/search?q=${keyword}&limit=${limit}`);
  const data = await response.json();
  return data.products
  };

const ProductSearchAPI = () => {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState<ProductType[]>([]);

  const searchProducts = async () => {
    const result = await fetchProducts(keyword, 10);
    setProducts(result);
  };

  return (
    <View>
      <Text>Tìm sản phẩm</Text>
      <TextInput
        placeholder="Nhập từ khóa"
        value={keyword}
        onChangeText={setKeyword}
      />
      <Pressable
        onPress={searchProducts}
      > Tìm kiếm</Pressable>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default ProductSearchAPI;