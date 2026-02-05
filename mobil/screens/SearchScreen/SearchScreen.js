import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const TYPE_ICONS = {
  fire: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/10.png",
  water:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/11.png",
  grass:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/12.png",
  electric:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/13.png",
  ice: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/15.png",
  fighting:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/2.png",
  poison:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/4.png",
  ground:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/5.png",
  flying:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/3.png",
  psychic:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/14.png",
  bug: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/7.png",
  rock: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/6.png",
  ghost:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/8.png",
  dragon:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/16.png",
  dark: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/17.png",
  steel:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/9.png",
  fairy:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/18.png",
  normal:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/1.png",
};

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setPokemon(null);
    try {
      const response = await fetch(
        `http://10.6.24.118:5000/api/pokemon/${query.toLowerCase()}`,
      );
      if (!response.ok) {
        throw new Error("Nincs találat");
      }

      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError("Nem található pokémon! Gyúrjál a kislabda hajításra noob, KYS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pokémon neve (pl. dikachu)"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Keresés</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {error && <Text style={styles.error}>{error}</Text>}

      {pokemon && (
        <View style={styles.card}>
          <Image source={{ uri: pokemon.image }} style={styles.image} />

          <View style={styles.typeRow}>
            {TYPE_ICONS[pokemon.type] && (
              <Image
                source={{ uri: TYPE_ICONS[pokemon.type] }}
                style={styles.typeIcon}
                resizeMode="contain"
              />
            )}
          </View>

          <Text>Típus: {pokemon.type}</Text>
          <Text>Magasság: {pokemon.height}</Text>
          <Text>Súly: {pokemon.weight}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1976d2",
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    marginTop: 16,
    color: "red",
    textAlign: "center",
  },
  card: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  typeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  typeIcon: {
    width: 40,
    height: 16,
    marginRight: 8,
  },
  typeText: {
    fontSize: 16,
    textTransform: "capitalize",
  },
});
