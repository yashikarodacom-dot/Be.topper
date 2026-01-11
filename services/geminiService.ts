
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYMBOL_INSTRUCTION = `CRITICAL INSTRUCTION: 
1. Do NOT use any special mathematical symbols or Greek letters (like alfa, beta, gamma, theta, pi, sigma, delta, etc.).
2. Always write out their names in plain English alphabets. Specifically use 'alfa' for alpha, 'beta' for beta, 'thrita' for theta, 'gamma' for gamma, 'pi' for pi, 'sigma' for sigma, 'delta' for delta, and 'degrees' for the degree symbol.
3. FRACTIONS: Present all fractions in vertical format using dashes for the line, for example:
   5
   ---
   10
   Ensure numerator and denominator are clearly aligned. Do not use linear '5/10' format if it is a mathematical expression.
4. This applies to all formulas, equations, and explanations.`;

export const getShortNotes = async (classLevel: string, subject: string, topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are an expert Indian educator. Create highly concise, bullet-pointed revision notes for a Class ${classLevel} student on the topic "${topic}" in the subject "${subject}". 
    ${SYMBOL_INSTRUCTION}
    The notes MUST be:
    1. Organized with clear, bold headings.
    2. Contain only the most essential formulas, definitions, and facts.
    3. Use a friendly but professional tone.
    4. Structured for quick reading (maximum 300 words).
    5. Include 2-3 "Pro-Tips" for the exam at the end.`,
  });
  return response.text;
};

export const getQuestionBank = async (classLevel: string, subject: string, topic: string, difficulty: string, count: number = 10) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate ${count} diverse and high-quality practice questions for Class ${classLevel}, Subject: ${subject}, Topic: ${topic} at a ${difficulty} difficulty level.
    Mix MCQ, short subjective, and numerical types.
    ${SYMBOL_INSTRUCTION}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Only for MCQ types" },
            answer: { type: Type.STRING },
            explanation: { type: Type.STRING },
            type: { type: Type.STRING, enum: ["MCQ", "Subjective", "Numerical"] }
          },
          required: ["id", "question", "answer", "explanation", "type"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};

// Added getDPP function to fix import error in components/DPPSection.tsx
export const getDPP = async (classLevel: string, subject: string, topic: string, difficulty: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate 5 high-quality Daily Practice Problems (DPP) for Class ${classLevel}, Subject: ${subject}, Topic: ${topic} at a ${difficulty} difficulty level.
    Mix MCQ, short subjective, and numerical types.
    ${SYMBOL_INSTRUCTION}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Only for MCQ types" },
            answer: { type: Type.STRING },
            explanation: { type: Type.STRING },
            type: { type: Type.STRING, enum: ["MCQ", "Subjective", "Numerical"] }
          },
          required: ["id", "question", "answer", "explanation", "type"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const getExpectedQuestions = async (classLevel: string, subject: string, topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `List 10 highly expected exam questions (important questions) for Class ${classLevel} ${subject} - Topic: ${topic}. 
    STRICT REQUIREMENT: Keep each question text short (1-2 lines).
    ${SYMBOL_INSTRUCTION}`,
  });
  return response.text;
};

export const chatWithAIFriend = async (message: string, language: string, history: any[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'Be Topper AI', a friendly and highly knowledgeable study companion for Indian school students (Classes 9-12). Explain concepts clearly, clear doubts instantly, and always respond in ${language}. Use analogies and simple examples. If asked about syllabus, focus on CBSE/ICSE/State Boards curriculum.
      ${SYMBOL_INSTRUCTION}`,
    },
  });

  const result = await chat.sendMessage({ message });
  return result.text;
};

export const generateSamplePaper = async (board: string, classLevel: string, subject: string, config: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a COMPLETE, FULL-LENGTH original question paper for ${board} Board, Class ${classLevel}, Subject: ${subject}. 
    CONTEXT: ${config}.
    
    STRICT REQUIREMENTS:
    1. Do NOT just provide an outline. Generate EVERY single question.
    2. SECTION A: 20 Multiple Choice Questions (1 mark each).
    3. SECTION B: 5 Very Short Answer Questions (2 marks each).
    4. SECTION C: 6 Short Answer Questions (3 marks each).
    5. SECTION D: 4 Long Answer Questions (5 marks each).
    6. Use official board exam formatting style.
    ${SYMBOL_INSTRUCTION}`,
  });
  return response.text;
};

export const getScienceDiagram = async (classLevel: string, topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a structured breakdown for the science diagram of "${topic}" (Class ${classLevel} Level).
    Include visual description, labels, and drawing tips.
    ${SYMBOL_INSTRUCTION}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          description: { type: Type.STRING },
          labels: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                function: { type: Type.STRING }
              }
            }
          },
          tips: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["description", "labels", "tips"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateScienceDiagramImage = async (classLevel: string, topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `Create a clean, professional scientific schematic diagram of "${topic}" for a Class ${classLevel} textbook. Academic, clear, white background. Easy to understand.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const getScienceActivity = async (classLevel: string, topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain the Science activity/experiment related to "${topic}" for Class ${classLevel}.
    Format: Aim, Materials, Procedure, Observation, Conclusion, VIVA VOCE.
    ${SYMBOL_INSTRUCTION}`,
  });
  return response.text;
};

export const getAnswerKey = async (type: 'paper' | 'expected' | 'question-bank', classLevel: string, subject: string, topic: string, board: string) => {
  const prompt = `Generate a COMPLETE marking scheme (Answer Key) for:
  Type: ${type === 'paper' ? 'Full Length Paper' : type === 'expected' ? 'Expected Qs' : 'Question Bank'}
  Class: ${classLevel} | Subject: ${subject} | Topic: ${topic} | Board: ${board}
  
  Provide point-wise model answers and marking tips.
  ${SYMBOL_INSTRUCTION}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text;
};
