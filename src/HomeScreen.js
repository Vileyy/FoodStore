import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useCart } from "./context/CartContext";
import { database } from "./firebase/config";
import { ref, onValue } from "firebase/database";

const HomeScreen = ({ navigation }) => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categoriesRef = ref(database, "categories");

    const unsubscribe = onValue(
      categoriesRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const categoriesArray = Object.entries(data).map(
            ([id, category]) => ({
              id,
              ...category,
            })
          );
          setCategories(categoriesArray);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="menu" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurant App</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.cartIconWrap}
            onPress={() => navigation.navigate("Cart")}
          >
            <MaterialCommunityIcons
              name="cart-outline"
              size={28}
              color="#888"
            />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bell-outline"
              size={26}
              color="#888"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Text style={styles.cuisineTitle}>Cuisine</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#B22222"
            style={styles.loader}
          />
        ) : (
          <View style={styles.grid}>
            {categories.map((item) => (
              <TouchableOpacity
                style={styles.card}
                key={item.id}
                onPress={() =>
                  navigation.navigate("CuisineDetail", { cuisine: item })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.cardImg}
                  resizeMode="cover"
                />
                <Text style={styles.cardText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
    textAlign: "center",
    marginLeft: -28, // để căn giữa khi có icon menu
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartIconWrap: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "#B22222",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  cuisineTitle: {
    fontSize: 22,
    color: "#B22222",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  card: {
    width: "42%",
    backgroundColor: "#fafafa",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 18,
    paddingVertical: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  cardImg: {
    width: 70,
    height: 70,
    marginBottom: 10,
    borderRadius: 35,
  },
  cardText: {
    color: "#B22222",
    fontWeight: "bold",
    fontSize: 16,
  },
  loader: {
    marginTop: 50,
  },
});

export default HomeScreen;
