"use client";

import RaffleConfig from "../components/RaffleConfig";
import ParticipantForm from "../components/ParticipantForm";
import ParticipantList from "../components/ParticipantList";
import WinnerModal from "../components/WinnerModal";

import { useRaffleStore } from "../store/raffleStore";

export default function HomeClient() {
  const drawWinner = useRaffleStore(
    (s) => s.drawWinner
  );

  const resetRaffle = useRaffleStore(
    (s) => s.resetRaffle
  );

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold">
        Gift Skate Or Die
      </h1>

      <RaffleConfig />

      <ParticipantForm />

      <div className="flex gap-3">
        <button
          onClick={drawWinner}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Sortear
        </button>

        <button
          onClick={resetRaffle}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Reiniciar
        </button>
      </div>

      <ParticipantList />

      <WinnerModal />
    </main>
  );
}
