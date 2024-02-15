import { createOrdenProvision } from "../controllers/orden-provisionControler.js";
import express from "express";

const ordenProvisionRouter = express.Router();

ordenProvisionRouter.post("/orden-provision/create", createOrdenProvision);

export default ordenProvisionRouter;
