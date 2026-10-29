const { RequestSchema, ReplySchema, validateCitations } = require('../rag/contracts');

describe('RAG Contracts & Citation Validation (PDF Chapter 18 & 19)', () => {
  describe('RequestSchema Validation', () => {
    test('accepts valid input matching schema constraints', () => {
      const valid = {
        question: "What information is needed before making a strength plan?",
        goal: "strength"
      };
      const result = RequestSchema.safeParse(valid);
      expect(result.success).toBe(true);
      expect(result.data.goal).toBe("strength");
    });

    test('rejects questions under minimum length', () => {
      const invalid = { question: "hi", goal: "strength" };
      const result = RequestSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    test('rejects invalid goals not in enum', () => {
      const invalid = { question: "Valid question here?", goal: "aerobics" };
      const result = RequestSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('ReplySchema Validation', () => {
    test('accepts valid reply with status ok', () => {
      const reply = {
        status: "ok",
        answer: "A strength plan requires experience level, equipment, and schedule.",
        sourceIds: ["S1"],
        missingInformation: []
      };
      const result = ReplySchema.safeParse(reply);
      expect(result.success).toBe(true);
    });

    test('accepts valid reply with status insufficient_context', () => {
      const reply = {
        status: "insufficient_context",
        answer: "No relevant documents found.",
        sourceIds: [],
        missingInformation: ["Target sport guidelines"]
      };
      const result = ReplySchema.safeParse(reply);
      expect(result.success).toBe(true);
    });
  });

  describe('validateCitations Logic', () => {
    const evidence = [
      { id: "S1", sourceId: "strength-profile", text: "Collect experience, equipment, schedule." },
      { id: "S2", sourceId: "nutrition-profile", text: "Collect allergies and preferences." }
    ];

    test('passes when model cites allowed source IDs and returns provenance', () => {
      const reply = {
        status: "ok",
        answer: "Collect equipment and schedule.",
        sourceIds: ["S1"]
      };

      const sources = validateCitations(reply, evidence);
      expect(sources).toEqual([{ id: "S1", sourceId: "strength-profile" }]);
    });

    test('throws error if model hallucinates non-existent source ID (PDF Page 19)', () => {
      const reply = {
        status: "ok",
        answer: "Unsupported claim.",
        sourceIds: ["S999"] // Non-existent ID!
      };

      expect(() => validateCitations(reply, evidence)).toThrow('The model cited an unknown source ID');
    });

    test('throws error if status is ok but no citation is provided (PDF Page 19)', () => {
      const reply = {
        status: "ok",
        answer: "Claim with no source.",
        sourceIds: []
      };

      expect(() => validateCitations(reply, evidence)).toThrow('A supported answer needs a citation');
    });
  });
});
