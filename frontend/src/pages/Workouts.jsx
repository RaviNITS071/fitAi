import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Filter, Search, Play, Pause, RotateCcw, Clock, 
  ChevronDown, ChevronUp, CheckCircle2
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
    name: 'Dumbbell / Kettlebell Goblet Squat',
    category: 'Legs',
    targetMuscle: 'Quadriceps, Gluteus Maximus, Core',
    difficulty: 'Beginner',
    equipment: 'Dumbbell or Kettlebell',
    recommendedSets: '3 - 4 Sets',
    recommendedReps: '10 - 12 Reps',
    restSeconds: 90,
    formCues: [
      'Hold weight against sternum with elbows tucked inward.',
      'Descend until hip crease is below knee level while keeping chest upright.',
      'Drive through mid-foot on ascent; keep knees tracking over 2nd toe.'
    ]
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Dumbbell Deadlift (RDL)',
    category: 'Legs',
    targetMuscle: 'Hamstrings, Glutes, Erector Spinae',
    difficulty: 'Intermediate',
    equipment: 'Dumbbells',
    recommendedSets: '3 Sets',
    recommendedReps: '8 - 10 Reps',
    restSeconds: 120,
    formCues: [
      'Hinge strictly at the hips; keep soft bend in knees without squatting.',
      'Trace dumbbells down the shins until deep hamstring tension is reached.',
      'Do not round lumbar spine at any point in the movement.'
    ]
  },
  {
    id: 'hanging-knee-raise',
    name: 'Hanging Knee / Leg Raise',
    category: 'Core',
    targetMuscle: 'Rectus Abdominis, Iliopsoas',
    difficulty: 'Intermediate',
    equipment: 'Pull-up Bar',
    recommendedSets: '3 Sets',
    recommendedReps: '12 - 15 Reps',
    restSeconds: 60,
    formCues: [
      'Avoid swinging or using momentum from shoulder girdle.',
      'Curl pelvis upward toward ribcage rather than simply lifting thighs.',
      'Control the lowering phase for 2 seconds.'
    ]
  },
  {
    id: 'incline-treadmill-walk',
    name: 'Zone 2 Incline Treadmill Walk',
    category: 'Cardio',
    targetMuscle: 'Cardiovascular System, Calves',
    difficulty: 'Beginner',
    equipment: 'Treadmill',
    recommendedSets: '1 Session',
    recommendedReps: '20 - 30 Minutes',
    restSeconds: 0,
    formCues: [
      'Set incline between 10% and 12%, speed between 4.0 - 5.0 km/h.',
      'Maintain nasal breathing to stay in true Zone 2 aerobic threshold.',
      'Do not hold onto handrails; swing arms naturally.'
    ]
  }
];

export default function Workouts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Interval Rest Timer State
  const [secondsRemaining, setSecondsRemaining] = useState(90);
  const [timerDuration, setTimerDuration] = useState(90);
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
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Exercise & Movement Library
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Biomechanical form standards, targeted muscle groups, and active set interval timers.
        </p>
      </div>

      {/* Interval Rest Timer Widget - Clean Minimalist Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Rest Interval Timer</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Track recovery intervals between working sets</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono font-bold text-xl text-slate-900 dark:text-white min-w-[75px] text-center">
            {Math.floor(secondsRemaining / 60)}:{(secondsRemaining % 60).toString().padStart(2, '0')}
          </div>
          <div className="flex gap-1">
            {[45, 60, 90, 120].map((sec) => (
              <button
                key={sec}
                onClick={() => startTimer(sec)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  timerDuration === sec && isTimerRunning
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            title={isTimerRunning ? "Pause" : "Start"}
          >
            {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={() => { setIsTimerRunning(false); setSecondsRemaining(timerDuration); }}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors"
            title="Reset"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Category Segmented Controls */}
        <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search movement or muscle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:border-slate-900 dark:focus:border-slate-400 text-slate-900 dark:text-white"
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
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-card transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {exercise.category}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800/60 text-slate-500 border border-slate-200 dark:border-slate-700">
                        {exercise.difficulty}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {exercise.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Target: {exercise.targetMuscle}
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
                    <Dumbbell size={18} />
                  </div>
                </div>

                {/* Protocol Quick Badges */}
                <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 dark:border-slate-800 text-center my-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-lg">
                  <div>
                    <span className="block text-[10px] font-medium text-slate-400 uppercase">Sets</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-200">{exercise.recommendedSets}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-medium text-slate-400 uppercase">Reps</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-200">{exercise.recommendedReps}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-medium text-slate-400 uppercase">Rest</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-200">{exercise.restSeconds}s</span>
                  </div>
                </div>
              </div>

              {/* Expandable Form Cues */}
              <div>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : exercise.id)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 pt-1 transition-colors"
                >
                  <span>{isExpanded ? 'Hide Form Instructions' : 'View Form Instructions'}</span>
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    {exercise.formCues.map((cue, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{cue}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
