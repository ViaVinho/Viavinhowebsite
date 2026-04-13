export const REGIONS = ["Lisbon", "Douro", "Alentejo", "Setúbal", "Other"] as const;
export type Region = (typeof REGIONS)[number];

export const SUPPLIER_TYPES = ["Winery", "Restaurant", "Guide", "Transport", "Experience"] as const;
export type SupplierType = (typeof SUPPLIER_TYPES)[number];

export const PRICING_MODELS = ["per person", "flat fee"] as const;
export type PricingModel = (typeof PRICING_MODELS)[number];

export interface Supplier {
  id: string;
  name: string;
  region: Region;
  type: SupplierType;
  basePrice: number;
  pricingModel: PricingModel;
  minGuests: number;
  maxGuests: number;
  blurb: string;
  internalNotes: string;
  contactInfo: string;
  createdAt: number;
  updatedAt: number;
}

export type SupplierFormData = Omit<Supplier, "id" | "createdAt" | "updatedAt">;
