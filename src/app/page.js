"use client"; 

import Image from "next/image";
import { useState } from "react"; 
import { today } from "./logic/DateUtils";
import { applyTraining } from "./logic/Progression";

export default function Home() {
  const [character, setCharacter] = useState({
    strength: 1,
    endurance: 1,
    discipline: 1,
  });

  const [lastTraining, setLastTraining] = useState(null);

  const isTrainedToday = lastTraining === today();

  const train = () => {
    if (isTrainedToday) return;

    setCharacter(applyTraining(character));
    setLastTraining(today());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Gym RPG</h1>

        <div className="space-y-4 mb-8 text-xl">
          <p>Fuerza: {character.strength.toFixed(2)}</p>
          <p>Resistencia: {character.endurance.toFixed(2)}</p>
          <p>Disciplina: {character.discipline.toFixed(2)}</p>
        </div>

        <button
          onClick={train}
          disabled={isTrainedToday}
          className={`px-8 py-4 rounded-full font-bold transition-all ${
            isTrainedToday
              ? "bg-slate-700 text-slate-500 cursor-not-allowed opacity-60"
              : "bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-lg shadow-blue-500/20"
          }`}
        >
          {isTrainedToday ? "Entrenamiento completado" : "He ido al gym hoy"}
        </button>
      </div>

    </div>
  );
}
