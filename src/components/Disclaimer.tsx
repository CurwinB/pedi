import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Disclaimer = () => {
  return (
    <Card className="bg-amber-50/50 border-amber-200 shadow-soft">
      <CardContent className="pt-6">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <h3 className="font-semibold text-amber-800">Important Medical Disclaimer</h3>
            <p className="text-sm text-amber-700 leading-relaxed">
              This content is AI-generated and provided for informational purposes only. It is not intended to 
              replace professional medical advice, diagnosis, or treatment. Always consult with a qualified 
              healthcare provider before starting any new treatment or supplement regimen, especially if you 
              have existing health conditions or are taking medications.
            </p>
            <p className="text-xs text-amber-600">
              Natural remedies can interact with medications and may not be suitable for everyone.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};