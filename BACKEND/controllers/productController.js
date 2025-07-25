// controllers/productController.js
exports.getTees = (req, res) => {
  const tees = [
    { id: 1, name: "F1 Tee Black", price: 49.99, image: "https://via.placeholder.com/200" },
    { id: 2, name: "Speed Tee Red", price: 54.99, image: "https://via.placeholder.com/200" },
    { id: 3, name: "Race Day White", price: 39.99, image: "https://via.placeholder.com/200" }
  ];
  res.json(tees);
};
