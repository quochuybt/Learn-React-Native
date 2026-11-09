import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import {
  fetchProducts,
  selectProducts,
  selectProductsStatus,
  Product,
} from './productsSlice';
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyDiscount,
  setShippingCost,
} from './cartSlice';
import {
  selectCartItems,
  selectCartSummary,
  selectDiscountCode,
  selectShippingCost,
} from './cartSelectors';

export default function ShoppingCartLevel3Screen() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const cartItems = useSelector(selectCartItems);
  const summary = useSelector(selectCartSummary);
  const currentDiscount = useSelector(selectDiscountCode);
  const currentShipping = useSelector(selectShippingCost);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Giỏ hàng trống', 'Vui lòng chọn ít nhất 1 sản phẩm để thanh toán!');
      return;
    }
    Alert.alert(
      'Xác nhận đặt hàng',
      `Tổng thanh toán: $${summary.total.toFixed(2)}\nSố lượng: ${summary.itemCount} món\nBạn có muốn tiến hành thanh toán?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Thanh toán ngay',
          onPress: () => {
            dispatch(clearCart());
            Alert.alert('Thành công', 'Cảm ơn bạn đã mua hàng! Đơn hàng đã được ghi nhận.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🛍️ Giỏ Hàng Chuyên Nghiệp (Level 3)</Text>
          <Text style={styles.headerSubtitle}>
            AsyncThunk API + Selectors + Thuế + Mã giảm giá + Phí ship
          </Text>
        </View>

        {/* 1. KHU VỰC SẢN PHẨM TỪ API */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>📦 Sản Phẩm Từ API (FakeStore API)</Text>
            {productsStatus === 'loading' && <ActivityIndicator size="small" color="#4F46E5" />}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
            {products.map((item: Product) => (
              <View key={item.id} style={styles.productCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.addToCartBtn}
                  onPress={() =>
                    dispatch(
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      })
                    )
                  }
                >
                  <Text style={styles.addToCartBtnText}>+ Giỏ Hàng</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 2. KHU VỰC GIỎ HÀNG */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>
              🛒 Giỏ Hàng ({summary.itemCount} sản phẩm)
            </Text>
            {cartItems.length > 0 && (
              <TouchableOpacity onPress={() => dispatch(clearCart())}>
                <Text style={styles.clearCartText}>🗑️ Xóa tất cả</Text>
              </TouchableOpacity>
            )}
          </View>

          {cartItems.length === 0 ? (
            <View style={styles.emptyCartBox}>
              <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống!</Text>
              <Text style={styles.emptyCartSubText}>Hãy chọn thêm sản phẩm ở phía trên.</Text>
            </View>
          ) : (
            cartItems.map((item) => (
              <View key={item.id} style={styles.cartItemRow}>
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.cartItemUnitPrice}>
                    ${item.price.toFixed(2)} x {item.quantity} ={' '}
                    <Text style={styles.cartItemTotalSub}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </Text>
                </View>

                {/* Bộ nút tăng giảm số lượng */}
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => dispatch(decreaseQuantity(item.id))}
                  >
                    <Text style={styles.qtyBtnText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyNumber}>{item.quantity}</Text>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => dispatch(increaseQuantity(item.id))}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* Nút xóa item */}
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => dispatch(removeFromCart(item.id))}
                >
                  <Text style={styles.removeBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* 3. MÃ GIẢM GIÁ (DISCOUNT) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎟️ Mã Giảm Giá</Text>
          <View style={styles.tagRow}>
            <TouchableOpacity
              style={[
                styles.discountTag,
                currentDiscount === 'SUMMER10' && styles.discountTagActive,
              ]}
              onPress={() =>
                dispatch(applyDiscount(currentDiscount === 'SUMMER10' ? null : 'SUMMER10'))
              }
            >
              <Text
                style={[
                  styles.discountTagText,
                  currentDiscount === 'SUMMER10' && styles.discountTagTextActive,
                ]}
              >
                SUMMER10 (-10%) {currentDiscount === 'SUMMER10' ? '✓' : ''}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.discountTag,
                currentDiscount === 'SPECIAL20' && styles.discountTagActive,
              ]}
              onPress={() =>
                dispatch(applyDiscount(currentDiscount === 'SPECIAL20' ? null : 'SPECIAL20'))
              }
            >
              <Text
                style={[
                  styles.discountTagText,
                  currentDiscount === 'SPECIAL20' && styles.discountTagTextActive,
                ]}
              >
                SPECIAL20 (-20%) {currentDiscount === 'SPECIAL20' ? '✓' : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. PHƯƠNG THỨC VẬN CHUYỂN (SHIPPING) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚚 Phí Vận Chuyển</Text>
          <View style={styles.shippingOptions}>
            {[
              { label: 'Miễn phí ($0)', cost: 0 },
              { label: 'Tiêu chuẩn ($10)', cost: 10 },
              { label: 'Hỏa tốc ($25)', cost: 25 },
            ].map((option) => (
              <TouchableOpacity
                key={option.cost}
                style={[
                  styles.shippingOption,
                  currentShipping === option.cost && styles.shippingOptionActive,
                ]}
                onPress={() => dispatch(setShippingCost(option.cost))}
              >
                <Text
                  style={[
                    styles.shippingOptionText,
                    currentShipping === option.cost && styles.shippingOptionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 5. TÓM TẮT ĐƠN HÀNG (ORDER SUMMARY) */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>📊 Tóm Tắt Đơn Hàng (Selectors)</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính (Subtotal):</Text>
            <Text style={styles.summaryValue}>${summary.subtotal.toFixed(2)}</Text>
          </View>

          {summary.discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, styles.textDiscount]}>
                Giảm giá ({currentDiscount}):
              </Text>
              <Text style={[styles.summaryValue, styles.textDiscount]}>
                -${summary.discount.toFixed(2)}
              </Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Thuế VAT (10%):</Text>
            <Text style={styles.summaryValue}>${summary.tax.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Phí vận chuyển:</Text>
            <Text style={styles.summaryValue}>${summary.shipping.toFixed(2)}</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Thành Tiền (Total):</Text>
            <Text style={styles.totalValue}>${summary.total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutBtnText}>
              💳 Tiến Hành Thanh Toán (${summary.total.toFixed(2)})
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  clearCartText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
  },
  productsScroll: {
    flexDirection: 'row',
  },
  productCard: {
    width: 140,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 6,
  },
  productName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4F46E5',
    marginBottom: 8,
  },
  addToCartBtn: {
    backgroundColor: '#4F46E5',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  addToCartBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  emptyCartBox: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyCartText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyCartSubText: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  cartItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  cartItemUnitPrice: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  cartItemTotalSub: {
    fontWeight: '700',
    color: '#0F172A',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 4,
    marginRight: 10,
  },
  qtyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  qtyNumber: {
    fontSize: 13,
    fontWeight: '700',
    paddingHorizontal: 6,
    color: '#1E293B',
  },
  removeBtn: {
    padding: 6,
    backgroundColor: '#FEE2E2',
    borderRadius: 6,
  },
  removeBtnText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 12,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 10,
  },
  discountTag: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  discountTagActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  discountTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  discountTagTextActive: {
    color: '#059669',
    fontWeight: '700',
  },
  shippingOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  shippingOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  shippingOptionActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  shippingOptionText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
    textAlign: 'center',
  },
  shippingOptionTextActive: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  textDiscount: {
    color: '#059669',
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
    marginTop: 4,
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4F46E5',
  },
  checkoutBtn: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

