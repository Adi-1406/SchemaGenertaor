import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { useState } from "react";

interface SchemaPreviewProps {
  schema: any;
}

export function SchemaPreview({ schema }: SchemaPreviewProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Schema copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (!schema) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Generate a schema to see the preview
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Generated Schema</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          disabled={copied}
        >
          <Copy className="h-4 w-4 mr-2" />
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[500px]">
        <code className="text-sm">
          {JSON.stringify(schema, null, 2)}
        </code>
      </pre>
    </div>
  );
}
