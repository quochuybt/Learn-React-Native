import {View,Text,FlatList} from 'react-native';

type Product = {
  id: number
  name: string
  price: number
};

type User = {
  id: number
  name: string
  age: number
};

const filterByName = <T extends { name: string }>(data: T[],keyword: string) => {
  return data.filter((item) =>item.name.toLowerCase().includes(keyword.toLowerCase()));
};

const FilteredListGeneric = () => {
  const products: Product[] = [
    { id: 1, name: 'iPhone 15', price: 1000 },
    { id: 2, name: 'Samsung Galaxy', price: 800 },
    { id: 3, name: 'iPhone 14', price: 700 },
  ];
  const users: User[] = [
    { id: 1, name: 'Khanh', age: 21 },
    { id: 2, name: 'Khoa', age: 22 },
    { id: 3, name: 'Huy', age: 20 },
  ];

  // const result = filterByName(users, 'Huy');
  const result = filterByName(products, 'iPhone');

  return (
    <View>
      <Text>
        Kết quả tìm được
      </Text>
      <FlatList
        data={result}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
}
export default FilteredListGeneric;