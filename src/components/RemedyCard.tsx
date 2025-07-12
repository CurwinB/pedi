
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info, Leaf, Sparkles } from "lucide-react";

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
    <Card className="bg-white/80 backdrop-blur-sm shadow-natural hover:shadow-glow transition-all duration-500 border border-green-200/50 rounded-3xl overflow-hidden group hover:scale-[1.02]">
      <CardHeader className="pb-4 bg-gradient-to-br from-green-50/80 to-emerald-50/60 border-b border-green-200/30">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-soft group-hover:shadow-glow transition-all duration-300">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-green-900 mb-2 leading-tight">
              🌿 {remedy.name}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs border-green-300 text-green-700 bg-green-50/80">
                Natural Solution #{index + 1}
              </Badge>
              <div className="flex items-center gap-1 text-green-600">
                <Sparkles className="h-3 w-3" />
                <span className="text-xs font-medium">Carefully Selected</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 p-8">
        <div className="bg-green-50/60 rounded-2xl p-6 border border-green-200/30">
          <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2 text-lg">
            <Info className="h-5 w-5 text-green-600" />
            How Nature Helps
          </h4>
          <p className="text-green-800 leading-relaxed text-lg">{remedy.description}</p>
        </div>

        <div className="bg-teal-50/60 rounded-2xl p-6 border border-teal-200/30">
          <h4 className="font-bold text-teal-900 mb-3 text-lg">🌱 How to Use</h4>
          <p className="text-teal-800 leading-relaxed text-lg">{remedy.usage}</p>
        </div>

        {remedy.warnings && (
          <div className="bg-orange-50/60 border border-orange-200/40 rounded-2xl p-6">
            <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5" />
              Gentle Reminders
            </h4>
            <p className="text-orange-800 leading-relaxed">{remedy.warnings}</p>
          </div>
        )}

        {remedy.sources && remedy.sources.length > 0 && (
          <div className="border-t border-green-200/30 pt-6">
            <h5 className="text-sm font-bold text-green-700 mb-3 flex items-center gap-2">
              <span className="text-green-500">📚</span>
              Trusted Sources
            </h5>
            <ul className="text-sm text-green-700/80 space-y-2">
              {remedy.sources.map((source, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{source}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
