const { Router } = require("express");
const { API_KEY } = process.env;
require('dotenv').config();
const axios = require('axios');
const { Recipe, Recipe_type } = require("../db");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  // const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";
  // const params = {
  //   apiKey: API_KEY,
  //   // query: "",
  //   number: 5,
  //   addRecipeInformation: true
  // };
  // try {
    // const response = await axios.get(BASE_URL, { params });
    const aUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=e9c0c25d48ee4768adb8ce4b3e3e70a0&number=100&addRecipeInformation=true`);
    console.log('aca estoy ', aUrl);

    const aInfo = await aUrl.data.results.map((e) => {
    // const aInfo = await response.data.results.map((e) => {
      return {
        id: e.id,
        name: e.title,
        image: e.image,
        score: e.spoonacularScore,
        dishTypes: e.dishTypes.map((e) => {
          return { name: e };
        }),
        diets: e.diets.map((e) => {
          return { name: e };
        }),
        summary: e.summary,
        healthScore: e.healthScore,
        steps: e.analyzedInstructions[0]?.steps.map((e) => {
          return `${e.number} : ${e.step}`;
        }),
      };
    });
    return aInfo;
  // } catch (error) {
  //   console.log(error);
  // }
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Recipe_type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const allData = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allRecipes = await allData();

    if (id) {
      const resultId = await allRecipes.filter((e) => e == e.id);
      resultId.length
        ? res.status(200).send(resultId)
        : res.status(404).send("Id not found");
    }
  } catch {
    return res.status(400).send("Invalid input");
  }
});

router.get("/recipes", async (req, res) => {
  try {
    const { name } = req.query;
    const recipesAll = await allData();

    if (name) {
      let recipesName = await recipesAll.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      recipesName.length
        ? res.status(200).send(recipesName)
        : res.status(400).send("There is no recipe you are looking for.");
    } else {
      res.status(200).send(recipesAll);
    }
  } catch {
    return res.status(400).send("invalid input");
  }
});

router.get("/types", async (req, res) => {
  try {
    const allData = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=e9c0c25d48ee4768adb8ce4b3e3e70a0&number=100&addRecipeInformation=true`
    );
    const allInfo = allData.data.results.map((e) => e.diets);
    console.log(allInfo);
    const diets = allInfo.join(",").split(",");
    
    for (let i = 0; i < diets.length; i++) {
      await Recipe_type.findOrCreate({
        where: {
          name: diets[i],
        },
      });
    }

    const dietsTypes = await Recipe_type.findAll();

    res.status(200).send(dietsTypes);
  } catch {
    return res.status(400).send("Invalid input.");
  }
});

router.post("/recipe", async (req, res) => {
  try {
    const { name, summary, score, healthScore, steps, image, diets } = req.body;
    const newRecipe = await Recipe.create({
      name,
      summary,
      score,
      image,
      healthScore,
      steps,
    });
    const dbTypeDiet = await Recipe_type.findAll({
      where: { name: diets },
    });

    newRecipe.addRecipe_type(dbTypeDiet);
    res.status(201).send("Successfully created recipe");
  } catch {
    return res.status(400).send("Invalid input.");
  }
});

module.exports = router;
