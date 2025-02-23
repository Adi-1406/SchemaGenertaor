import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertSchemaSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.post("/api/schemas", async (req, res) => {
    const body = insertSchemaSchema.parse(req.body);
    const schema = await storage.createSchema(body);
    res.json(schema);
  });

  app.get("/api/schemas", async (req, res) => {
    const schemas = await storage.getSchemas();
    res.json(schemas);
  });

  return createServer(app);
}
