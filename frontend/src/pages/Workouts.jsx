import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Filter, Search, Play, Pause, RotateCcw, Clock, 
  Flame, ShieldCheck, ChevronDown, ChevronUp, Zap, Sparkles, CheckCircle2
} from 'lucide-react';

const EXERCISE_DATABASE = [
  {
    id: 'incline-db-press',
    name: 'Incline Dumbbell Chest Press',
    category: 'Push',
    targetMuscle: 'Upper Pectorals, Anterior Deltoid',
    difficulty: 'Intermediate',
    equipment: 'Dumbbells & Incline Bench',
    recommendedSets: '3 - 4 Sets',
    recommendedReps: '8 - 12 Reps',
    restSeconds: 90,
    formCues: [
      'Set bench to 30-degree incline to maximize clavicular head activation.',
      'Retract scapulae and plant feet firmly on the floor.',
      'Control eccentric phase for 2-3 seconds; avoid clanking dumbbells at the top.'
    ]
  },
  {
    id: 'overhead-press',
    name: 'Standing Barbell Overhead Press',
    category: 'Push',
    targetMuscle: 'Deltoids, Triceps, Upper Traps',
    difficulty: 'Advanced',
    equipment: 'Barbell',
    recommendedSets: '3 - 4 Sets',
    recommendedReps: '5 - 8 Reps',
    restSeconds: 120,
    formCues: [
      'Squeeze glutes and brace abdominal wall to prevent lumbar hyperextension.',
      'Press bar vertically in a straight path, moving head back then through.',
      'Lock out with shoulders actively shrugged upward.'
    ]
  },
  {
    id: 'lat-pulldown',
    name: 'Wide-Grip Lat Pulldown',
    category: 'Pull',
    targetMuscle: 'Latissimus Dorsi, Teres Major, Biceps',
    difficulty: 'Beginner',
    equipment: 'Cable Machine',
    recommendedSets: '3 Sets',
    recommendedReps: '10 - 12 Reps',
    restSeconds: 75,
    formCues: [
      'Depress scapulae before pulling with your elbows.',
      'Pull the bar down toward upper sternum while maintaining slight torso lean (10-15°).',
      'Feel the deep stretch at full overhead extension.'
    ]
  },
  {
    id: 'chest-supported-row',
    name: 'Incline Chest-Supported Dumbbell Row',
    category: 'Pull',
    targetMuscle: 'Rhomboids, Mid-Trapezius, Posterior Deltoid',
    difficulty: 'Beginner',
    equipment: 'Dumbbells & Bench',
    recommendedSets: '3 - 4 Sets',
    recommendedReps: '10 - 12 Reps',
    restSeconds: 90,
    formCues: [
      'Chest flush against bench pad removes all axial spinal fatigue.',
      'Drive elbows backward past the torso and pause for 1 second at full contraction.',
      'Ideal for trainees managing lower back sensitivity.'
    ]
  },
  {
    id: 'goblet-squat',
    name: 'Kettlebell / Dumbbell Goblet Squat',
    category: 'Legs',
    targetMuscle: 'Quadriceps, Glutes, Core',
    difficulty: 'Beginner',
    equipment: 'Dumbbell or Kettlebell',
    recommendedSets: '3 - 4 Sets',
    recommendedReps: '10 - 15 Reps',
    restSeconds: 90,
    formCues: [
      'Hold weight close to upper chest under your chin.',
      'Squat between your knees while keeping torso upright.',
      'Push through mid-foot and stand to full hip extension.'
    ]
  },
  {
    id: 'romanian-deadlift',
    name: 'Dumbbell Romanian Deadlift (RDL)',
    category: 'Legs',
    targetMuscle: 'Hamstrings, Gluteus Maximus, Erector Spinae',
    difficulty: 'Intermediate',
    equipment: 'Dumbbells',
    recommendedSets: '3 Sets',
    recommendedReps: '8 - 12 Reps',
    restSeconds: 90,
    formCues: [
      'Soft knee bend throughout; initiate movement purely from hip hinge backward.',
      'Keep dumbbells skimming down your thighs and shins.',
      'Stop when hips can no longer travel backward; do not round thoracic spine.'
    ]
  },
  {
    id: 'hanging-knee-raise',
    name: 'Hanging Knee / Leg Raises',
    category: 'Core',
    targetMuscle: 'Rectus Abdominis, Hip Flexors',
    difficulty: 'Intermediate',
    equipment: 'Pull-Up Bar',
    recommendedSets: '3 Sets',
    recommendedReps: '12 - 15 Reps',
    restSeconds: 60,
    formCues: [
      'Hang from bar with active shoulders to protect rotator cuff.',
      'Posteriorly tilt pelvis and curl knees up to chest level.',
      'Avoid swinging or using momentum on the eccentric lowering.'
    ]
  },
  {
    id: 'zone2-treadmill',
    name: 'Zone 2 Incline Steady-State Walk',
    category: 'Cardio',
    targetMuscle: 'Cardiovascular System, Mitochondrial Density',
    difficulty: 'Beginner',
    equipment: 'Treadmill',
    recommendedSets: '1 Session',
    recommendedReps: '30 - 45 Minutes',
    restSeconds: 0,
    formCues: [
      'Set incline to 8-12% and speed to 4.5-5.5 km/h.',
      'Maintain nasal breathing or conversational pace (60-70% max heart rate).',
      'Builds massive aerobic base without generating muscular breakdown.'
    ]
  }
];

export default function Workouts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Rest Timer State
  const [timerDuration, setTimerDuration] = useState(60);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  const startTimer = (duration) => {
    setTimerDuration(duration);
    setSecondsRemaining(duration);
    setIsTimerRunning(true);
  };

  const categories = ['All', 'Push', 'Pull', 'Legs', 'Core', 'Cardio'];

  const filteredExercises = EXERCISE_DATABASE.filter(ex => {
    const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-3">
          <Sparkles size={14} /> Comprehensive Exercise & Movement Studio
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Master Your <span className="gradient-text">Movement Mechanics</span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Biomechanical execution guides, muscle recruitment data, and evidence-based rest parameters.
        </p>
      </div>

      {/* Floating Rest Timer Widget */}
      <div className="mb-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xl shadow-indigo-500/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Workout Rest Interval Timer</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Optimize ATP-CP system replenishment between working sets</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black text-2xl text-indigo-600 dark:text-indigo-400 min-w-[90px] text-center border border-slate-200 dark:border-slate-700">
            {Math.floor(secondsRemaining / 60)}:{(secondsRemaining % 60).toString().padStart(2, '0')}
          </div>
          <div className="flex gap-1.5">
            {[45, 60, 90, 120].map((sec) => (
              <button
                key={sec}
                onClick={() => startTimer(sec)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  timerDuration === sec && isTimerRunning
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md"
            title={isTimerRunning ? "Pause" : "Start"}
          >
            {isTimerRunning ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
          <button
            onClick={() => { setIsTimerRunning(false); setSecondsRemaining(timerDuration); }}
            className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-all"
            title="Reset"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search size={18} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search exercise or muscle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm outline-none focus:border-indigo-500 dark:text-white transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Exercise Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExercises.map((exercise) => {
          const isExpanded = expandedId === exercise.id;
          return (
            <div
              key={exercise.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-lg shadow-slate-200/30 dark:shadow-none hover:border-indigo-500/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
                      {exercise.category}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      exercise.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400' :
                      exercise.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400' :
                      'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                    {exercise.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                    🎯 {exercise.targetMuscle}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Dumbbell size={24} />
                </div>
              </div>

              {/* Protocol Quick Badges */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800 text-center my-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl">
                <div>
                  <span className="block text-[10px] font-black uppercase text-slate-400">Sets</span>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{exercise.recommendedSets}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase text-slate-400">Reps</span>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{exercise.recommendedReps}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase text-slate-400">Rest</span>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{exercise.restSeconds}s</span>
                </div>
              </div>

              {/* Expandable Form Cues */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : exercise.id)}
                className="w-full flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 py-1 transition-colors"
              >
                <span>{isExpanded ? 'Hide Biomechanical Form Cues' : 'View Biomechanical Form Cues'}</span>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 animate-in fade-in duration-300">
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">Key Technique Standards:</span>
                  {exercise.formCues.map((cue, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{cue}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
