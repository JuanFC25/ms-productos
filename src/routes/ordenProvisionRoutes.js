import {
  createOrdenProvision,
  getOrdenProvision,
} from "../controllers/orden-provisionControler.js";
import express from "express";

const ordenProvisionRouter = express.Router();

ordenProvisionRouter.post("/orden-provision/create", createOrdenProvision);
ordenProvisionRouter.get("/orden-provision/:id", getOrdenProvision);

export default ordenProvisionRouter;
