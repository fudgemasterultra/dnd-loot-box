"use client";
import { useState, useEffect } from "react";
import { LootTable } from "@prisma/client";

export default function Home() {
  const [tables, setTables] = useState<LootTable[]>([]);
  const [newTableName, setNewTableName] = useState("");
  const [newTableDescription, setNewTableDescription] = useState("");
  useEffect(() => {
    fetch("/api/table-crud/get-all", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setTables(data);
      });
  }, []);

  return (
    <div>
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
                Selected
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
          {tables.map((table) => (
            <tr key={table.id} className="hover:bg-slate-50 bg-white">
              <td className="p-4 border-b border-slate-200">
                <p className="block text-sm text-slate-800">{table.name}</p>
              </td>

              <td className="p-4 border-b border-slate-200">
                <p className="block text-sm text-slate-800">
                  {table.description}
                </p>
              </td>

              <td className="p-4 border-b border-slate-200">
                <p className="block text-sm text-slate-800">
                  {table.selected ? "Yes" : "No"}
                </p>
              </td>

              <td className="p-4 border-b border-slate-200">
                <button
                  className="bg-slate-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    fetch("/api/table-crud/select", {
                      method: "POST",
                      body: JSON.stringify({ id: table.id }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        setTables((prevTables) =>
                          prevTables.map((prevTable) =>
                            prevTable.id === data.id ? data : prevTable
                          )
                        );
                      });
                  }}
                >
                  Select
                </button>
                <button
                  className="bg-slate-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    fetch("/api/table-crud/delete", {
                      method: "POST",
                      body: JSON.stringify({ id: table.id }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        setTables((prevTables) =>
                          prevTables.filter(
                            (prevTable) => prevTable.id !== data.id
                          )
                        );
                      });
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr className="hover:bg-slate-50 bg-gray-500">
            <td>
              <input
                type="text"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={newTableDescription}
                onChange={(e) => setNewTableDescription(e.target.value)}
              />
            </td>
            <td></td>
            <td>
              <button
                onClick={() => {
                  fetch("/api/table-crud/create", {
                    method: "POST",
                    body: JSON.stringify({
                      name: newTableName,
                      description: newTableDescription,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      setTables((prevTables) => [...prevTables, data]);
                      setNewTableName("");
                      setNewTableDescription("");
                    });
                }}
              >
                Create
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
