import React, { useState } from 'react';
import { Calculator, ArrowRight, Activity, Flame, Target } from 'lucide-react';

interface FitnessCalculatorProps {
  onSelectProgramRecommendation: (programName: string) => void;
}

export const FitnessCalculator: React.FC<FitnessCalculatorProps> = ({
  onSelectProgramRecommendation,
}) => {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('175'); // lbs or kg
  const [heightFeet, setHeightFeet] = useState<string>('5');
  const [heightInches, setHeightInches] = useState<string>('10');
  const [heightCm, setHeightCm] = useState<string>('178');
  const [activityLevel, setActivityLevel] = useState<string>('moderate'); // sedentary, light, moderate, active, athlete
  const [goal, setGoal] = useState<'fat_loss' | 'muscle_gain' | 'strength_endurance'>('fat_loss');

  // Calculations
  const calcResults = () => {
    let weightKg = 0;
    let heightM = 0;

    if (unit === 'imperial') {
      const wLbs = parseFloat(weight) || 150;
      weightKg = wLbs * 0.453592;
      const totalInches = (parseFloat(heightFeet) || 5) * 12 + (parseFloat(heightInches) || 8);
      heightM = totalInches * 0.0254;
    } else {
      weightKg = parseFloat(weight) || 70;
      heightM = (parseFloat(heightCm) || 175) / 100;
    }

    if (heightM <= 0) heightM = 1.75;
    const bmi = weightKg / (heightM * heightM);

    // Basal Metabolic Rate estimation (Mifflin-St Jeor)
    const baseBMR =
      gender === 'male'
        ? 10 * weightKg + 6.25 * (heightM * 100) - 5 * 28 + 5
        : 10 * weightKg + 6.25 * (heightM * 100) - 5 * 28 - 161;

    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      athlete: 1.9,
    };

    const tdee = Math.round(baseBMR * (activityMultipliers[activityLevel] || 1.55));

    let targetCalories = tdee;
    if (goal === 'fat_loss') targetCalories = Math.round(tdee - 450);
    if (goal === 'muscle_gain') targetCalories = Math.round(tdee + 350);

    // Recommended daily protein (approx 1.8g to 2.2g per kg)
    const proteinGrams = Math.round(weightKg * 2.0);

    let recommendedProgram = 'CrossFit & Functional Fitness';
    if (goal === 'fat_loss') recommendedProgram = '30-Day Total Transformation Challenge';
    else if (goal === 'muscle_gain') recommendedProgram = '1-on-1 Personal Training';
    else recommendedProgram = 'CrossFit & Functional Fitness';

    return {
      bmi: bmi.toFixed(1),
      tdee,
      targetCalories,
      proteinGrams,
      recommendedProgram,
    };
  };

  const results = calcResults();

  return (
    <section id="calculator" className="py-20 bg-[#0b0c10] border-b border-[#232630]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500 mb-2">
              <span>Athlete Blueprint Tool</span>
              <span aria-hidden="true">·</span>
              <span>Calorie & Macro Guide</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              PERFORMANCE <span className="text-red-500">CALCULATOR</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md">
            Input your metrics to calculate your optimal daily calorie burn target, protein requirements, and tailored AK GYM program recommendation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#121520] rounded-2xl border border-[#232839] p-6 sm:p-8">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Units and Gender Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#212637]">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-semibold text-slate-400">Measurement:</span>
                <div className="inline-flex p-1 bg-[#191d2b] rounded-lg border border-[#2b3145]">
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`px-3 py-1 text-xs font-bold rounded ${
                      unit === 'imperial' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Lbs / Ft
                  </button>
                  <button
                    onClick={() => setUnit('metric')}
                    className={`px-3 py-1 text-xs font-bold rounded ${
                      unit === 'metric' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Kg / Cm
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-semibold text-slate-400">Gender:</span>
                <div className="inline-flex p-1 bg-[#191d2b] rounded-lg border border-[#2b3145]">
                  <button
                    onClick={() => setGender('male')}
                    className={`px-3 py-1 text-xs font-bold rounded ${
                      gender === 'male' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`px-3 py-1 text-xs font-bold rounded ${
                      gender === 'female' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>
            </div>

            {/* Inputs: Weight & Height */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5">
                  Body Weight ({unit === 'imperial' ? 'lbs' : 'kg'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-[#171b26] border border-[#282e42] rounded-lg px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-red-500"
                />
              </div>

              {unit === 'imperial' ? (
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5">
                    Height (Ft & In)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Feet"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="bg-[#171b26] border border-[#282e42] rounded-lg px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-red-500"
                    />
                    <input
                      type="number"
                      placeholder="Inches"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="bg-[#171b26] border border-[#282e42] rounded-lg px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5">
                    Height (Centimeters)
                  </label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full bg-[#171b26] border border-[#282e42] rounded-lg px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-red-500"
                  />
                </div>
              )}
            </div>

            {/* Goal Selector */}
            <div>
              <label className="block text-xs uppercase font-semibold text-slate-400 mb-2">
                Primary Athletic Objective
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setGoal('fat_loss')}
                  className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                    goal === 'fat_loss'
                      ? 'border-red-500 bg-red-950/20 text-white'
                      : 'border-[#262b3d] bg-[#161a25] text-slate-400 hover:text-white'
                  }`}
                >
                  <Flame className="w-4 h-4 text-red-500 mb-1" />
                  <span className="text-xs font-bold block">Burn Fat</span>
                  <span className="text-[10px] text-slate-400">Lean conditioning</span>
                </button>

                <button
                  onClick={() => setGoal('muscle_gain')}
                  className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                    goal === 'muscle_gain'
                      ? 'border-red-500 bg-red-950/20 text-white'
                      : 'border-[#262b3d] bg-[#161a25] text-slate-400 hover:text-white'
                  }`}
                >
                  <Target className="w-4 h-4 text-amber-500 mb-1" />
                  <span className="text-xs font-bold block">Build Muscle</span>
                  <span className="text-[10px] text-slate-400">Hypertrophy & power</span>
                </button>

                <button
                  onClick={() => setGoal('strength_endurance')}
                  className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                    goal === 'strength_endurance'
                      ? 'border-red-500 bg-red-950/20 text-white'
                      : 'border-[#262b3d] bg-[#161a25] text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-4 h-4 text-emerald-500 mb-1" />
                  <span className="text-xs font-bold block">Peak Fitness</span>
                  <span className="text-[10px] text-slate-400">CrossFit & engine</span>
                </button>
              </div>
            </div>

            {/* Weekly Activity Level */}
            <div>
              <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5">
                Current Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full bg-[#171b26] border border-[#282e42] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="sedentary">Sedentary (Desk job, little intentional exercise)</option>
                <option value="light">Lightly Active (1–2 light workouts per week)</option>
                <option value="moderate">Moderately Active (3–4 intense gym sessions per week)</option>
                <option value="active">Very Active (5+ intense workouts per week)</option>
                <option value="athlete">Competitive Athlete (Daily rigorous double sessions)</option>
              </select>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#181c2b] to-[#131622] rounded-xl border border-[#2c3347] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-[#262c3e] mb-4">
                <span className="font-semibold uppercase tracking-wider text-slate-400">Calculated Metrics</span>
                <span className="font-mono text-red-400 text-xs">AK Standard</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-[#11141e] rounded-lg border border-[#222738]">
                  <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Est. BMI</span>
                  <span className="text-2xl font-extrabold text-white font-mono tabular-nums">{results.bmi}</span>
                </div>
                <div className="p-3 bg-[#11141e] rounded-lg border border-[#222738]">
                  <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Daily Protein</span>
                  <span className="text-2xl font-extrabold text-white font-mono tabular-nums">{results.proteinGrams}g</span>
                </div>
              </div>

              <div className="p-4 bg-[#11141e] rounded-xl border border-[#222738] mb-6">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs uppercase font-semibold text-slate-400">Target Daily Intake:</span>
                  <span className="text-2xl font-extrabold text-red-500 font-mono tabular-nums">{results.targetCalories} kcal</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  TDEE maintenance estimated at {results.tdee} kcal/day.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/20">
                <span className="text-[10px] uppercase font-bold text-red-400 block mb-1">Recommended Starting Discipline</span>
                <h4 className="text-lg font-extrabold uppercase text-white tracking-tight">{results.recommendedProgram}</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Matched based on your personal goal to accelerate body recomposition and athletic stamina.
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectProgramRecommendation(results.recommendedProgram)}
              className="mt-6 w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-red-600/25"
            >
              <span>Explore {results.recommendedProgram}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
