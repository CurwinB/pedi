import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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

interface ExtractedInfo {
  allergies: string[];
  ageGroup: string;
  duration: string;
  symptoms: string[];
  treatments: string[];
  additionalDetails: string;
  conditionSpecific: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, clarificationAnswers } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      console.error('LOVABLE_API_KEY not found in environment');
      return new Response(
        JSON.stringify({ error: 'API configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Generating remedies for query: "${query}"`);
    console.log('Clarification answers:', JSON.stringify(clarificationAnswers, null, 2));

    // Extract and structure the clarification data
    const extractedInfo: ExtractedInfo = {
      allergies: [],
      ageGroup: '',
      duration: '',
      symptoms: [],
      treatments: [],
      additionalDetails: clarificationAnswers?.additional_details || '',
      conditionSpecific: ''
    };

    // Process clarification answers to extract meaningful data
    if (clarificationAnswers) {
      Object.entries(clarificationAnswers).forEach(([key, value]) => {
        const valueStr = Array.isArray(value) ? value.join(', ') : String(value);
        
        if (key === 'allergy_details') {
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
    }

    // Build personalized context
    const personalizedContext = `
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

    // Interpret the query to extract the underlying health concern
+    const interpretedCondition = interpretHealthQuery(query);
+    
+    const prompt = `You are a clinical herbalist and natural medicine expert. A person is seeking natural remedies for ${interpretedCondition}. You MUST use the detailed personal information provided to generate truly personalized, safe recommendations.

${personalizedContext}

CRITICAL WRITING RULES (MUST FOLLOW):
1. NEVER copy or echo the user's exact words, spelling, or phrasing in ANY response text
2. ALWAYS interpret and rephrase conditions using proper medical/wellness terminology
3. Write professionally and grammatically correct - no typos, no awkward phrasing
4. Describe symptoms using clinical terms (e.g., "sleep difficulties" not "triuble sleeping", "digestive discomfort" not "tummy hurts")
5. Do NOT include phrases like "your specific [query] symptoms" - instead describe the actual condition professionally

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
  "summary": "Personalized summary addressing their specific situation, timeline, and needs - written professionally without echoing user input",
  "remedies": [
    {
      "name": "Remedy Name",
      "description": "Why this remedy is specifically chosen for THEIR situation and profile - professionally written",
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

EXAMPLE OF GOOD vs BAD WRITING:
BAD: "Ginger may help with your specific i have had triuble sleeping symptoms"
GOOD: "Ginger contains compounds that promote relaxation and may help address sleep difficulties and restlessness"

BAD: "Based on your search for i have headache everyday"
GOOD: "Based on your experience with chronic headaches"

Make every recommendation specific to THEIR reported situation using professional, clinical language.`;

    console.log('Generating personalized remedies...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.4,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate remedies' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content;

    if (!generatedText) {
      console.error('No content in API response');
      return new Response(
        JSON.stringify({ error: 'No response from AI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Parse the JSON response
    let remedyData: RemedyResponse;
    try {
      // Clean up the response to extract JSON
      let cleanContent = generatedText.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3);
      }
      cleanContent = cleanContent.trim();
      
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? jsonMatch[0] : cleanContent;
      remedyData = JSON.parse(jsonText);
      
      console.log('Successfully generated personalized remedies:', remedyData.remedies?.length || 0, 'remedies');
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      
      // Create a more personalized fallback based on extracted info
      remedyData = createPersonalizedFallback(query, extractedInfo);
    }

    return new Response(JSON.stringify(remedyData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-remedies function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate remedies',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Interpret raw user query into a clean, clinical description
function interpretHealthQuery(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  // Common condition mappings
  const conditionMap: Record<string, string> = {
    'sleep': 'sleep difficulties and insomnia',
    'sleeping': 'sleep difficulties and insomnia',
    'insomnia': 'insomnia and sleep disturbances',
    'headache': 'headaches and head pain',
    'migraine': 'migraines and severe headaches',
    'anxiety': 'anxiety and nervous tension',
    'stress': 'stress and tension',
    'stomach': 'digestive discomfort',
    'digestion': 'digestive issues',
    'nausea': 'nausea and upset stomach',
    'pain': 'pain relief and discomfort',
    'inflammation': 'inflammation and swelling',
    'cold': 'cold and flu symptoms',
    'flu': 'cold and flu symptoms',
    'cough': 'cough and respiratory issues',
    'sore throat': 'sore throat and throat irritation',
    'energy': 'low energy and fatigue',
    'fatigue': 'fatigue and tiredness',
    'tired': 'fatigue and low energy',
    'skin': 'skin health concerns',
    'acne': 'acne and skin blemishes',
    'allergy': 'allergy symptoms',
    'joint': 'joint pain and stiffness',
    'muscle': 'muscle tension and soreness',
    'blood pressure': 'blood pressure support',
    'immune': 'immune system support',
    'depression': 'mood support and emotional wellness',
    'mood': 'mood and emotional balance',
  };
  
  // Find matching condition
  for (const [keyword, clinical] of Object.entries(conditionMap)) {
    if (lowerQuery.includes(keyword)) {
      return clinical;
    }
  }
  
  // Default: create a generic but grammatical description
  return 'general wellness concerns';
}

function createPersonalizedFallback(query: string, info: ExtractedInfo): RemedyResponse {
  // Interpret the query into a clean condition description
  const condition = interpretHealthQuery(query);
  
  // Create a professional summary without raw query interpolation
  let summary = `Based on your health concerns regarding ${condition}`;
  
  if (info.duration) {
    summary += ` over the ${info.duration.toLowerCase()} period you've experienced`;
  }
  
  if (info.ageGroup) {
    summary += `, here are natural remedies appropriate for your ${info.ageGroup.toLowerCase()} age group`;
  } else {
    summary += `, here are carefully selected natural remedies`;
  }
  
  summary += '. These recommendations consider your personal health profile and prioritize safety. Always consult a healthcare professional for persistent or severe symptoms.';
  
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
        name: "Ginger Root",
        description: "Ginger contains anti-inflammatory gingerols that may help reduce inflammation and promote relaxation. Selected for its well-documented safety profile and broad therapeutic benefits.",
        usage: gingerUsage,
        warnings,
        sources: ["Journal of Pain Research", "Phytotherapy Research"]
      },
      {
        name: "Chamomile",
        description: "A gentle, calming herb suitable for most age groups that can help with stress-related symptoms, promote relaxation, and support restful sleep.",
        usage: "Steep 1-2 teaspoons of dried chamomile flowers in hot water for 5-10 minutes. Drink up to 3 cups daily.",
        warnings: "Avoid if allergic to ragweed or related plants. May cause drowsiness.",
        sources: ["Molecular Medicine Reports", "Traditional herbal medicine"]
      },
      {
        name: "Peppermint",
        description: "Known for its soothing properties on the digestive and nervous systems, peppermint can help ease tension and promote comfort.",
        usage: "Steep fresh or dried peppermint leaves in hot water for 5-7 minutes. Can also use diluted peppermint oil topically.",
        warnings: "May worsen acid reflux in some people. Not recommended for infants.",
        sources: ["Journal of Clinical Gastroenterology"]
      }
    ],
    ancientRemedies: [
      {
        name: "Willow Bark",
        culture: "Ancient Egyptian Medicine",
        traditionalUse: "Used by ancient Egyptians for pain relief and inflammation, particularly for headaches and joint discomfort. Prepared as a tea by boiling the bark in water.",
        modernFindings: "Contains salicin, which converts to salicylic acid (similar to aspirin) and is scientifically proven to reduce pain and inflammation."
      },
      {
        name: "Turmeric Golden Milk",
        culture: "Ayurvedic Medicine (Ancient India)",
        traditionalUse: "Mixed with warm milk and black pepper, turmeric was used for thousands of years to reduce inflammation, support digestion, and promote overall wellness.",
        modernFindings: "Curcumin, the active compound, has been extensively studied for its anti-inflammatory and antioxidant properties."
      }
    ]
  };
}
