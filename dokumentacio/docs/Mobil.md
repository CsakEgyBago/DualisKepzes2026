---
sidebar_position: 3
---

## Mobil Documentáció
Alkalmazásunk frontendje a React-Native könyvtárral készült, melyet az expo platform futtat

## Projekt generálása
A projektet az alábbi paranccsal generálhatjuk le:

`npx create-expo-app@latest`

### Projektstruktúra
A projekt gyökere az alábbi mappákat tartalmazza:
- assets: tartalmazza a statikus elemeket (pl képek)
- components: tartalmazza a React UI komponenseket
- screens: tartalmazza a layout sémákat (a react-native-screens csomagot felhasználva)

A Projekt gyökerének fájljai:
- .gitignore: definiálja a verziókövetésben részt nem vevó fileokat
- app.json: tartalmazza az aplikáció konfigurációját platformonként
- index.js: az alkalmazás entry pointja
- package.json: az alkalmazás node package-ének metaadatai
- package-lock.json: az alkalmazás függőségeinek pontos verzióit határozza meg

### Entry point és inicializáció
Az alkalmazásunk inicializálása:
```Javascript

import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
```

### Mock adat
Teszteléshez használatos mock adat (a SimpleScreen komponensben definiálva):
```Javascript
const MOCK_DATA = Array.from({ length: 20}, (_, i) => ({
    id: i+1,
    title: `Elem ${i +1}`,
    subtitle: `Ez az elem a ${i +1} elem rövid leírása`,
    imageUrl: `https://picsum.photos/48?${i +1}`,
}));

```

### Példa egy komponensre
Az alábbi komponens a SimpleScreen képernyőn jelenik meg:
```Javascript
export default function SimpleListItem({ title, subtitle, imageUrl}){
    return (
        <View style={styles.container}>
            <Image
                source={{uri: imageUrl || "https://via.placeholder.com/48"}}
                style={styles.image}
                />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
}

```

Látható, hogy a React Native komponensek ugyanúgy épülnek fel, mint a hagyományos React komponensek.
