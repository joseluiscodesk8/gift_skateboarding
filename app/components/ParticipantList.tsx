"use client";

import { useState } from "react";

import { useRaffleStore } from "../store/raffleStore";

import styles from "../styles/index.module.scss";

export default function ParticipantList() {
  const participants = useRaffleStore((s) => s.participants);

  const _store = useRaffleStore();
  const addNumbersToParticipant =
    (_store as any).addNumbersToParticipant ?? (() => {});

  const [openCard, setOpenCard] = useState<string | null>(null);

  const [newNumbers, setNewNumbers] = useState("");

  const handleAddNumbers = (participantId: string) => {
    const parsedNumbers = newNumbers
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n));

    addNumbersToParticipant(participantId, parsedNumbers);

    setNewNumbers("");

    setOpenCard(null);
  };

  return (
    <div className={styles.participantList}>
      {participants.map((participant) => (
        <div key={participant.id} className={styles.card}>
          <button
            className={styles.cardAddButton}
            onClick={() =>
              setOpenCard(openCard === participant.id ? null : participant.id)
            }
          >
            +
          </button>

          <h3>{participant.name}</h3>

          <div className={styles.numbers}>
            {participant.numbers.map((number, index) => (
              <span key={`${participant.id}-${number}-${index}`}>{number}</span>
            ))}
          </div>

          {openCard === participant.id && (
            <div className={styles.addNumbersBox}>
              <input
                type="text"
                placeholder="Ej: 10,11"
                value={newNumbers}
                onChange={(e) => setNewNumbers(e.target.value)}
              />

              <button onClick={() => handleAddNumbers(participant.id)}>
                Agregar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
