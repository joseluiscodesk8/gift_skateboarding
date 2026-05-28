"use client";

import { useState } from "react";

import { useRaffleStore } from "../store/raffleStore";

import styles from "../styles/index.module.scss";

export default function NumberGrid() {
  const [open, setOpen] =
    useState(false);

  const maxNumbers = useRaffleStore(
    (s) => s.maxNumbers
  );

  const participants = useRaffleStore(
    (s) => s.participants
  );

  const selectedNumbers =
    participants.flatMap(
      (p) => p.numbers
    );

  const numbers = Array.from(
    { length: maxNumbers },
    (_, i) => i + 1
  );

  return (
    <>
      {!open && (
        <button
          className={styles.gridToggle}
          onClick={() => setOpen(true)}
        >
          #
        </button>
      )}

      {open && (
        <div className={styles.gridOverlay}>
          <button
            className={styles.gridClose}
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          <div className={styles.numberGrid}>
            {numbers.map((number) => {
              const selected =
                selectedNumbers.includes(
                  number
                );

              return (
                <div
                  key={number}
                  className={`${styles.numberItem} ${
                    selected
                      ? styles.selected
                      : ""
                  }`}
                >
                  {number}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}