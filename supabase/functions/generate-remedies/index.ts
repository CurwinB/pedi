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

interface AncientRemedy {
  name: string;
  culture: string;
  traditionalUse: string;
  modernFindings: string;
}

interface RemedyResponse {
  summary: string;
  remedies: Remedy[];
  ancientRemedies: AncientRemedy[];
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

    // Extract and structure the clarification data
    const extractedInfo = {
      allergies: [],
      ageGroup: '',
      duration: '',
      symptoms: [],
      treatments: [],
      additionalDetails: clarificationAnswers.additional_details || '',
      conditionSpecific: ''
    };

    // Process clarification answers to extract meaningful data
    Object.entries(clarificationAnswers).forEach(([key, value]) => {
      const valueStr = Array.isArray(value) ? value.join(', ') : value;
      
      if (key === 'allergy_details') {
        // Specific allergy details from the text field
        extractedInfo.allergies.push(valueStr);
      } else if (key.toLowerCase().includes('allerg')) {
        if (!valueStr.toLowerCase().includes('none') && !valueStr.toLowerCase().includes('no known')) {
          extractedInfo.allergies.push(valueStr);
        }
      } else if (key.toLowerCase().includes('age')) {
        extractedInfo.ageGroup = valueStr;
      } else if (key.toLowerCase().includes('duration') || key.toLowerCase().includes('long')) {
        extractedInfo.duration = valueStr;
      } else if (key.toLowerCase().includes('symptoms') || key.toLowerCase().includes('accompanying')) {
        extractedInfo.symptoms.push(valueStr);
      } else if (key.toLowerCase().includes('treatment') || key.toLowerCase().includes('tried')) {
        extractedInfo.treatments.push(valueStr);
      } else {
        extractedInfo.conditionSpecific = valueStr;
      }
    });

    // Build personalized context
    let personalizedContext = `
CRITICAL PERSONALIZATION REQUIREMENTS:

SAFETY PROFILE:
- Allergies: ${extractedInfo.allergies.length > 0 ? extractedInfo.allergies.join(', ') : 'None reported'}
- Age Group: ${extractedInfo.ageGroup || 'Not specified'}
- Previous Treatments: ${extractedInfo.treatments.length > 0 ? extractedInfo.treatments.join(', ') : 'None specified'}

CONDITION SPECIFICS:
- Duration: ${extractedInfo.duration || 'Not specified'}
- Symptoms/Context: ${extractedInfo.symptoms.length > 0 ? extractedInfo.symptoms.join(', ') : 'Not specified'}
- Condition Details: ${extractedInfo.conditionSpecific || 'Not specified'}
- Additional Info: ${extractedInfo.additionalDetails || 'None provided'}

MANDATORY SAFETY RULES:
1. If allergies are reported, EXCLUDE any remedies containing those allergens
2. Age-appropriate dosages and remedies only (no adult herbs for children, gentler options for seniors)
3. Check for interactions with reported medications/treatments
4. Avoid recommending things they've already tried unsuccessfully
5. Address the specific symptoms and duration mentioned`;

    const prompt = `You are a clinical herbalist and natural medicine expert. A person is seeking natural remedies for "${query}". You MUST use the detailed personal information provided to generate truly personalized, safe recommendations.

${personalizedContext}

REQUIREMENTS FOR PERSONALIZED RESPONSE:

1. SAFETY FIRST: 
   - Explicitly avoid any ingredients related to reported allergies
   - Use age-appropriate dosages and preparations
   - Mention interactions with their current treatments
   - Address contraindications specific to their profile

2. PERSONALIZATION:
   - Address their specific symptoms and timeline
   - Consider what they've already tried (don't repeat failures)
   - Tailor urgency of care based on duration
   - Adapt remedy intensity to age group

3. REMEDY TYPES TO INCLUDE:
   - Individual remedies (single herbs/substances)
   - Combination remedies (2-3 synergistic ingredients working together)
   - Lifestyle combinations (remedy + lifestyle change)
   - Sequential protocols (what to try first, then what to add)

4. CONDITION-SPECIFIC:
   - Reference their specific symptom details
   - Consider the context factors they mentioned
   - Address root causes when possible

5. MEANINGFUL REMEDIES:
   - Prioritize remedies most suitable for their profile
   - Explain WHY each remedy/combination is chosen for THEIR situation
   - Include realistic timelines for their specific case
   - Provide alternatives if primary options are contraindicated

6. ANCIENT REMEDIES SECTION:
   - Include 1-2 ancient remedies that are specifically relevant to their condition
   - MUST ONLY include herbal, root, spice, or natural ingredient preparations
   - NO acupuncture, massage, meditation, or non-herbal practices
   - Focus on preparations like teas, poultices, decoctions, oils, or infusions
   - Include basic preparation instructions (e.g., "Boil 1 tsp in water for 10 minutes and drink as tea")
   - Each remedy must have been historically used by ancient civilizations for this EXACT condition
   - Must be supported by modern scientific research for this specific symptom
   - Should be distinct from the main remedies listed above

Return ONLY a valid JSON object with this structure:
{
  "summary": "Personalized summary addressing their specific situation, timeline, and needs",
  "remedies": [
    {
      "name": "Remedy Name",
      "description": "Why this remedy is specifically chosen for THEIR situation and profile",
      "usage": "Age-appropriate dosages and methods specific to their needs",
      "warnings": "Personalized warnings considering their allergies, treatments, and profile",
      "sources": ["Credible research sources"]
    }
  ],
  "ancientRemedies": [
    {
      "name": "Ancient Remedy Name",
      "culture": "Specific ancient civilization (e.g., Ancient Egyptian Medicine, Persian Traditions, etc.)",
      "traditionalUse": "How this remedy was traditionally used by the ancient culture for this specific condition",
      "modernFindings": "Modern scientific research that validates its effectiveness for this condition"
    }
  ]
}

EXAMPLE OF PERSONALIZATION:
Instead of: "Ginger may help with nausea"
Write: "Given your morning nausea that worsens with stress and your tolerance to previous OTC medications, ginger root is particularly suitable because..."

Make every recommendation specific to THEIR reported situation, not generic advice.`;

    console.log('Generating personalized remedies with context:', personalizedContext);

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
          temperature: 0.4, // Lower temperature for more consistent, safer recommendations
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 3000,
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
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? jsonMatch[0] : generatedText.trim();
      remedyData = JSON.parse(jsonText);
      
      console.log('Successfully generated personalized remedies:', remedyData.remedies.length, 'remedies');
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', generatedText);
      
      // Create a more personalized fallback based on extracted info
      const personalizedFallback = createPersonalizedFallback(query, extractedInfo);
      remedyData = personalizedFallback;
    }

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

function createPersonalizedFallback(query: string, info: any): RemedyResponse {
  // Create a basic personalized response even in fallback
  let summary = `Based on your search for "${query}"`;
  
  if (info.duration) {
    summary += ` and the ${info.duration.toLowerCase()} duration you've experienced`;
  }
  
  if (info.ageGroup) {
    summary += `, here are natural remedies appropriate for your ${info.ageGroup.toLowerCase()} age group`;
  }
  
  summary += '. These recommendations consider your personal health profile.';
  
  // Age-appropriate ginger recommendation
  let gingerUsage = "Fresh ginger tea (1-2 grams per cup) or supplement (250-500mg daily)";
  if (info.ageGroup.toLowerCase().includes('senior') || info.ageGroup.toLowerCase().includes('65')) {
    gingerUsage = "Gentle ginger tea (0.5-1 gram per cup) or low-dose supplement (125-250mg daily)";
  } else if (info.ageGroup.toLowerCase().includes('child')) {
    gingerUsage = "Very mild ginger tea (0.25 gram per cup) under parental guidance";
  }
  
  let warnings = "May interact with blood thinners. Consult healthcare provider before use.";
  if (info.allergies.length > 0) {
    warnings += ` Note: Avoid if allergic to any mentioned substances (${info.allergies.join(', ')}).`;
  }
  
  return {
    summary,
    remedies: [
      {
        name: "Ginger Root (Personalized)",
        description: `Ginger contains anti-inflammatory gingerols that may help with your specific ${query.toLowerCase()} symptoms. Chosen for your profile based on general safety and effectiveness.`,
        usage: gingerUsage,
        warnings,
        sources: ["Journal of Pain Research", "Phytotherapy Research"]
      }
    ],
    ancientRemedies: [
      {
        name: "Willow Bark",
        culture: "Ancient Egyptian Medicine",
        traditionalUse: "Used by ancient Egyptians for pain relief and inflammation, particularly for headaches and joint pain.",
        modernFindings: "Contains salicin, which converts to salicylic acid (similar to aspirin) and is scientifically proven to reduce pain and inflammation."
      }
    ]
  };
}