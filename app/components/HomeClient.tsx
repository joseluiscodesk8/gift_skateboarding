"use client";

import { useState } from "react";

import RaffleConfig from "../components/RaffleConfig";
import ParticipantForm from "../components/ParticipantForm";
import ParticipantList from "../components/ParticipantList";
import WinnerModal from "../components/WinnerModal";
import NumberGrid from "../components/NumberGrid";

import { useRaffleStore } from "../store/raffleStore";

import styles from "../styles/index.module.scss";

export default function HomeClient() {
  const [showForm, setShowForm] = useState(false);

  const drawWinner = useRaffleStore((s) => s.drawWinner);


  return (
    <main className={styles.home}>
      <h1 className={styles.title}>Gift Skate Or Die</h1>

      <RaffleConfig />
      <NumberGrid />

      <button
        className={styles.addButton}
        onClick={() => setShowForm(!showForm)}
      >
        +
      </button>

      <div className={styles.actions}>
        <button onClick={drawWinner}>Sortear</button>
      </div>

      {showForm && <ParticipantForm onSaved={() => setShowForm(false)} />}

      <ParticipantList />

      <WinnerModal />
    </main>
  );
}
