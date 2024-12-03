import {Azkar } from "islam.js";
import axios from "axios";

export const getAzkar = async (req, res, next) => {
  const azkar = new Azkar();
  const zikrs = azkar.getAll();
  const finalResult = [];
  zikrs.forEach((group) => {
    group.forEach((item) => {
      const { category, zikr , reference } = item;
      const existingCategory = finalResult.find(
        (obj) => obj.category === category
      );
      if (existingCategory) {
        existingCategory.zikr.push({zikr , reference});
      } else {
        finalResult.push({ category, zikr: [{zikr , reference}] });
      }
    });
  });
  res.json(finalResult).status(200);
};
