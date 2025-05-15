import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useCart } from "./context/CartContext";
import Toast from "react-native-toast-message";

const CuisineDetailScreen = ({ route, navigation }) => {
  const { cuisine } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(cuisine);
    Toast.show({
      type: "success",
      text1: "Thêm vào giỏ hàng thành công",
      text2: `${cuisine.name} đã được thêm vào giỏ hàng`,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{cuisine.name}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={cuisine.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{cuisine.name}</Text>
          <Text style={styles.description}>
            Discover the authentic taste of {cuisine.name} cuisine. From
            traditional recipes to modern interpretations, explore a wide range
            of dishes that will satisfy your cravings.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Dishes</Text>
            {/* Add your dish items here */}
          </View>

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <MaterialCommunityIcons name="cart-plus" size={24} color="#fff" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#B22222",
    fontWeight: "bold",
    fontSize: 20,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#B22222",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B22222",
    marginBottom: 15,
  },
  addToCartButton: {
    backgroundColor: "#B22222",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default CuisineDetailScreen;
