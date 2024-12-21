import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function HomeScreen() {
  const [data, setData] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState(0);

  async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const truncateText = (text: string, length: number) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  if (data.length === 0) {
    return <Text style={styles.loadingText}>Loading products...</Text>;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Featured Products</Text>
        <View style={styles.cartContainer}>
          <Text style={styles.cartText}>cart 🛒</Text>
          <View style={styles.cartBadge}>
            <Text style={styles.cartCount}>{cartCount}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.container}>
        {data.map((item) => (
          <View key={item.id} style={styles.productCard}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <View style={styles.productInfo}>
              <Text style={styles.title}>{truncateText(item.title, 20)}</Text>
              <Text style={styles.description}>
                {truncateText(item.description, 10)}
              </Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddToCart}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  cartContainer: {
    position: "relative",
    right: 15,
  },
  cartText: {
    fontSize: 24,
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#2ecc71",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  cartCount: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2ecc71",
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: "#999",
    textTransform: "capitalize",
  },
  addButton: {
    backgroundColor: "#2ecc71",
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    marginLeft: 12,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
