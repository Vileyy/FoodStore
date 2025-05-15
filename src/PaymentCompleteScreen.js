import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useCart } from "./context/CartContext";

const PaymentCompleteScreen = ({ route, navigation }) => {
  const { totalPay } = route.params || {};
  const { setCartItems } = useCart();

  const handleBackHome = () => {
    setCartItems([]); // Clear cart
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Complete</Text>
      <View style={styles.content}>
        <Text style={styles.successTitle}>Payment Successful</Text>
        <MaterialCommunityIcons
          name="check-circle"
          size={90}
          color="#43a047"
          style={{ marginVertical: 18 }}
        />
        <Text style={styles.successText}>Your payment has been approved!</Text>
        <Text style={styles.amount}>${totalPay?.toFixed(2) || "0.00"}</Text>
      </View>
      <TouchableOpacity style={styles.backBtn} onPress={handleBackHome}>
        <Text style={styles.backBtnText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
  },
  header: {
    color: "#B22222",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 30,
    alignSelf: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  successTitle: {
    color: "#43a047",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
  },
  successText: {
    color: "#43a047",
    fontSize: 16,
    marginBottom: 18,
  },
  amount: {
    fontSize: 28,
    color: "#263238",
    fontWeight: "bold",
    marginTop: 18,
  },
  backBtn: {
    backgroundColor: "#B22222",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginBottom: 40,
    alignSelf: "center",
  },
  backBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default PaymentCompleteScreen;
