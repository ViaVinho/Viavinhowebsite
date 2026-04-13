"use client";

import { useState } from "react";
import { Supplier, SupplierFormData, REGIONS, SUPPLIER_TYPES, PRICING_MODELS } from "@/lib/types";

interface Props {
  supplier?: Supplier;
  onSubmit: (data: SupplierFormData) => Promise<void>;
  onCancel: () => void;
}

const EMPTY_FORM: SupplierFormData = {
  name: "",
  region: "Lisbon",
  type: "Winery",
  basePrice: 0,
  pricingModel: "per person",
  minGuests: 1,
  maxGuests: 20,
  blurb: "",
  internalNotes: "",
  contactInfo: "",
};

export default function SupplierForm({ supplier, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<SupplierFormData>(
    supplier
      ? {
          name: supplier.name,
          region: supplier.region,
          type: supplier.type,
          basePrice: supplier.basePrice,
          pricingModel: supplier.pricingModel,
          minGuests: supplier.minGuests,
          maxGuests: supplier.maxGuests,
          blurb: supplier.blurb,
          internalNotes: supplier.internalNotes,
          contactInfo: supplier.contactInfo,
        }
      : EMPTY_FORM
  );
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "basePrice" || name === "minGuests" || name === "maxGuests"
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(form);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent";
  const labelClass = "block text-sm font-medium text-zinc-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div>
        <label className={labelClass}>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Region</label>
          <select name="region" value={form.region} onChange={handleChange} className={inputClass}>
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Type</label>
          <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
            {SUPPLIER_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Base Price (€)</label>
          <input
            name="basePrice"
            type="number"
            min={0}
            step={0.01}
            value={form.basePrice}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Pricing Model</label>
          <select name="pricingModel" value={form.pricingModel} onChange={handleChange} className={inputClass}>
            {PRICING_MODELS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={labelClass}>Min Guests</label>
            <input
              name="minGuests"
              type="number"
              min={1}
              value={form.minGuests}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Max Guests</label>
            <input
              name="maxGuests"
              type="number"
              min={1}
              value={form.maxGuests}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass}>Short Blurb (client-facing)</label>
        <textarea
          name="blurb"
          value={form.blurb}
          onChange={handleChange}
          rows={2}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Internal Notes</label>
        <textarea
          name="internalNotes"
          value={form.internalNotes}
          onChange={handleChange}
          rows={2}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Contact Info</label>
        <textarea
          name="contactInfo"
          value={form.contactInfo}
          onChange={handleChange}
          rows={2}
          className={inputClass}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 bg-zinc-900 text-white text-sm rounded-lg hover:bg-zinc-800 disabled:opacity-50 transition-colors"
        >
          {saving ? "Saving..." : supplier ? "Update Supplier" : "Add Supplier"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 border border-zinc-300 text-sm rounded-lg hover:bg-zinc-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
