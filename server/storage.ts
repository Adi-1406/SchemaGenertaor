import type { Schema, InsertSchema } from "@shared/schema";

export interface IStorage {
  createSchema(schema: InsertSchema): Promise<Schema>;
  getSchemas(): Promise<Schema[]>;
}

export class MemStorage implements IStorage {
  private schemas: Map<number, Schema>;
  private currentId: number;

  constructor() {
    this.schemas = new Map();
    this.currentId = 1;
  }

  async createSchema(insertSchema: InsertSchema): Promise<Schema> {
    const id = this.currentId++;
    const schema: Schema = { ...insertSchema, id };
    this.schemas.set(id, schema);
    return schema;
  }

  async getSchemas(): Promise<Schema[]> {
    return Array.from(this.schemas.values());
  }
}

export const storage = new MemStorage();