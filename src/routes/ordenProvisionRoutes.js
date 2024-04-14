import {
  cancelOrdenProvision,
  createOrdenProvision,
  getOrdenProvisionById,
  getOrdenProvisionByIdProveedor,
  confirmarOrdenProvision,
  getOrdenProvisionByFecha,
  updateOrdenProvision,
} from "../controllers/orden-provisionControler.js";
import express from "express";

const ordenProvisionRouter = express.Router();

ordenProvisionRouter.post("/orden-provision/create", createOrdenProvision);
ordenProvisionRouter.get("/orden-provision/:id", getOrdenProvisionById);
ordenProvisionRouter.delete("/orden-provision/:id", cancelOrdenProvision);
ordenProvisionRouter.get(
  "/orden-provision/proveedor/:id",
  getOrdenProvisionByIdProveedor
);
ordenProvisionRouter.get("/orden-provision", getOrdenProvisionByFecha);
ordenProvisionRouter.post(
  "/orden-provision/confirm/:id",
  confirmarOrdenProvision
);
ordenProvisionRouter.patch("/orden-provision/update/:id", updateOrdenProvision);

export default ordenProvisionRouter;
