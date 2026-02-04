---
sidebar_position: 1
---

## Backend Documentáció
Projektünk backendje javascriptben íródott és az Express.js keretrendszert használja.

### Express telepítése
A keretrendszert node package-ként az alábbi paranccsal telepíthetjük projektünkbe (lokálisan):

```npm install express```

Ezt követően az applikáció entry point-jában importálhatjuk a szükséges handle-t
> Megjegyzés: Az express keretrendszer csak a Common-js standard import szemantikáját támogatja, a modern ES-6 modulokat nem.

### Projektstruktúra
Egy tipikus Express projekt (így a miénk is) az alábbi mappastruktürát tartalmazza:
- config: tartalmazza a keretrendszer konfigurációját (pl. adatbázis helye, hozzáférési adatai, portszám) futtatási környezettől függően
- controllers: tartalmazza egy-egy route endpointjainak logikáit végrehajtó függvényeket
- migrations: tartalmazza az adatbázis-migrációkat
- models: tartalmazza az adatbázis sémájának megfekelő modelleket
- routes: tartalmazza azon fileokat, melyek definiálják, mely endpoint-ért mely controller-függvény felel

Gyökérben lévő egyéb fileok:
- index.js: Az alkalmazás entry pointja
- package.json: az alkalmazás node package-ének metaadatai
- package-lock.json: az alkalmazás függőségeinek pontos verzióit határozza meg
- sqlite adatbázis esetén a releváns .db file(ok)
- .env: a környezeti változókat definiálja

### Entry point és inicializáció
Az alkalmazásunk inicializálása:
```Javascript
const express = require('express');

const app = express();

require('dotenv').config(); // környezeti változók betöltése

app.use(express.json()); // json parsing-hoz szükséges middleware
app.use(express.urlencoded({ extended: true })); // url encodig és Content-Type header ellenőrzéséhez használatos middleware

var port = process.env.PORT || 5000;

require("./routes/index")(app);

app.listen(port);
console.log("Az alkalmazás ezen a porton fut:" , port);

module.exports = app;
```

### Route-ok definiálása
A routing controllerenként külön file-ban történik. Pl.:
```Javascript
  router.post("/registerArticle", apiController.registerArticle);
```
A post metódus meghatározza a http methos-ot, az első paraméter a route-ot, a második pedig a hendler functiont

### Controllerek definiálása
Példa egy kontrollerre:
```Javascript
// controllers/apiControlles.js
exports.registerArticle = (req, res) => {
    console.log("Hozzáadok egy cikket az adatbázishoz");

    const {title, content, contentLong, authorName, imageUrl} = req.body;

    addArticle(title, content, contentLong, authorName, imageUrl)
    .then( (result)=> {
        res.status(201).send("Az adat létrejött!")
    })
    .catch((error) => {
        res.status(500).send("Dejavu hiba a vektorban " + (error))
    });
};
```

### ORM
Appunk a sequeliye nevű ORM-et (Object Relational Mapper) használja.
Modelleket és migrációkat a sequelize cli segítségével hoztunk létre
