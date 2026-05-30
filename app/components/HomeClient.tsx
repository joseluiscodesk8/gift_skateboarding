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
  const [showForm, setShowForm] =
    useState(false);

  const participants =
    useRaffleStore(
      (s) => s.participants
    );

  const drawWinner =
    useRaffleStore(
      (s) => s.drawWinner
    );

  const winner =
    useRaffleStore(
      (s) => s.winner
    );

  const setWinner =
    useRaffleStore(
      (s) => s.setWinner
    );

  const currentIndex =
    useRaffleStore(
      (s) => s.currentIndex
    );

  const setCurrentIndex =
    useRaffleStore(
      (s) => s.setCurrentIndex
    );

  const isDrawing =
    useRaffleStore(
      (s) => s.isDrawing
    );

  const setIsDrawing =
    useRaffleStore(
      (s) => s.setIsDrawing
    );

  const handleDraw =
    async () => {
      if (
        isDrawing ||
        !participants.length
      ) {
        return;
      }

      setWinner(null);

      setIsDrawing(true);

      const interval =
        setInterval(() => {
          setCurrentIndex(
            (currentIndex +
              Math.floor(
                Math.random() * 1000
              )) %
              participants.length
          );
        }, 100);

      setTimeout(() => {
        clearInterval(interval);

        drawWinner();

        setTimeout(() => {
          const finalWinner =
            useRaffleStore.getState()
              .winner;

          if (!finalWinner) {
            setIsDrawing(false);

            return;
          }

          const winnerIndex =
            participants.findIndex(
              (participant) =>
                participant.name ===
                finalWinner.participantName
            );

          if (
            winnerIndex >= 0
          ) {
            setCurrentIndex(
              winnerIndex
            );
          }

          setIsDrawing(false);
        }, 50);
      }, 4000);
    };

  return (
    <main className={styles.home}>
      <h1 className={styles.title}>
        Gift Skate Or Die
      </h1>

      <RaffleConfig />

      <NumberGrid />

      <button
        className={
          styles.addButton
        }
        onClick={() =>
          setShowForm(
            !showForm
          )
        }
      >
        +
      </button>

      <div
        className={
          styles.actions
        }
      >
        <button
          onClick={
            handleDraw
          }
          disabled={
            isDrawing
          }
        >
          {isDrawing
            ? "Sorteando..."
            : "Sortear"}
        </button>
      </div>

      {showForm && (
        <ParticipantForm
          onSaved={() =>
            setShowForm(
              false
            )
          }
        />
      )}

      <ParticipantList />

      <WinnerModal />
    </main>
  );
}