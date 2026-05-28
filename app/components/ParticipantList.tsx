"use client";

import { useRef } from "react";

import { useRaffleStore } from "../store/raffleStore";

import styles from "../styles/index.module.scss";

export default function ParticipantList() {
  const participants = useRaffleStore(
    (s) => s.participants
  );

  const removeParticipant =
    useRaffleStore(
      (s) => s.removeParticipant
    );

  const timerRef = useRef<
    NodeJS.Timeout | undefined
  >(undefined);

  const startPress = (
    participantId: string,
    participantName: string
  ) => {
    timerRef.current = setTimeout(() => {
      const confirmed = confirm(
        `¿Eliminar a ${participantName}?`
      );

      if (confirmed) {
        removeParticipant(participantId);
      }
    }, 700);
  };

  const cancelPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <div className={styles.participantList}>
      {participants.map((participant) => (
        <div
          key={participant.id}
          className={styles.card}
          onTouchStart={() =>
            startPress(
              participant.id,
              participant.name
            )
          }
          onTouchEnd={cancelPress}
          onTouchMove={cancelPress}
          onMouseDown={() =>
            startPress(
              participant.id,
              participant.name
            )
          }
          onMouseUp={cancelPress}
          onMouseLeave={cancelPress}
        >
          <h3>{participant.name}</h3>

          <div className={styles.numbers}>
            {participant.numbers.map(
              (number, index) => (
                <span
                  key={`${participant.id}-${number}-${index}`}
                >
                  {number}
                </span>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}