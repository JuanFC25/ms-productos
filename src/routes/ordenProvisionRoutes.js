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

ordenProvisionRouter.post("/api/orden-provision/create", createOrdenProvision);
ordenProvisionRouter.get("/api/orden-provision/:id", getOrdenProvisionById);
ordenProvisionRouter.delete("/api/orden-provision/:id", cancelOrdenProvision);
ordenProvisionRouter.get(
  "/api/orden-provision/proveedor/:id",
  getOrdenProvisionByIdProveedor
);
ordenProvisionRouter.get("/api/orden-provision", getOrdenProvisionByFecha);
ordenProvisionRouter.post(
  "/api/orden-provision/confirm/:id",
  confirmarOrdenProvision
);
ordenProvisionRouter.patch(
  "/api/orden-provision/update/:id",
  updateOrdenProvision
);

export default ordenProvisionRouter;
