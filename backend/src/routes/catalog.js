import { Router } from "express";
import {
  getCatalog,
  getCatalogItem,
  addCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
} from "../controllers/catalog.js";

const router = Router();

router.get("/", getCatalog);
router.get("/:id", getCatalogItem);
router.post("/", addCatalogItem);
router.put("/:id", updateCatalogItem);
router.delete("/:id", deleteCatalogItem);

export default router;
