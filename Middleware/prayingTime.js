import axios from "axios"

export const prayingTiming = async (country , city )=>{
  const url =`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=1` ;
  const response = await axios.get(url);
  const timing = response.data;
  return timing ;
}

export const Azkar = async(typeOfAzkar)=>{
  const url =`https://ahegazy.github.io/muslimKit/json/${typeOfAzkar}.json` ;
  const response = await axios.get(url);
  const Azkar = response.data;
  return Azkar ;
}

export const Quran = async(language)=>{
  const url =`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran${language}.json` ;
  const response = await axios.get(url);
  const Quran = response.data;
  return Quran ;
}