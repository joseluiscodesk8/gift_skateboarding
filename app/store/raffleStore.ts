import { create } from "zustand";

import { persist } from "zustand/middleware";

type Participant = {
  id: string;
  name: string;
  numbers: number[];
};

type Winner = {
  participantName: string;
  winningNumber: number;
};

type RaffleStore = {
  maxNumbers: number;

  participants: Participant[];

  winner: Winner | null;

  setWinner: (
    winner: Winner | null
  ) => void;

  setMaxNumbers: (
    value: number
  ) => void;

  addParticipant: (
    name: string,
    numbers: number[]
  ) => void;

  removeParticipant: (
    participantId: string
  ) => void;

  drawWinner: () => void;

};

export const useRaffleStore =
  create<RaffleStore>()(
    persist(
      (set, get) => ({
        maxNumbers: 100,

        participants: [],

        winner: null,

        setWinner: (winner) =>
          set({ winner }),

        setMaxNumbers: (value) =>
          set({ maxNumbers: value }),

        addParticipant: (
          name,
          numbers
        ) => {
          const participants =
            get().participants;

          const maxNumbers =
            get().maxNumbers;

          const cleanName =
            name.trim();

          if (!cleanName) {
            alert(
              "Debes ingresar un nombre"
            );

            return;
          }

          if (!numbers.length) {
            alert(
              "Debes ingresar al menos un número"
            );

            return;
          }

          const invalidNumber =
            numbers.find(
              (n) =>
                isNaN(n) ||
                n < 1 ||
                n > maxNumbers
            );

          if (invalidNumber) {
            alert(
              `El número ${invalidNumber} está fuera del rango`
            );

            return;
          }

          const usedNumbers =
            participants.flatMap(
              (p) => p.numbers
            );

          const duplicated =
            numbers.find((n) =>
              usedNumbers.includes(n)
            );

          if (duplicated) {
            alert(
              `Número ${duplicated} ya usado`
            );

            return;
          }

          set({
            participants: [
              ...participants,
              {
                id: crypto.randomUUID(),

                name: cleanName,

                numbers,
              },
            ],
          });
        },

        removeParticipant: (
          participantId
        ) => {
          const participants =
            get().participants;

          set({
            participants:
              participants.filter(
                (participant) =>
                  participant.id !==
                  participantId
              ),
          });
        },

        drawWinner: () => {
          const participants =
            get().participants;

          const tickets =
            participants.flatMap(
              (participant) =>
                participant.numbers.map(
                  (number) => ({
                    participantName:
                      participant.name,

                    winningNumber:
                      number,
                  })
                )
            );

          if (!tickets.length) {
            alert(
              "No hay participantes"
            );

            return;
          }

          const randomIndex =
            crypto.getRandomValues(
              new Uint32Array(1)
            )[0] % tickets.length;

          set({
            winner:
              tickets[randomIndex],
          });
        },
      }),

      {
        name: "raffle-storage",
      }
    )
  );