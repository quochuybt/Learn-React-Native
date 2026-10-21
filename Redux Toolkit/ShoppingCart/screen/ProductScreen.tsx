import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
  } from 'react-native';
  import React from 'react';
  
  import products from '../data/product.json';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { CartItem, addToCart } from '../store/cartSlice';
  
  interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  const ProductScreen = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state:RootState) => state.cart.items);

    // Hàm thêm sản phẩm
    const handleAddProduct = (item:CartItem) => {
    // Bạn dispatch action gì?
    // Dữ liệu sản phẩm: id, name, price
    dispatch(addToCart(item))
    };
    const renderProduct = ({ item }: { item: Product }) => (
      <View style={styles.productItem}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
  
          <Text style={styles.productPrice}>
            {item.price.toLocaleString('vi-VN')} đ
          </Text>
  
          <Text style={styles.productQuantity}>
            Số lượng: {item.quantity}
          </Text>
        </View>
        <TouchableOpacity 
              style={styles.addButton}
              onPress={()=>handleAddProduct(item)}
            >
              <Text>+ Thêm Sản Phẩm</Text>
            </TouchableOpacity>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Danh sách sản phẩm</Text>
  
        <FlatList
          data={products as Product[]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  
  export default ProductScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F4F6',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: 20,
    },
    addButton: {
        flex: 1,
        backgroundColor: '#4F46E5',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
      },
    list: {
      paddingBottom: 20,
    },
    productItem: {
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      elevation: 2,
    },
    productInfo: {
      gap: 8,
    },
    productName: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#111827',
    },
    productPrice: {
      fontSize: 16,
      fontWeight: '600',
      color: '#2563EB',
    },
    productQuantity: {
      fontSize: 14,
      color: '#6B7280',
    },
  });