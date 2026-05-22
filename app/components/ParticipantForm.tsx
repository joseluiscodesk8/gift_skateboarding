"use client";

import { useState } from "react";

import { useRaffleStore } from "../store/raffleStore";

import styles from "../styles/index.module.scss";

type Props = {
  onSaved: () => void;
};

export default function ParticipantForm({
  onSaved,
}: Props) {
  const addParticipant = useRaffleStore(
    (s) => s.addParticipant
  );

  const maxNumbers = useRaffleStore(
    (s) => s.maxNumbers
  );

  const [name, setName] = useState("");
  const [numbers, setNumbers] = useState("");

  const handleSubmit = () => {
    const parsedNumbers = numbers
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n));

    addParticipant(name, parsedNumbers);

    setName("");
    setNumbers("");

    // cerrar formulario
    onSaved();
  };

  return (
    <div className={styles.participantForm}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder={`Números 1-${maxNumbers}`}
        value={numbers}
        onChange={(e) =>
          setNumbers(e.target.value)
        }
      />

      <button onClick={handleSubmit}>
        Guardar
      </button>
    </div>
  );
}