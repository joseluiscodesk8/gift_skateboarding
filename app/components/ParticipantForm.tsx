"use client";

import { useState } from "react";
import { useRaffleStore } from "../store/raffleStore";
import styles from "../styles/index.module.scss"

export default function ParticipantForm() {
  const addParticipant = useRaffleStore(
    (s) => s.addParticipant
  );

  const maxNumbers = useRaffleStore(
    (s) => s.maxNumbers
  );

  const [name, setName] = useState("");
  const [numbers, setNumbers] = useState("");
  const [photo, setPhoto] = useState<
    string | undefined
  >();

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const parsedNumbers = numbers
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n));

    addParticipant(
      name,
      parsedNumbers,
      photo
    );

    setName("");
    setNumbers("");
    setPhoto(undefined);
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
        className="border p-2 rounded w-full"
      />

      <input
        type="text"
        placeholder={`Números entre 1 y ${maxNumbers}`}
        value={numbers}
        onChange={(e) =>
          setNumbers(e.target.value)
        }
        className="border p-2 rounded w-full"
      />

      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImage}
        className="w-full"
      />

      {photo && (
  <div className={styles.previewImage}>
    <img
      src={photo}
      alt="preview"
      className="w-full h-full object-cover"
    />
  </div>
)}

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Agregar participante
      </button>
    </div>
  );
}