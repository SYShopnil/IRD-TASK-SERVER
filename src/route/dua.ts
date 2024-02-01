import { Router } from "express";
import {
  getAllDuasByCategoryNameController,
  showAvailableCategoriesController,
} from "../controller/dua";

const route = Router();

// get apis
route.post("/categories", showAvailableCategoriesController);
route.get("/get/all/by/:cat_id", getAllDuasByCategoryNameController);

export default route;
