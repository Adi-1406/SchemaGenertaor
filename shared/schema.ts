import { pgTable, text, serial, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const schemas = pgTable("schemas", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  context: text("context").notNull(),
  schema: json("schema").$type<Record<string, any>>().notNull(),
});

export const schemaTypes = [
  "Organization",
  "LocalBusiness", 
  "Product",
  "Article",
  "WebPage",
  "Event",
  "Person",
  "Restaurant",
] as const;

export const insertSchemaSchema = createInsertSchema(schemas).extend({
  type: z.enum(schemaTypes),
  context: z.string().min(10, "Please provide more context about your website"),
});

export type InsertSchema = z.infer<typeof insertSchemaSchema>;
export type Schema = typeof schemas.$inferSelect;