import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import ArticleDetailsScreen from "./screens/ArcticleDetailsScreen/ArticleDetailsScreen";
import ArticleListScreen from "./screens/ArticleListScreen/ArticleListScreen";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import SimpleListScreen from "./screens/SimpleListScreen/SimpleListScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ArticleStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArticleList"
        component={ArticleListScreen}
        options={{ title: "Bejegyzések" }}
      />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetailsScreen}
        options={{ title: "Részletek" }}
      />
    </Stack.Navigator>
  );
}

function SimpleListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SimpleListScreen"
        component={SimpleListScreen}
        options={{ title: "Egyszerű lista" }}
      />
    </Stack.Navigator>
  );
}
function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ title: "Pokédex" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="ArticlesTab"
          component={ArticleStack}
          options={{
            tabBarLabel: "Bejegyzések",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="article" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="SimpleListTab"
          component={SimpleListStack}
          options={{
            tabBarLabel: "Egyszerű lista",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="book" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="SearchTab"
          component={SearchStack}
          options={{
            tabBarLabel: "Pokédex",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="pokeball"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
