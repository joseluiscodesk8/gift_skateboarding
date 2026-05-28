"use client";

import { useState } from "react";

import { useRaffleStore } from "../store/raffleStore";

import styles from "../styles/index.module.scss";

export default function RaffleConfig() {
  const maxNumbers = useRaffleStore(
    (s) => s.maxNumbers
  );

  const setMaxNumbers = useRaffleStore(
    (s) => s.setMaxNumbers
  );

  const [open, setOpen] = useState(false);

  const options = [600, 200, 100];

  const handleSelect = (value: number) => {
    setMaxNumbers(value);

    setOpen(false);
  };

  return (
    <div className={styles.configWrapper}>
      <button
        className={styles.configButton}
        onClick={() => setOpen(!open)}
      >
        ⚙ {maxNumbers}
      </button>

      {open && (
        <div className={styles.configMenu}>
          {options.map((option) => (
            <button
              key={option}
              onClick={() =>
                handleSelect(option)
              }
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}