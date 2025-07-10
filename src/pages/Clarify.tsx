import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, AlertTriangle, Sparkles, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ClarificationQuestion {
  title: string;
  type: 'checkbox' | 'radio';
  options: string[];
}

const Clarify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<ClarificationQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (!query) {
      navigate("/");
      return;
    }
    generateQuestions();
  }, [query]);

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-clarification-questions', {
        body: { query }
      });

      if (error) throw error;

      setQuestions(data.questions);
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Error",
        description: "Failed to generate clarification questions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (questionIndex: number, option: string, checked: boolean) => {
    setAnswers(prev => {
      const current = prev[questionIndex] || [];
      if (checked) {
        return { ...prev, [questionIndex]: [...current, option] };
      } else {
        return { ...prev, [questionIndex]: current.filter(item => item !== option) };
      }
    });
  };

  const handleRadioChange = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: [value] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!disclaimerAccepted) {
      toast({
        title: "Disclaimer Required",
        description: "Please accept the disclaimer to continue.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    // Build query parameters
    const params = new URLSearchParams();
    params.set('q', query);
    
    // Add answers as query parameters
    Object.entries(answers).forEach(([questionIndex, selectedOptions]) => {
      const question = questions[parseInt(questionIndex)];
      if (question && selectedOptions.length > 0) {
        const paramKey = question.title.toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '_')
          .substring(0, 20);
        params.set(paramKey, selectedOptions.join(','));
      }
    });

    navigate(`/search?${params.toString()}`);
  };

  if (!query) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />

      <main className="container mx-auto px-4 py-24 max-w-4xl">
        {/* Introduction */}
        <div className="bg-gradient-to-br from-primary/5 via-background/90 to-secondary/5 backdrop-blur-sm rounded-xl border border-primary/20 p-8 shadow-elegant mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full translate-y-12 -translate-x-12" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Help Us Understand Your Needs
              </h1>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To provide you with the most accurate and relevant natural remedy recommendations for "{query}", 
              we need to understand your specific situation better. These clarifying questions help our AI 
              generate more personalized suggestions tailored to your unique circumstances.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Personalized recommendations are significantly more effective than generic advice. By understanding 
              your symptoms, timeline, and health context, we can suggest remedies that are most likely to be 
              helpful for your specific situation while avoiding potential contraindications.
            </p>
          </div>
        </div>

        {/* Ad Slot 1 */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-2xl h-24 bg-muted/50 border border-border rounded-lg flex items-center justify-center text-muted-foreground text-sm">
            <div className="text-center">
              <div className="font-medium">Advertisement</div>
              <div className="text-xs opacity-70">Google AdSense</div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Generating personalized questions...</p>
            </div>
          </div>
        )}

        {!loading && questions.length > 0 && (
          <form onSubmit={handleSubmit} className="space-y-8">
            {questions.map((question, questionIndex) => (
              <div key={questionIndex}>
                <div className="bg-gradient-to-br from-background/90 via-background/95 to-primary/5 backdrop-blur-sm rounded-xl border border-primary/20 p-6 shadow-elegant hover:shadow-glow transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      {questionIndex + 1}
                    </div>
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-primary/90 transition-colors">{question.title}</h2>
                  </div>
                  
                  {question.type === 'checkbox' ? (
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <Checkbox
                            id={`q${questionIndex}_opt${optionIndex}`}
                            checked={(answers[questionIndex] || []).includes(option)}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange(questionIndex, option, checked as boolean)
                            }
                          />
                          <Label 
                            htmlFor={`q${questionIndex}_opt${optionIndex}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <RadioGroup
                      value={(answers[questionIndex] || [])[0] || ""}
                      onValueChange={(value) => handleRadioChange(questionIndex, value)}
                    >
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value={option} 
                            id={`q${questionIndex}_radio${optionIndex}`}
                          />
                          <Label 
                            htmlFor={`q${questionIndex}_radio${optionIndex}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </div>

                {/* Ad Slot 2 - After second question */}
                {questionIndex === 1 && (
                  <div className="flex justify-center my-8">
                    {/* Ad Slot 2 */}
                    <div className="w-80 h-64 bg-muted/50 border border-border rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                      <div className="text-center">
                        <div className="font-medium">Advertisement</div>
                        <div className="text-xs opacity-70">Google AdSense</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Important Information Section */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-3">
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                    Why Allergy Considerations Matter
                  </h3>
                  <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
                    Natural remedies can interact with medications, trigger allergic reactions, or cause 
                    unexpected side effects. Many herbs and natural compounds are potent substances that 
                    can affect your body in significant ways. For example, some natural remedies can 
                    thin your blood, affect blood pressure, or interact with common medications like 
                    blood thinners or diabetes medications.
                  </p>
                  <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
                    Age, pregnancy status, existing health conditions, and current medications all play 
                    crucial roles in determining which natural remedies are safe and appropriate. What 
                    works safely for one person may not be suitable for another, which is why 
                    personalized recommendations based on your specific circumstances are essential.
                  </p>
                  <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
                    The information provided by our AI system is generated based on general knowledge 
                    and should never replace professional medical advice. Always consult with a licensed 
                    healthcare provider before starting any new treatment, especially if you have 
                    underlying health conditions, are pregnant or nursing, or are taking other medications.
                  </p>
                </div>
              </div>
            </div>

            {/* Ad Slot 3 */}
            <div className="flex justify-center my-8">
              <div className="w-full max-w-2xl h-24 bg-muted/50 border border-border rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                <div className="text-center">
                  <div className="font-medium">Advertisement</div>
                  <div className="text-xs opacity-70">Google AdSense</div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-border p-6 shadow-soft">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="disclaimer"
                  checked={disclaimerAccepted}
                  onCheckedChange={(checked) => setDisclaimerAccepted(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="disclaimer" className="text-sm leading-relaxed cursor-pointer">
                  <span className="font-medium">Required:</span> I understand that this is not medical advice 
                  and I should consult a licensed healthcare provider. The information provided is AI-generated 
                  and for educational purposes only.
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                size="lg" 
                variant="hero"
                disabled={!disclaimerAccepted || submitting}
                className="px-8 py-3"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  "See My Natural Remedies"
                )}
              </Button>
            </div>
          </form>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Clarify;