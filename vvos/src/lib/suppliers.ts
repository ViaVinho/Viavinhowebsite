import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { Supplier, SupplierFormData } from "./types";

const COLLECTION = "suppliers";

export async function getSuppliers(): Promise<Supplier[]> {
  const q = query(collection(db, COLLECTION), orderBy("name"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Supplier));
}

export async function addSupplier(data: SupplierFormData): Promise<string> {
  const now = Date.now();
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
}

export async function updateSupplier(id: string, data: SupplierFormData): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, { ...data, updatedAt: Date.now() });
}

export async function deleteSupplier(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
