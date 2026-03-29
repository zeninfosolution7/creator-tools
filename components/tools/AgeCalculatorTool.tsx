"use client";

import React, { useState, FormEvent } from "react";
import { 
  format, 
  differenceInYears, 
  differenceInMonths, 
  differenceInDays, 
  addYears, 
  addMonths, 
  isBefore, 
  isToday, 
  isFuture as isFutureDate 
} from "date-fns";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  lifeProgress: string;
  generation: string;
  statusText: string; // "you are", "you were", or "you will be"
  targetFormatted: string;
}

const FESTIVALS: Record<string, string> = {
  "01-01": "New Year's Day",
  "01-26": "Republic Day (India)",
  "02-14": "Valentine's Day",
  "08-15": "Independence Day (India)",
  "10-02": "Gandhi Jayanti",
  "10-31": "Halloween",
  "12-25": "Christmas",
  "12-31": "New Year's Eve",
};

export default function AgeCalculatorTool() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [result, setResult] = useState<AgeResult | null>(null);
  const [festival, setFestival] = useState<string | null>(null);

  const handleCalculate = (e?: FormEvent) => {
    if (e) e.preventDefault(); 
    if (!birthDate || !targetDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (isBefore(target, birth)) {
      alert("Target date cannot be before your birth date!");
      return;
    }

    const years = differenceInYears(target, birth);
    const months = differenceInMonths(target, addYears(birth, years));
    const days = differenceInDays(target, addMonths(addYears(birth, years), months));
    const totalDays = differenceInDays(target, birth);

    // Life Progress (80yr scale)
    const progress = Math.min(Math.round((years / 80) * 100), 100);

    // Generation Logic
    const birthYear = birth.getFullYear();
    let gen = "Gen Alpha";
    if (birthYear < 2010) gen = "Gen Z";
    if (birthYear < 1997) gen = "Millennial";
    if (birthYear < 1981) gen = "Gen X";
    if (birthYear < 1965) gen = "Baby Boomer";

    // Determine Status Text
    let statusText = "you are:";
    if (isFutureDate(target)) {
      statusText = "you will be:";
    } else if (!isToday(target)) {
      statusText = "you were:";
    }

    setFestival(FESTIVALS[format(birth, "MM-dd")] || null);
    setResult({
      years,
      months,
      days,
      totalDays,
      lifeProgress: `${progress}%`,
      generation: gen,
      statusText,
      targetFormatted: isToday(target) ? "Today" : format(target, "PPP")
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Date of Birth
            </label>
            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Target Date
            </label>
            <input
              type="date"
              required
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="btn-brand mx-auto"
        >
          <span>Calculate</span>
          
        </button>
      </form>

      {result && (
        <div className="mt-8 space-y-6 border-t pt-8 dark:border-gray-800 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">
              On {result.targetFormatted}, {result.statusText}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
              <p className="text-3xl md:text-4xl font-black text-indigo-600 dark:text-indigo-400">{result.years}</p>
              <p className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 uppercase">Years</p>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
              <p className="text-3xl md:text-4xl font-black text-emerald-600 dark:text-emerald-400">{result.months}</p>
              <p className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">Months</p>
            </div>
            <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-800/50">
              <p className="text-3xl md:text-4xl font-black text-rose-600 dark:text-rose-400">{result.days}</p>
              <p className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase">Days</p>
            </div>
          </div>

          <div className="space-y-4">
            {festival && (
              <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 text-amber-800 dark:text-amber-200 rounded-xl border border-amber-200 dark:border-amber-800 text-center font-bold">
                🎉 Born on {festival}!
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-700 rounded-xl">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Total Days</p>
                <p className="text-lg font-mono font-bold dark:text-white">{result.totalDays.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-700 rounded-xl">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Gen</p>
                <p className="text-lg font-bold dark:text-white">{result.generation}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-700 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Life Progress</p>
                <span className="text-xs font-black text-indigo-500">{result.lifeProgress}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-1000" 
                  style={{ width: result.lifeProgress }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}