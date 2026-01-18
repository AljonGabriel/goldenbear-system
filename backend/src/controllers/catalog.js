// Mock catalog data
let catalog = [
  { id: "1", name: "Gold Necklace", price: 5000, stock: 10 },
  { id: "2", name: "Diamond Ring", price: 12000, stock: 5 },
];

// Functions
export const getCatalog = (req, res) => {
  res.json(catalog);
};

export const getCatalogItem = (req, res) => {
  const item = catalog.find((c) => c.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
};

export const addCatalogItem = (req, res) => {
  const newItem = { id: Date.now().toString(), ...req.body };
  catalog.push(newItem);
  res.status(201).json(newItem);
};

export const updateCatalogItem = (req, res) => {
  const index = catalog.findIndex((c) => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Item not found" });

  catalog[index] = { ...catalog[index], ...req.body };
  res.json(catalog[index]);
};

export const deleteCatalogItem = (req, res) => {
  catalog = catalog.filter((c) => c.id !== req.params.id);
  res.json({ message: "Item deleted" });
};
