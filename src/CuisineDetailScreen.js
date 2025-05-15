import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useCart } from "./context/CartContext";
import Toast from "react-native-toast-message";
import { database } from "./firebase/config";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";

const CuisineDetailScreen = ({ route, navigation }) => {
  const { cuisine } = route.params;
  const { addToCart } = useCart();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foodsRef = ref(database, "foods");

        // If we want to filter by category name (case-insensitive)
        const categoryName = cuisine.name.toLowerCase();

        // Use onValue to listen for changes
        onValue(
          foodsRef,
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              // Convert Firebase object to array and filter by category
              const foodsArray = Object.entries(data)
                .map(([id, food]) => ({
                  id,
                  ...food,
                }))
                .filter(
                  (food) =>
                    food.category &&
                    food.category.toLowerCase() === categoryName
                );

              setFoods(foodsArray);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching foods:", error);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error("Error setting up listener:", error);
        setLoading(false);
      }
    };

    fetchFoods();
  }, [cuisine]);

  const handleAddToCart = (item) => {
    addToCart(item);
    Toast.show({
      type: "success",
      text1: "Thêm vào giỏ hàng thành công",
      text2: `${item.name} đã được thêm vào giỏ hàng`,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const FoodItem = ({ item }) => (
    <View style={styles.foodItem}>
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.foodPriceRow}>
          <Text style={styles.foodPrice}>${item.price}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <MaterialCommunityIcons name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
            source={{ uri: cuisine.image }}
            style={styles.image}
            resizeMode="cover"
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
            <Text style={styles.sectionTitle}>Menu Items</Text>

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#B22222"
                style={{ marginTop: 20 }}
              />
            ) : foods.length > 0 ? (
              foods.map((item) => <FoodItem key={item.id} item={item} />)
            ) : (
              <Text style={styles.noItems}>
                No items available for this category
              </Text>
            )}
          </View>
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
    width: "100%",
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
  foodItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 10,
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  foodInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  foodDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  foodPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B22222",
  },
  addButton: {
    backgroundColor: "#B22222",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  noItems: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

export default CuisineDetailScreen;
