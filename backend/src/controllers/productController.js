import { Product } from "../models/products.models.js";

export const getProductsGroupedByCategory = async (req, res, next) => {
  try {
    const products = await Product.find();

    // Group the data by category
    const grouped = {};

    products.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }

      grouped[item.category].push({
        id: item._id,
        name: item.name,
        price: item.price,
        image: item.image||null,
        description: item.description,
      });
    });

    // Convert grouped object → array format
    const output = {
      categories: Object.keys(grouped).map((categoryName) => ({
        category: categoryName,
        items: grouped[categoryName],
      })),
    };

    res.json(output);
  } catch (error) {
    next(error);
  }
};
