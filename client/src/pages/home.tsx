import { SchemaForm } from "@/components/schema-form";
import { SchemaPreview } from "@/components/schema-preview";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const [generatedSchema, setGeneratedSchema] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Schema Generator
          </h1>
          <p className="text-muted-foreground">
            Generate optimized JSON-LD schemas for your website by describing its purpose
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <SchemaForm onGenerate={setGeneratedSchema} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <SchemaPreview schema={generatedSchema} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
