import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { insertSchemaSchema, schemaTypes } from "@shared/schema";
import type { InsertSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { generateSchemaFromTemplate } from "@/lib/schema-templates";

interface SchemaFormProps {
  onGenerate: (schema: any) => void;
}

export function SchemaForm({ onGenerate }: SchemaFormProps) {
  const { toast } = useToast();

  const form = useForm<InsertSchema>({
    resolver: zodResolver(insertSchemaSchema),
    defaultValues: {
      name: "",
      type: "Organization",
      context: "",
      schema: {},
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: InsertSchema) => {
      try {
        const res = await apiRequest("POST", "/api/schemas", values);
        const data = await res.json();
        return data;
      } catch (error) {
        console.error('Schema generation error:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      onGenerate(data.schema);
      toast({
        title: "Schema generated!",
        description: "Your schema has been generated successfully.",
      });
    },
    onError: (error) => {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate schema. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: InsertSchema) {
    // Generate schema using the template function
    const generatedSchema = generateSchemaFromTemplate(values);

    // Create a new object with the generated schema
    const submitValues = {
      ...values,
      schema: generatedSchema as Record<string, any>,
    };

    mutation.mutate(submitValues);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website Name</FormLabel>
              <FormControl>
                <Input placeholder="My Website" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schema Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a schema type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {schemaTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="context"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website Context</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your website's purpose and content..."
                  className="h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Generating..." : "Generate Schema"}
        </Button>
      </form>
    </Form>
  );
}