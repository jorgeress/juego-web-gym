"use client";

import { useState, useEffect } from "react";
import { today } from "./logic/DateUtils";
import { applyTraining } from "./logic/Progression";

export default function Home() {
  const [character, setCharacter] = useState({
    strength: 1,
    endurance: 1,
    discipline: 1,
  });
  const [lastTraining, setLastTraining] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedChar = localStorage.getItem("gym-rpg-char");
    const savedDate = localStorage.getItem("gym-rpg-date");
    if (savedChar) setCharacter(JSON.parse(savedChar));
    if (savedDate) setLastTraining(savedDate);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("gym-rpg-char", JSON.stringify(character));
      localStorage.setItem("gym-rpg-date", lastTraining);
    }
  }, [character, lastTraining, isLoaded]);

  const train = () => {
    if (lastTraining === today()) return;
    setCharacter(applyTraining(character));
    setLastTraining(today());
  };

  const isTrainedToday = lastTraining === today();

  const getProgress = (val) => (val % 10) * 10; 

  if (!isLoaded) return <div className="bg-slate-900 min-h-screen" />;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
        <h1 className="text-3xl font-black mb-8 text-center text-blue-500">
          Gym RPG
        </h1>

        <div className="space-y-6 mb-10">
          <StatRow label="Fuerza" value={character.strength} color="bg-blue-500" progress={getProgress(character.strength)} />
          <StatRow label="Resistencia" value={character.endurance} color="bg-emerald-500" progress={getProgress(character.endurance)} />
          <StatRow label="Disciplina" value={character.discipline} color="bg-purple-500" progress={getProgress(character.discipline)} />
        </div>

        <button
          onClick={train}
          disabled={isTrainedToday}
          className={`w-full py-5 rounded-2xl font-bold transition-all transform ${
            isTrainedToday
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {isTrainedToday ? "A ver que tal mañana fiera" : "He ido al gym hoy"}
        </button>
      </div>
    </main>
  );
}

function StatRow({ label, value, color, progress }) {
  return (
    <div>
      <div className="flex justify-between mb-2 items-end">
        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</span>
        <span className="font-mono text-xl font-bold">{value.toFixed(2)}</span>
      </div>
      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
        <div 
          className={`${color} h-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.5)]`} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}