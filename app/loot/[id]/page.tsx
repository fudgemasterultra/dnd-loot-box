"use client";
import { useState, useEffect, use } from "react";
import { LootTable, LootItem } from "@prisma/client";
import { Types } from "@/types/types";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [table, setTable] = useState<LootTable | null>(null);
  const [items, setItems] = useState<LootItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [tableName, setTableName] = useState("");
  const [tableDescription, setTableDescription] = useState("");

  const changeTableInfo = async () => {
    const res = await fetch("/api/table-crud/update", {
      method: "POST",
      body: JSON.stringify({
        id: Number(id),
        name: tableName,
        description: tableDescription,
      }),
    });
    const data: { table: LootTable } = await res.json();
    if (res.status !== 200) {
      alert("Table update failed");
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/table-crud/read", {
        method: "POST",
        body: JSON.stringify({
          id: Number(id),
        }),
      });
      const data: { table: LootTable; lootItems: LootItem[] } =
        await res.json();
      setTable(data.table);
      setItems(data.lootItems);
      setTableName(data.table.name);
      setTableDescription(data.table.description);
    })();
  }, []);
  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col justify-center content-center w-screen">
        <div>
          <p className="text-black">Loot Table</p>
          <input
            type="text"
            className="border-2 text-black border-gray-300"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
        </div>
        <div>
          <p className="text-black">Table Description</p>
          <input
            type="text"
            className="border-2 text-black border-gray-300"
            value={tableDescription}
            onChange={(e) => setTableDescription(e.target.value)}
          />
        </div>
        <button
          className="bg-slate-500 text-white px-4 py-2 rounded"
          onClick={changeTableInfo}
        >
          Update
        </button>
      </div>
      <div className="my-3">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Name
                </p>
              </th>

              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Description
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Actions
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr key={item.id} className="hover:bg-slate-50 bg-white">
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">{item.name}</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      {item.description}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <button
                      className="bg-slate-500 text-white px-4 py-2 rounded"
                      onClick={() => {
                        fetch("/api/loot-crud/delete", {
                          method: "POST",
                          body: JSON.stringify({
                            id: item.id,
                          }),
                        }).then(() => {
                          setItems((prev) =>
                            prev.filter((i) => i.id !== item.id)
                          );
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            <td className="bg-gray-500">
              <input
                type="text"
                className="border-2 text-black border-gray-300"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <input
                type="text"
                className="border-2 text-black border-gray-300"
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
              />
              <button
                className="bg-slate-500 text-white px-4 py-2 rounded"
                onClick={async () => {
                  const res = await fetch("/api/loot-crud/create", {
                    method: "POST",
                    body: JSON.stringify({
                      name: newItemName,
                      description: newItemDescription,
                      lootTableId: Number(id),
                    }),
                  });
                  const data: LootItem = await res.json();
                  setItems((prev) => [...prev, data]);
                  setNewItemName("");
                  setNewItemDescription("");
                }}
              >
                Create
              </button>
            </td>
          </tbody>
        </table>
      </div>
      <a href="/" className=" text-black bg-green-600 py-3 px-5">
        Back
      </a>
    </div>
  );
}
