import { StyleSheet, Text, View ,FlatList,TouchableOpacity} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addToCart, clearCart, removeFromCart, updateQuantity } from '../store/cartSlice';



const CartScreen = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state:RootState) => state.cart.items);

    // Hàm thêm sản phẩm
    const handleAddProduct = () => {
    // Bạn dispatch action gì?
    // Dữ liệu sản phẩm: id, name, price
    dispatch(addToCart({
        id: 1,
        name: "Laptop",
        price: 1000
      }))
    };
    
    // Hàm xóa sản phẩm
    const handleRemoveProduct = (id: number) => {
        dispatch(removeFromCart(id))
    };
    
    // Hàm cập nhật số lượng
    const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({id,quantity}))
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>🛒 Giỏ Hàng</Text>
          
          {/* Danh sách sản phẩm */}
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View>
                  <Text>{item.name}</Text>
                  <Text>${item.price}</Text>
                </View>
                <View>
                  <Text>Số lượng: {item.quantity}</Text>
                  {/* Nút tăng/giảm */}
                  <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                    <Text>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
                {/* Nút xóa */}
                <TouchableOpacity onPress={() => handleRemoveProduct(item.id)}>
                  <Text>Xóa</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          
          {/* 2 nút chính: Thêm sản phẩm, Xóa giỏ */}
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => dispatch(clearCart())}
            >
              <Text>🗑️ Xóa Giỏ</Text>
            </TouchableOpacity>
          </View>
          
          {/* Tính tổng tiền */}
          <View style={styles.totalBox}>
            <Text>Tổng: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</Text>
          </View>
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F7FB',
      padding: 20,
    },
  
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#1E293B',
      marginBottom: 24,
      textAlign: 'center',
    },
  
    cartItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#FFFFFF',
      padding: 16,
      marginBottom: 12,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#E8ECF4',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 3,
    },
  
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
      marginTop: 16,
      marginBottom: 20,
    },
  
  
    clearButton: {
      flex: 1,
      backgroundColor: '#FEE2E2',
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    totalBox: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#E0E7FF',
      marginTop: 8,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
    },
  });