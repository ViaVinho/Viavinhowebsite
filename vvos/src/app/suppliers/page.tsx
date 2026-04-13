"use client";

import { useEffect, useState, useMemo } from "react";
import { useSupplierStore } from "@/store/suppliers";
import { Supplier, SupplierFormData, REGIONS, SUPPLIER_TYPES } from "@/lib/types";
import SupplierTable from "@/components/SupplierTable";
import SupplierForm from "@/components/SupplierForm";

export default function SuppliersPage() {
  const { suppliers, loading, error, fetch, add, update, remove } = useSupplierStore();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Supplier | undefined>();
  const [search, setSearch] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetch();
  }, [fetch]);

  const filtered = useMemo(() => {
    return suppliers.filter((s) => {
      const matchesSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.blurb.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = !filterRegion || s.region === filterRegion;
      const matchesType = !filterType || s.type === filterType;
      return matchesSearch && matchesRegion && matchesType;
    });
  }, [suppliers, search, filterRegion, filterType]);

  const handleSubmit = async (data: SupplierFormData) => {
    if (editing) {
      await update(editing.id, data);
    } else {
      await add(data);
    }
    setShowForm(false);
    setEditing(undefined);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditing(supplier);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(undefined);
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Suppliers</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {suppliers.length} supplier{suppliers.length !== 1 && "s"} in database
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-zinc-900 text-white text-sm rounded-lg hover:bg-zinc-800 transition-colors"
          >
            + Add Supplier
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {showForm ? (
        <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-zinc-900 mb-5">
            {editing ? `Edit: ${editing.name}` : "Add New Supplier"}
          </h2>
          <SupplierForm supplier={editing} onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      ) : (
        <>
          {/* Search & Filter Bar */}
          <div className="flex flex-wrap gap-3 mb-6">
            <input
              type="text"
              placeholder="Search suppliers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
            />
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
            >
              <option value="">All Regions</option>
              {REGIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
            >
              <option value="">All Types</option>
              {SUPPLIER_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Supplier Table */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6">
            {loading ? (
              <div className="text-center py-12 text-zinc-400">Loading suppliers...</div>
            ) : (
              <SupplierTable suppliers={filtered} onEdit={handleEdit} onDelete={remove} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
