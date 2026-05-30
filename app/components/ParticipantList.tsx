"use client";

import { motion } from "framer-motion";

import { useRaffleStore } from "../store/raffleStore";

import styles from "../styles/index.module.scss";

export default function ParticipantList() {
  const participants = useRaffleStore(
    (s) => s.participants
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

  const removeParticipant =
    useRaffleStore(
      (s) => s.removeParticipant
    );

  if (!participants.length) {
    return null;
  }

  const safeIndex =
    currentIndex %
    participants.length;

  const previousIndex =
    (safeIndex - 1 +
      participants.length) %
    participants.length;

  const nextIndex =
    (safeIndex + 1) %
    participants.length;

  const current =
    participants[safeIndex];

  const previous =
    participants[previousIndex];

  const next =
    participants[nextIndex];

  const handleSwipe = (
    offsetX: number
  ) => {
    if (isDrawing) return;

    if (offsetX < -80) {
      setCurrentIndex(
        (safeIndex + 1) %
          participants.length
      );
    }

    if (offsetX > 80) {
      setCurrentIndex(
        (safeIndex -
          1 +
          participants.length) %
          participants.length
      );
    }
  };

  const deleteCurrentCard = () => {
    if (isDrawing) return;

    const confirmed = confirm(
      `¿Eliminar a ${current.name}?`
    );

    if (!confirmed) return;

    removeParticipant(current.id);
  };

  return (
    <div className={styles.carousel}>
      <div
        className={
          styles.sideCardLeft
        }
      >
        <h4>{previous.name}</h4>
      </div>

      <motion.div
        drag={
          isDrawing
            ? false
            : "x"
        }
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        onDragEnd={(
          _,
          info
        ) =>
          handleSwipe(
            info.offset.x
          )
        }
        onContextMenu={(e) => {
          e.preventDefault();

          deleteCurrentCard();
        }}
        className={
          styles.mainCard
        }
      >
        <h2>{current.name}</h2>

        <div
          className={
            styles.cardNumbers
          }
        >
          {current.numbers.map(
            (
              number,
              index
            ) => (
              <span
                key={`${current.id}-${number}-${index}`}
              >
                {number}
              </span>
            )
          )}
        </div>
      </motion.div>

      <div
        className={
          styles.sideCardRight
        }
      >
        <h4>{next.name}</h4>
      </div>
    </div>
  );
}