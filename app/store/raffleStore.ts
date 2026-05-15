import { create } from "zustand";
import { Participant, Winner } from "../types/raffles";

type RaffleStore = {
  maxNumbers: number;
  participants: Participant[];
  winner: Winner | null;

  setMaxNumbers: (value: number) => void;

addParticipant: (
  name: string,
  numbers: number[],
  photo?: string
) => void;

  drawWinner: () => void;

  resetRaffle: () => void;
};

export const useRaffleStore = create<RaffleStore>((set, get) => ({
  maxNumbers: 100,

  participants: [],

  winner: null,

  setMaxNumbers: (value) => set({ maxNumbers: value }),

  addParticipant: (name, numbers, photo) => {
    const participants = get().participants;
    const maxNumbers = get().maxNumbers;

    const cleanName = name.trim();

    if (!cleanName) {
      alert("Debes ingresar un nombre");
      return;
    }

    if (!numbers.length) {
      alert("Debes ingresar al menos un número");
      return;
    }

    const invalidNumber = numbers.find(
      (n) => isNaN(n) || n < 1 || n > maxNumbers
    );

    if (invalidNumber) {
      alert(`El número ${invalidNumber} está fuera del rango permitido`);
      return;
    }

    const uniqueNumbers = new Set(numbers);

    if (uniqueNumbers.size !== numbers.length) {
      alert("Hay números repetidos");
      return;
    }

    const usedNumbers = participants.flatMap((p) => p.numbers);

    const duplicated = numbers.find((n) => usedNumbers.includes(n));

    if (duplicated) {
      alert(`Número ${duplicated} ya usado`);
      return;
    }

    set({
      participants: [
        ...participants,
        {
          id: crypto.randomUUID(),
          name: cleanName,
          numbers,
          photo,
        },
      ],
    });
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
