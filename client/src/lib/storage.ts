import type { Schema, InsertSchema } from "@shared/schema";
import { generateSchemaFromTemplate } from "./schema-templates";

class LocalStorage {
  private readonly STORAGE_KEY = 'schema_generator_schemas';

  private getStoredSchemas(): Schema[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private setStoredSchemas(schemas: Schema[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(schemas));
  }

  async createSchema(insertSchema: InsertSchema): Promise<Schema> {
    const schemas = this.getStoredSchemas();
    const id = schemas.length > 0 ? Math.max(...schemas.map(s => s.id)) + 1 : 1;
    
    const generatedSchema = generateSchemaFromTemplate(insertSchema);
    const schema: Schema = { 
      ...insertSchema, 
      id,
      schema: generatedSchema 
    };
    
    schemas.push(schema);
    this.setStoredSchemas(schemas);
    return schema;
  }

  async getSchemas(): Promise<Schema[]> {
    return this.getStoredSchemas();
  }
}

export const storage = new LocalStorage();
