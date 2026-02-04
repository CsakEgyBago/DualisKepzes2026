import { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ArticleListScreen({ navigation }) {
  const [articles, setArticles] = useState([]);

  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

  useEffect(() => {
    console.log("Fetching...");
    fetch("http://10.6.24.118:5000/api/getArticles")
      .then((res) => res.json())
      .then((json) => {
        console.log("Response: ", json);
        setArticles(json.data);
        console.log("Articles: ", articles);
      })
      .catch((err) => console.error(err));
  }, []);

  const renderItem = ({ item }) => {
    const imageSource =
      typeof item.imageUrl === "string" &&
      item.imageUrl.trim() !== "" &&
      item.imageUrl !== "nincs"
        ? { uri: item.imageUrl }
        : noImage;

    return (
      <View style={styles.card}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("ArticleDetail", { article: item })
          }
        >
          <Text style={styles.buttonText}>Olvasd Tovább</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    marginVertical: 6,
    color: "#555",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1976d2",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
