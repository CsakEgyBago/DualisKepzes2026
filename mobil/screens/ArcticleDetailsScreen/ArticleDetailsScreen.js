import { Text, Image, StyleSheet, ScrollView } from "react-native";

export default function ArticleDetailsScreen({ route }) {
  const { article } = route.params;

  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

  const imageSource =
    article.imageUrl && article.imageUrl !== "nincs"
      ? { uri: article.imageUrl }
      : noImage;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.author}>szerző: {article.authorName}</Text>
      <Text style={styles.content}>{article.contentLong}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    widthe: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },
  author: {
    fontSize: 14,
    color: "#777",
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
});
