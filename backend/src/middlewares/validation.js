export const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ message: "Product name is required" });
  }
  
  if (!price || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ message: "Valid price is required" });
  }
  
  if (!category || typeof category !== 'string' || category.trim().length === 0) {
    return res.status(400).json({ message: "Category is required" });
  }
  
  next();
};

export const validateProductId = (req, res, next) => {
  if (!req.params.id || req.params.id.length !== 24) {
    return res.status(400).json({ message: "Valid product ID is required" });
  }
  next();
};
