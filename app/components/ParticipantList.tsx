"use client";

import { useRaffleStore } from "../store/raffleStore";
import styles from "../styles/index.module.scss"

export default function ParticipantList() {
  const participants = useRaffleStore(
    (s) => s.participants
  );

  return (
    <div className={styles.participantList}>
      {participants.map((participant) => (
        <div
  key={participant.id}
  className={styles.participantCard}
>
  {participant.photo && (
  <div className={styles.participantAvatar}>
  <img
    src={participant.photo}
    alt={participant.name}
    className="w-full h-full object-cover"
  />
</div>
  )}

  <h3 className="font-bold">
    {participant.name}
  </h3>

  <p>
    {participant.numbers.join(", ")}
  </p>
</div>
      ))}
    </div>
  );
}
