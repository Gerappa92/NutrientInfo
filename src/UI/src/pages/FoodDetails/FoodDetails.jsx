import { useEffect, useState } from "react";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const FoodDetails = ({ foodId }) => {
  const [food, foodSet] = useState(null);

  useEffect(async () => {
    let response = await axios.get(`${apiBaseUrl}food/${foodId}`);
    foodSet(response.data);
  }, [foodId]);
};
