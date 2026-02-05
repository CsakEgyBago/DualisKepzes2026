const { error } = require("node:console");
let Models = require("../models/index");
const { default: axios } = require("axios");

require("dotenv").config();

let addArticle = (title, content, contentLong, authorName, imageUrl) => {
  return Models.Post.create({
    title: title,
    content: content,
    contentLong: contentLong,
    authorName: authorName,
    imageUrl: imageUrl,
  });
};

exports.registerArticle = (req, res) => {
  console.log("Hozzáadok egy cikket az adatbázishoz");

  const { title, content, contentLong, authorName, imageUrl } = req.body;

  addArticle(title, content, contentLong, authorName, imageUrl)
    .then((result) => {
      res.status(201).send("Az adat létrejött!");
    })
    .catch((error) => {
      res.status(500).send("Dejavu hiba a vektorban " + error);
    });
};

exports.getAllArticles = (req, res) => {
  Models.Post.findAll({
    order: [["title", "ASC"]],
  })
    .then((result) => {
      if (!result) {
        return res.status(400).json({
          error: "jelenleg nics bejegyzés az adatbázisban",
        });
      }

      res.status(200).json({ data: result });
    })
    .catch((error) => {
      res.status(500).json({ error: "noob vagy kekw" });
    });
};

exports.getArticle = (req, res) => {
  const { id } = req.params;
  Models.Post.findOne({
    where: { id: id },
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          error: `nincs ${id} azonosítójú bejegyzés az adatbázisban`,
        });
      }
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      res.status(500).json({ error: "Noob vagy kekw" });
    });
};

exports.deleteArticle = (req, res) => {
  const { id } = req.params;
  Models.Post.destroy({ where: { id } }).then(() => {
    res.status(418).json({ message: "A bejegyzés sikeresen törölve!" });
  });
};

exports.getPokemon = async (req, res) => {
  const name = req.params.name.toLowerCase();

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );
    const pokeData = response.data;

    const customPokemon = {
      id: pokeData.id,
      name: pokeData.name,
      height: pokeData.height,
      weight: pokeData.weight,
      image: pokeData.sprites.other["official-artwork"].front_default,
      type: pokeData.types[0].type.name,
    };

    res.status(200).json(customPokemon);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: `Noob vagy more. KYS` });
    }
    res.status(500).json({ error: "Ezt gondold át mégegyszer bátyja" });
  }
};
