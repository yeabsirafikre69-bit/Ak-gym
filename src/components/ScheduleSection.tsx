import React, { useState, useMemo } from 'react';
import { Clock, User, MapPin, Users, Flame, Calendar, Filter } from 'lucide-react';
import { CLASSES, SCHEDULE_DAYS } from '../data/gymData';
import { ClassCategory, GymClass } from '../types/gym';

interface ScheduleSectionProps {
  onReserveClass: (gymClass: GymClass, day: string) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  onReserveClass,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedCategory, setSelectedCategory] = useState<ClassCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: ClassCategory; label: string }[] = [
    { id: 'all', label: 'All Classes' },
    { id: 'crossfit', label: 'CrossFit' },
    { id: 'hiit', label: 'HIIT & Conditioning' },
    { id: 'strength', label: 'Strength & Barbell' },
    { id: 'mobility', label: 'Mobility & Recovery' },
    { id: 'challenge', label: '30-Day Cohort' },
  ];

  // Filter classes matching current day, category, and search query
  const filteredClasses = useMemo(() => {
    return CLASSES.filter((c) => {
      const matchesDay = c.days.includes(selectedDay);
      const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDay && matchesCategory && matchesSearch;
    });
  }, [selectedDay, selectedCategory, searchQuery]);

  return (
    <section id="schedule" className="py-20 bg-[#0b0c10] border-b border-[#232630]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500 mb-2">
              <span>Weekly Timetable</span>
              <span aria-hidden="true">·</span>
              <span>42 Classes Scheduled</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              CLASS <span className="text-red-500">SCHEDULE</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md">
            Reserve your rack or turf spot up to 7 days in advance. All classes are capped for guaranteed coach supervision and zero overcrowding.
          </p>
        </div>

        {/* Day of Week Selector Tabs - Horizontal scrollable on mobile */}
        <div className="overflow-x-auto pb-2 mb-6 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max p-1.5 bg-[#12151e] rounded-xl border border-[#232736]">
            {SCHEDULE_DAYS.map((day) => {
              const isSelected = selectedDay === day;
              // Count classes on this day
              const classCount = CLASSES.filter((c) => c.days.includes(day)).length;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-[#1a1e2b]'
                  }`}
                >
                  <span>{day}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-red-700 text-white' : 'bg-[#1c202d] text-slate-400'
                    }`}
                  >
                    {classCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isCatActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isCatActive
                      ? 'bg-slate-200 text-slate-900 font-bold'
                      : 'text-slate-400 hover:text-white bg-[#151822] hover:bg-[#1f2330] border border-[#232735]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search class or coach..."
              className="w-full bg-[#131620] border border-[#262a39] text-xs text-white rounded-lg pl-3 pr-8 py-2 placeholder:text-slate-500 focus:outline-none focus:border-red-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Classes List */}
        {filteredClasses.length === 0 ? (
          <div className="text-center py-16 px-4 bg-[#11141c] rounded-2xl border border-[#202432]">
            <Calendar className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No classes found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              No sessions scheduled matching your filters on {selectedDay}. Try selecting another day or category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1e2330] hover:bg-[#282e40] rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredClasses.map((item) => {
              const spotsLeft = item.capacity - item.enrolled;
              const isAlmostFull = spotsLeft <= 4;
              const fillPercentage = Math.round((item.enrolled / item.capacity) * 100);

              const intensityColors = {
                Medium: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40',
                High: 'text-amber-400 bg-amber-950/40 border-amber-800/40',
                Elite: 'text-red-400 bg-red-950/40 border-red-800/40',
              };

              return (
                <div
                  key={item.id}
                  className="bg-[#12151e] rounded-xl border border-[#232736] hover:border-[#383e52] p-5 flex flex-col justify-between transition-all group shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Top Row: Time & Duration + Intensity */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <div className="flex items-center gap-1.5 text-slate-300 font-mono font-medium">
                        <Clock className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{item.time}</span>
                        <span className="text-slate-500">({item.duration})</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                          intensityColors[item.intensity]
                        }`}
                      >
                        {item.intensity} Intensity
                      </span>
                    </div>

                    {/* Class Name */}
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2 group-hover:text-red-400 transition-colors">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Meta info: Coach and Room */}
                    <div className="space-y-1.5 text-xs text-slate-300 border-t border-[#1e2230] pt-3 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Coach: <strong className="text-white">{item.coach}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-slate-400">{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Spot Capacity & Action */}
                  <div className="pt-3 border-t border-[#1e2230]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Users className="w-3.5 h-3.5" />
                        <span className="font-mono tabular-nums">{item.enrolled}/{item.capacity}</span>
                        <span>athletes</span>
                      </div>
                      <span
                        className={`font-semibold text-[11px] ${
                          isAlmostFull ? 'text-amber-400' : 'text-slate-400'
                        }`}
                      >
                        {spotsLeft} spots remaining
                      </span>
                    </div>

                    {/* Capacity progress bar */}
                    <div className="w-full bg-[#1e2230] h-1.5 rounded-full overflow-hidden mb-3.5">
                      <div
                        className={`h-full rounded-full ${
                          fillPercentage > 85 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${fillPercentage}%` }}
                      />
                    </div>

                    <button
                      onClick={() => onReserveClass(item, selectedDay)}
                      className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1e2330] hover:bg-red-600 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Reserve Spot ({selectedDay})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
