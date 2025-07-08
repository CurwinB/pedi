import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info, Leaf } from "lucide-react";

interface Remedy {
  name: string;
  description: string;
  usage: string;
  warnings?: string;
  sources?: string[];
}

interface RemedyCardProps {
  remedy: Remedy;
  index: number;
}

export const RemedyCard = ({ remedy, index }: RemedyCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-soft hover:shadow-natural transition-all duration-300 border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg text-foreground">{remedy.name}</CardTitle>
            <Badge variant="outline" className="mt-1 text-xs">
              Remedy #{index + 1}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            How it works
          </h4>
          <p className="text-muted-foreground leading-relaxed">{remedy.description}</p>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-2">Usage Instructions</h4>
          <p className="text-muted-foreground leading-relaxed">{remedy.usage}</p>
        </div>

        {remedy.warnings && (
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
            <h4 className="font-medium text-destructive mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Warnings & Side Effects
            </h4>
            <p className="text-destructive/80 text-sm leading-relaxed">{remedy.warnings}</p>
          </div>
        )}

        {remedy.sources && remedy.sources.length > 0 && (
          <div className="border-t border-border pt-3">
            <h5 className="text-sm font-medium text-muted-foreground mb-1">Sources:</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              {remedy.sources.map((source, idx) => (
                <li key={idx}>• {source}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};