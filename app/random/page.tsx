"use client";
import { useState, useEffect } from "react";
import { LootItem } from "@prisma/client";
export default function Page() {
  const [loading, setLoading] = useState(false);
  const [loot, setLoot] = useState<LootItem | undefined>();
  const [timeOutRunning, setTimeOutRunning] = useState(false);
  const getRandomLoot = (lootTable: LootItem[]): LootItem => {
    return lootTable[Math.floor(Math.random() * lootTable.length)];
  };

  const getLoot = async () => {
    setLoading(true);
    const res = await fetch("/api/table-crud/get-selected");
    const data = await res.json();
    setLoot(getRandomLoot(data));
    setLoading(false);
    if (timeOutRunning) {
      return;
    }
    setTimeOutRunning(true);
    setTimeout(() => {
      setLoot(undefined);
      setTimeOutRunning(false);
    }, 10000);
  };

  return (
    <div>
      <button onClick={getLoot}>Get Loot</button>
      {loading && <p>Loading...</p>}
      {loot && (
        <div>
          <h1>{loot.name}</h1>
          <p>{loot.description}</p>
        </div>
      )}
    </div>
  );
}
