/**
 * Zod Contracts & Citation Validation Module for FitAI
 * Implements validation contracts from GenAI interview preparation guide (Chapter 12, 18, 19)
 */

const { z } = require('zod');

// Request Contract for RAG Q&A
const RequestSchema = z.object({
  question: z.string().trim().min(5, "Question must be at least 5 characters").max(2000, "Question must not exceed 2000 characters"),
  goal: z.enum(["strength", "endurance", "general"], {
    errorMap: () => ({ message: "Goal must be one of: 'strength', 'endurance', or 'general'" })
  })
});

// Reply Contract for Grounded Structured RAG Output
const ReplySchema = z.object({
  status: z.enum(["ok", "insufficient_context"]),
  answer: z.string(),
  sourceIds: z.array(z.string()),
  missingInformation: z.array(z.string())
});

// Plan Request Contract
const PlanRequestSchema = z.object({
  userId: z.string().optional(),
  goal: z.string().optional().default("general"),
  experienceLevel: z.string().optional().default("Beginner"),
  equipment: z.string().optional().default("Full Gym"),
  schedule: z.string().optional().default("3 days a week"),
  dietaryPreference: z.string().optional().default("Balanced"),
  allergies: z.string().optional().default("None"),
  medicalConditions: z.string().optional().default("None"),
  weight: z.number().optional().default(70),
  height: z.number().optional().default(170),
  age: z.number().optional().default(25),
  gender: z.string().optional().default("Male"),
  activityLevel: z.string().optional().default("Sedentary")
});

// Plan Reply Contract with Grounded Precautions & Citations
const PlanReplySchema = z.object({
  status: z.enum(["ok", "insufficient_context"]),
  precautions: z.array(z.string()),
  workoutPlan: z.object({
    focus: z.string(),
    weeklySplit: z.string(),
    routine: z.array(
      z.object({
        day: z.string(),
        focus: z.string(),
        exercises: z.array(
          z.object({
            name: z.string(),
            sets: z.string(),
            reps: z.string(),
            rest: z.string().optional()
          })
        )
      })
    )
  }),
  dietPlan: z.object({
    targetCalories: z.number(),
    macros: z.object({
      protein: z.string(),
      carbs: z.string(),
      fats: z.string()
    }),
    meals: z.array(
      z.object({
        mealName: z.string(),
        suggestion: z.string(),
        calories: z.number()
      })
    )
  }),
  sourceIds: z.array(z.string()),
  missingInformation: z.array(z.string())
});

/**
 * Validates citations in model response against supplied evidence items.
 * Throws explicit errors if model hallucinates non-existent IDs or omits citations for supported claims.
 * 
 * @param {Object} reply - The structured model reply
 * @param {Array<{ id: string, sourceId: string, text: string }>} evidence - The retrieved evidence passages
 * @returns {Array<{ id: string, sourceId: string }>} Validated citation sources with provenance
 */
function validateCitations(reply, evidence) {
  const allowed = new Set(evidence.map(e => e.id));

  // Check 1: Model must never cite an ID that was not provided in the evidence prompt
  if (Array.isArray(reply.sourceIds)) {
    const invalidId = reply.sourceIds.find(id => !allowed.has(id));
    if (invalidId) {
      throw new Error(`The model cited an unknown source ID: "${invalidId}"`);
    }
  }

  // Check 2: A supported ("ok") answer must cite at least one verified source passage
  if (reply.status === "ok" && (!reply.sourceIds || reply.sourceIds.length === 0)) {
    throw new Error("A supported answer needs a citation to verified evidence");
  }

  // Return attached provenance records
  return evidence
    .filter(e => reply.sourceIds && reply.sourceIds.includes(e.id))
    .map(({ id, sourceId }) => ({ id, sourceId }));
}

module.exports = {
  RequestSchema,
  ReplySchema,
  PlanRequestSchema,
  PlanReplySchema,
  validateCitations
};
