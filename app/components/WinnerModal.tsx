"use client";

import { useRaffleStore } from "../store/raffleStore";
import styles from "../styles/index.module.scss"

export default function WinnerModal() {
  const winner = useRaffleStore(
    (s) => s.winner
  );

  if (!winner) return null;

  return (
    <div className={styles.winnerOverlay}>
      <div className={styles.winnerModal}>
        <h2 className="text-2xl font-bold">
          🎉 Ganador
        </h2>

        {winner.photo && (
<div className={styles.winnerAvatar}>
  <img
    src={winner.photo}
    alt={winner.participantName}
    className="w-full h-full object-cover"
  />
</div>
)}

        <p className="mt-4">
          {winner.participantName}
        </p>

        <p>
          Número: {winner.winningNumber}
        </p>
      </div>
    </div>
  );
}
