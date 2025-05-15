import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useCart } from "./context/CartContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CartScreen = ({ navigation }) => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartTotal,
  } = useCart();

  // Calculate totals
  const itemsTotal = getCartTotal();
  const offerDiscount = itemsTotal > 1000 ? -50 : 0;
  const taxes = itemsTotal * 0.08;
  const deliveryCharges = itemsTotal > 0 ? 30 : 0;
  const totalPay = itemsTotal + offerDiscount + taxes + deliveryCharges;

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <View style={styles.qtyControl}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
            <Text style={styles.qtyBtn}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
            <Text style={styles.qtyBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => removeFromCart(item.id)}
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={20}
          color="#B22222"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyCart}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={60}
              color="#ccc"
            />
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <TouchableOpacity
              style={styles.browseBtn}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.browseBtnText}>Browse Foods</Text>
            </TouchableOpacity>
          </View>
        }
        style={{ marginBottom: 10 }}
      />

      {cartItems.length > 0 && (
        <>
          {/* Bill Receipt */}
          <View style={styles.billBox}>
            <Text style={styles.billTitle}>Bill Summary</Text>
            <View style={styles.billRow}>
              <Text>Items Total</Text>
              <Text>${itemsTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.billRow}>
              <Text>Offer Discount</Text>
              <Text style={{ color: offerDiscount < 0 ? "green" : "#000" }}>
                ${offerDiscount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.billRow}>
              <Text>Taxes (8%)</Text>
              <Text>${taxes.toFixed(2)}</Text>
            </View>
            <View style={styles.billRow}>
              <Text>Delivery Charges</Text>
              <Text>${deliveryCharges.toFixed(2)}</Text>
            </View>
            <View style={[styles.billRow, styles.totalRow]}>
              <Text style={{ fontWeight: "bold" }}>Total Pay</Text>
              <Text style={{ fontWeight: "bold", color: "#B22222" }}>
                ${totalPay.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Payment button */}
          <TouchableOpacity
            style={styles.payBtn}
            onPress={() => navigation.navigate("PaymentComplete", { totalPay })}
          >
            <Text style={styles.payBtnText}>Proceed To Payment</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#B22222",
    fontWeight: "bold",
    fontSize: 20,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 12,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 14,
  },
  itemName: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    color: "#B22222",
    fontWeight: "500",
    marginBottom: 8,
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  qtyBtn: {
    fontSize: 18,
    color: "#B22222",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  qtyText: {
    fontSize: 16,
    paddingHorizontal: 6,
  },
  removeBtn: {
    padding: 8,
  },
  emptyCart: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#888",
    marginTop: 10,
    marginBottom: 20,
  },
  browseBtn: {
    backgroundColor: "#B22222",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  browseBtnText: {
    color: "#fff",
    fontWeight: "bold",
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
    marginBottom: 14,
    color: "#333",
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
    marginTop: 6,
  },
  payBtn: {
    backgroundColor: "#B22222",
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
