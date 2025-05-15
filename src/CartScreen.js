import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useCart } from "./context/CartContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CartScreen = ({ navigation }) => {
  const { cartItems, addToCart, removeFromCart, setCartItems } = useCart();

  // Hàm giảm số lượng
  const decreaseQuantity = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.name);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  // Hàm tăng số lượng
  const increaseQuantity = (item) => {
    addToCart(item);
  };

  // Tính tổng tiền
  const itemsTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const offerDiscount = itemsTotal > 1000 ? -18 : 0;
  const taxes = itemsTotal * 0.08;
  const deliveryCharges = itemsTotal > 0 ? 30 : 0;
  const totalPay = itemsTotal + offerDiscount + taxes + deliveryCharges;

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.qtyControl}>
        <TouchableOpacity onPress={() => decreaseQuantity(item)}>
          <Text style={styles.qtyBtn}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item)}>
          <Text style={styles.qtyBtn}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            Your cart is empty.
          </Text>
        }
        style={{ marginBottom: 20 }}
      />
      {/* Bill Receipt */}
      <View style={styles.billBox}>
        <Text style={styles.billTitle}>Bill Receipt</Text>
        <View style={styles.billRow}>
          <Text>Items Total</Text>
          <Text>{itemsTotal} ₹</Text>
        </View>
        <View style={styles.billRow}>
          <Text>Offer Discount</Text>
          <Text>{offerDiscount} ₹</Text>
        </View>
        <View style={styles.billRow}>
          <Text>Taxes (8%)</Text>
          <Text>{taxes.toFixed(2)} ₹</Text>
        </View>
        <View style={styles.billRow}>
          <Text>Delivery Charges</Text>
          <Text>{deliveryCharges} ₹</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={{ fontWeight: "bold" }}>Total Pay</Text>
          <Text style={{ fontWeight: "bold" }}>{totalPay.toFixed(2)} ₹</Text>
        </View>
      </View>
      {/* Nút thanh toán */}
      <TouchableOpacity
        style={styles.payBtn}
        onPress={() => navigation.navigate("PaymentComplete", { totalPay })}
      >
        <Text style={styles.payBtnText}>Proceed To Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 22,
    color: "#B22222",
    fontWeight: "bold",
    marginBottom: 18,
    alignSelf: "center",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 12,
  },
  itemName: {
    color: "#B22222",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  qtyBtn: {
    fontSize: 22,
    color: "#388e3c",
    paddingHorizontal: 10,
  },
  qtyText: {
    fontSize: 16,
    marginHorizontal: 6,
  },
  itemPrice: {
    fontWeight: "bold",
    color: "#222",
    minWidth: 60,
    textAlign: "right",
  },
  billBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  billTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  payBtn: {
    backgroundColor: "#388e3c",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  payBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CartScreen;
