"use client";

import { useRaffleStore } from "../store/raffleStore";

export default function RaffleConfig() {
  const maxNumbers = useRaffleStore(
    (s) => s.maxNumbers
  );

  const setMaxNumbers = useRaffleStore(
    (s) => s.setMaxNumbers
  );

  return (
    <div className="space-y-2">
      <label className="font-bold">
        Cantidad de números
      </label>

      <select
        value={maxNumbers}
        onChange={(e) =>
          setMaxNumbers(Number(e.target.value))
        }
        className="border p-2 rounded"
      >
        <option value={100}>100</option>
        <option value={200}>200</option>
        <option value={500}>500</option>
      </select>
    </div>
  );
}
