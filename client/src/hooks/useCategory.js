import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // Get category
  const getCatgories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category`
      );
      setCategories(data?.data.category);
    } catch (err) {
      toast.error("Somthing went wrong!");
    }
  };

  useEffect(() => {
    getCatgories();
  }, []);

  return categories;
}
