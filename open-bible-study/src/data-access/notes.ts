import { db } from "@/lib/db";
import { InsertNote, notes } from "@/lib/db/schema";

export async function createNote(newNote: InsertNote) {
  await db.insert(notes).values(newNote);
}
