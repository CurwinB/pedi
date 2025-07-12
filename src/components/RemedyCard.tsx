
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

const colorSchemes = [
  {
    gradient: "from-blue-400 to-indigo-500",
    bg: "from-blue-50/80 to-indigo-50/60",
    border: "border-blue-200/50",
    text: "text-blue-900",
    badge: "border-blue-300 text-blue-700 bg-blue-50/80",
    accent: "text-blue-600",
    descBg: "bg-blue-50/60 border-blue-200/30",
    descText: "text-blue-900",
    descContent: "text-blue-800",
    usageBg: "bg-indigo-50/60 border-indigo-200/30",
    usageText: "text-indigo-900",
    usageContent: "text-indigo-800"
  },
  {
    gradient: "from-purple-400 to-pink-500",
    bg: "from-purple-50/80 to-pink-50/60",
    border: "border-purple-200/50",
    text: "text-purple-900",
    badge: "border-purple-300 text-purple-700 bg-purple-50/80",
    accent: "text-purple-600",
    descBg: "bg-purple-50/60 border-purple-200/30",
    descText: "text-purple-900",
    descContent: "text-purple-800",
    usageBg: "bg-pink-50/60 border-pink-200/30",
    usageText: "text-pink-900",
    usageContent: "text-pink-800"
  },
  {
    gradient: "from-emerald-400 to-teal-500",
    bg: "from-emerald-50/80 to-teal-50/60",
    border: "border-emerald-200/50",
    text: "text-emerald-900",
    badge: "border-emerald-300 text-emerald-700 bg-emerald-50/80",
    accent: "text-emerald-600",
    descBg: "bg-emerald-50/60 border-emerald-200/30",
    descText: "text-emerald-900",
    descContent: "text-emerald-800",
    usageBg: "bg-teal-50/60 border-teal-200/30",
    usageText: "text-teal-900",
    usageContent: "text-teal-800"
  },
  {
    gradient: "from-amber-400 to-orange-500",
    bg: "from-amber-50/80 to-orange-50/60",
    border: "border-amber-200/50",
    text: "text-amber-900",
    badge: "border-amber-300 text-amber-700 bg-amber-50/80",
    accent: "text-amber-600",
    descBg: "bg-amber-50/60 border-amber-200/30",
    descText: "text-amber-900",
    descContent: "text-amber-800",
    usageBg: "bg-orange-50/60 border-orange-200/30",
    usageText: "text-orange-900",
    usageContent: "text-orange-800"
  }
];

export const RemedyCard = ({ remedy, index }: RemedyCardProps) => {
  const colors = colorSchemes[index % colorSchemes.length];

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-natural hover:shadow-glow transition-all duration-500 border border-slate-200/50 rounded-3xl overflow-hidden group hover:scale-[1.02]">
      <CardHeader className={`pb-4 bg-gradient-to-br ${colors.bg} border-b ${colors.border}`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 bg-gradient-to-br ${colors.gradient} rounded-2xl shadow-soft group-hover:shadow-glow transition-all duration-300 flex-shrink-0`}>
            <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-xl sm:text-2xl font-bold ${colors.text} mb-2 leading-tight`}>
              🌿 {remedy.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={`text-xs ${colors.badge}`}>
                Natural Solution #{index + 1}
              </Badge>
              <div className={`flex items-center gap-1 ${colors.accent}`}>
                <Sparkles className="h-3 w-3" />
                <span className="text-xs font-medium">Carefully Selected</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className={`${colors.descBg} rounded-2xl p-4 sm:p-6 border ${colors.descBg.includes('border') ? '' : colors.border}`}>
          <h4 className={`font-bold ${colors.descText} mb-3 flex items-center gap-2 text-base sm:text-lg`}>
            <Info className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            How Nature Helps
          </h4>
          <p className={`${colors.descContent} leading-relaxed text-sm sm:text-lg`}>{remedy.description}</p>
        </div>

        <div className={`${colors.usageBg} rounded-2xl p-4 sm:p-6 border ${colors.usageBg.includes('border') ? '' : colors.border}`}>
          <h4 className={`font-bold ${colors.usageText} mb-3 text-base sm:text-lg`}>🌱 How to Use</h4>
          <p className={`${colors.usageContent} leading-relaxed text-sm sm:text-lg`}>{remedy.usage}</p>
        </div>

        {remedy.warnings && (
          <div className="bg-orange-50/60 border border-orange-200/40 rounded-2xl p-4 sm:p-6">
            <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2 text-base sm:text-lg">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              Gentle Reminders
            </h4>
            <p className="text-orange-800 leading-relaxed text-sm sm:text-base">{remedy.warnings}</p>
          </div>
        )}

        {remedy.sources && remedy.sources.length > 0 && (
          <div className="border-t border-slate-200/30 pt-6">
            <h5 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <span className="text-slate-500">📚</span>
              Trusted Sources
            </h5>
            <ul className="text-sm text-slate-600/80 space-y-2">
              {remedy.sources.map((source, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="break-words">{source}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </div>
  );
};
