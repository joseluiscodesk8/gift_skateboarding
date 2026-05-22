import { create } from "zustand";
import { Participant, Winner } from "../types/raffles";

type RaffleStore = {
  winner: Winner | null;
  maxNumbers: number;
  participants: Participant[];
  setWinner: (
  winner: Winner | null
) => void;

  setMaxNumbers: (value: number) => void;

  addParticipant: (name: string, numbers: number[], photo?: string) => void;

  drawWinner: () => void;

  resetRaffle: () => void;
};

export const useRaffleStore = create<RaffleStore>((set, get) => ({
  maxNumbers: 100,

  participants: [],

  winner: null,

  setWinner: (winner) =>
  set({ winner }),

  setMaxNumbers: (value) => set({ maxNumbers: value }),

  addParticipant: (name: string, numbers: number[], photo?: string) => {
    const participants = get().participants;

    const maxNumbers = get().maxNumbers;

    // validar rango
    const invalidNumber = numbers.find((n: number) => isNaN(n) || n < 1 || n > maxNumbers);

    if (invalidNumber) {
      alert(`Número ${invalidNumber} fuera del rango`);
      return;
    }

    // numeros ya usados
    const allUsedNumbers = participants.flatMap((p) => p.numbers);

    const duplicated = numbers.find((n: number) => allUsedNumbers.includes(n));

    if (duplicated) {
      alert(`Número ${duplicated} ya usado`);
      return;
    }

    const newParticipant: Participant = {
      id: String(Date.now()) + Math.random().toString(36).slice(2, 9),
      name,
      numbers,
    };

    set({ participants: [...participants, newParticipant] });
  },

  drawWinner: () => {
    const participants = get().participants;

    const tickets = participants.flatMap((participant) =>
      participant.numbers.map((number) => ({
        participantName: participant.name,
        winningNumber: number,
        photo: participant.photo,
      }))
    );

    if (!tickets.length) {
      alert("No hay participantes");
      return;
    }

    const randomIndex =
      crypto.getRandomValues(new Uint32Array(1))[0] % tickets.length;

    set({
      winner: tickets[randomIndex],
    });
  },

  resetRaffle: () =>
    set({
      participants: [],
      winner: null,
    }),
}));
