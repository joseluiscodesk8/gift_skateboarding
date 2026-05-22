"use client";

import { useRaffleStore } from "../store/raffleStore";

import styles from "../styles/index.module.scss";

export default function WinnerModal() {
  const winner = useRaffleStore(
    (s) => s.winner
  );

  const setWinner = useRaffleStore(
    (s) => s.setWinner
  );

  if (!winner) return null;

  return (
    <div
      className={styles.winnerOverlay}
      onClick={() => setWinner(null)}
    >
      <div
        className={styles.winnerModal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={() => setWinner(null)}
        >
          ✕
        </button>

        <h2>🎉 Ganador</h2>

        <h3>{winner.participantName}</h3>

        <p>
          Número ganador:
          {" "}
          #{winner.winningNumber}
        </p>
      </div>
    </div>
  );
}