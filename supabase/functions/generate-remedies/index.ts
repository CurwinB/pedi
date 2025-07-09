import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Remedy {
  name: string;
  description: string;
  usage: string;
  warnings?: string;
  sources?: string[];
}

interface RemedyResponse {
  summary: string;
  remedies: Remedy[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, clarificationAnswers } = await req.json();
    
    if (!query) {
      throw new Error('Query parameter is required');
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    // Build context from clarification answers
    let context = '';
    if (clarificationAnswers && Object.keys(clarificationAnswers).length > 0) {
      context = `\n\nAdditional context from user:\n${Object.entries(clarificationAnswers)
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
        .join('\n')}`;
    }

    const prompt = `You are a knowledgeable expert in natural remedies and traditional medicine. Generate a comprehensive response for someone searching for natural remedies for "${query}".${context}

Please provide:
1. A brief summary paragraph explaining the condition and how natural remedies might help
2. 3-4 specific natural remedies with detailed information

For each remedy, include:
- Name of the remedy
- Description of how it works and its active compounds
- Specific usage instructions (dosages, preparation methods)
- Important warnings, contraindications, and potential side effects
- Credible sources or research backing (journals, studies)

Important guidelines:
- Always emphasize that these are for educational purposes only
- Include appropriate warnings about consulting healthcare providers
- Be specific about dosages and preparations
- Mention any drug interactions or contraindications
- Include reputable sources
- Focus on remedies with scientific backing when possible

Return ONLY a valid JSON object with this exact structure:
{
  "summary": "A comprehensive summary paragraph about the condition and natural approach",
  "remedies": [
    {
      "name": "Remedy Name",
      "description": "Detailed description of how it works and active compounds",
      "usage": "Specific usage instructions with dosages and preparation",
      "warnings": "Important warnings, contraindications, and side effects",
      "sources": ["Source 1", "Source 2"]
    }
  ]
}

Make sure all content is accurate, well-researched, and includes appropriate medical disclaimers.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response from Gemini
    let remedyData: RemedyResponse;
    try {
      // Clean up the response to extract JSON
      const cleanedText = generatedText.replace(/```json\n?|\n?```/g, '').trim();
      remedyData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', generatedText);
      // Fallback response
      remedyData = {
        summary: `Based on your search for "${query}", here are some natural remedies that may help. These suggestions are based on traditional uses and available research, but should not replace professional medical advice.`,
        remedies: [
          {
            name: "Ginger Root",
            description: "Ginger contains powerful anti-inflammatory compounds called gingerols that may help with various conditions.",
            usage: "Fresh ginger can be steeped in hot water for tea (1-2 grams per cup) or taken as a supplement (250-1000mg daily).",
            warnings: "May interact with blood thinners. Avoid high doses during pregnancy.",
            sources: ["Journal of Pain Research", "Phytotherapy Research"]
          }
        ]
      };
    }

    console.log('Generated remedies for query:', query, 'with context:', context);

    return new Response(JSON.stringify(remedyData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-remedies function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate remedies',
        details: error.message 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});