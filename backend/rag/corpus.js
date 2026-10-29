/**
 * Approved Source Documents for FitAI Knowledge Base (Pipeline A)
 * Follows curriculum and verified policies from GenAI guide (Chapter 10, 12, 17, 18).
 * Each document contains approved factual content, goal category, and version metadata.
 */

const corpusId = "fitai_demo_v1";
const sourceVersion = "v1.0";

const sourceDocuments = [
  {
    id: "strength-profile",
    title: "Strength Plan Intake Policy",
    goal: "strength",
    corpusId,
    sourceVersion,
    text: "Demo app policy: before making a strength-plan outline, collect training experience, available equipment, and the user's requested schedule. Ensure progressive overload principles are applied across compound movements."
  },
  {
    id: "nutrition-profile",
    title: "Nutrition & Dietary Restrictions Policy",
    goal: "general",
    corpusId,
    sourceVersion,
    text: "Demo app policy: nutrition-related responses must distinguish stated dietary preferences from unknown allergies or restrictions. Ask when missing. All suggested diets must respect identified allergen boundaries."
  },
  {
    id: "endurance-profile",
    title: "Endurance Plan Intake Policy",
    goal: "endurance",
    corpusId,
    sourceVersion,
    text: "Demo app policy: before making an endurance-plan outline, collect the activity, experience level, available equipment, and requested schedule. Emphasize cardiovascular base building and zone 2 heart rate pacing."
  },
  {
    id: "strength-hypertrophy-principles",
    title: "Strength & Hypertrophy Protocols",
    goal: "strength",
    corpusId,
    sourceVersion,
    text: "For muscular hypertrophy and strength adaptations, perform 10 to 20 challenging working sets per muscle group per week. Primary compound lifts include squats, deadlifts, bench press, and overhead press. Target 6-12 repetitions for hypertrophy and 3-6 repetitions for maximal strength with 90-180 seconds rest between working sets."
  },
  {
    id: "endurance-cardio-protocols",
    title: "Cardiovascular Endurance & Aerobic Base",
    goal: "endurance",
    corpusId,
    sourceVersion,
    text: "Endurance training routines should incorporate 80% low-intensity steady-state (Zone 2) cardio and 20% high-intensity interval intervals. Maintain adequate hydration by consuming 500ml water 2 hours before exercise and electrolyte replacement during sessions exceeding 60 minutes."
  },
  {
    id: "macronutrient-energy-balance",
    title: "Macronutrient Distribution & Calorie Balance",
    goal: "general",
    corpusId,
    sourceVersion,
    text: "Optimal body composition relies on energy balance: a moderate 400-500 kcal deficit achieves 0.5kg/week fat loss, while a 300-500 kcal surplus supports lean muscle accrual. Target daily protein intake between 1.6g to 2.2g per kilogram of total body mass. Dietary fat should supply 20-35% of total caloric intake."
  },
  {
    id: "indian-diet-guidelines",
    title: "Indian Nutrition & Balanced Meal Framework",
    goal: "general",
    corpusId,
    sourceVersion,
    text: "Authentic Indian dietary protocols must combine plant and animal protein sources effectively: dal/legumes with whole grain rotis, paneer, tofu, soya chunks, Greek yogurt/curd, eggs, and lean chicken. Measure all portions in metric units (grams) or standardized Indian household measures (katoris). Ensure sodium and refined oil moderation."
  },
  {
    id: "medical-orthopedic-precautions",
    title: "Orthopedic & Joint Strain Precautions",
    goal: "general",
    corpusId,
    sourceVersion,
    text: "Safety rules: for users reporting lower back pain or lumbar disc concerns, eliminate heavy spinal compression loading such as standing overhead barbell presses and rounded-back deadlifts; substitute supported chest dumbbell rows and goblet squats. For knee joint issues, avoid excessive forward knee shear beyond toes under heavy load; substitute box squats and glute-ham bridges."
  },
  {
    id: "recovery-sleep-protocol",
    title: "Systemic Recovery & Fatigue Management",
    goal: "general",
    corpusId,
    sourceVersion,
    text: "Central nervous system recovery mandates 7 to 9 hours of quality sleep nightly. When a user reports high fatigue or sleep under 6 hours, down-regulate training intensity to active recovery (mobility drills, light walking, or yoga) to mitigate elevated cortisol and injury vulnerability."
  }
];

module.exports = {
  corpusId,
  sourceVersion,
  sourceDocuments
};
