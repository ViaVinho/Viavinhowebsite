"use client";

import { Supplier } from "@/lib/types";

interface Props {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: string) => void;
}

export default function SupplierTable({ suppliers, onEdit, onDelete }: Props) {
  if (suppliers.length === 0) {
    return (
      <div className="text-center py-16 text-zinc-400">
        <p className="text-lg">No suppliers yet</p>
        <p className="text-sm mt-1">Add your first supplier to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-zinc-500">
            <th className="pb-3 pr-4 font-medium">Name</th>
            <th className="pb-3 pr-4 font-medium">Region</th>
            <th className="pb-3 pr-4 font-medium">Type</th>
            <th className="pb-3 pr-4 font-medium">Base Price</th>
            <th className="pb-3 pr-4 font-medium">Pricing</th>
            <th className="pb-3 pr-4 font-medium">Guests</th>
            <th className="pb-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
              <td className="py-3 pr-4 font-medium text-zinc-900">{s.name}</td>
              <td className="py-3 pr-4 text-zinc-600">{s.region}</td>
              <td className="py-3 pr-4">
                <span className="inline-block bg-zinc-100 text-zinc-700 text-xs px-2 py-0.5 rounded-full">
                  {s.type}
                </span>
              </td>
              <td className="py-3 pr-4 text-zinc-600">€{s.basePrice.toFixed(2)}</td>
              <td className="py-3 pr-4 text-zinc-500 text-xs">{s.pricingModel}</td>
              <td className="py-3 pr-4 text-zinc-500 text-xs">
                {s.minGuests}–{s.maxGuests}
              </td>
              <td className="py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(s)}
                    className="text-xs text-zinc-600 hover:text-zinc-900 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${s.name}"?`)) onDelete(s.id);
                    }}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
