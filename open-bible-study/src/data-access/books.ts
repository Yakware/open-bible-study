import { db } from "@/lib/db";
import { Book, books, versions } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

const revalidate = 3600;

export async function getBooks(versionName: string): Promise<Book[]> {
  if (!versionName) {
    return [];
  }

  const cachedData = unstable_cache(
    async (versionName: string) => {
      const data = await db
        .select({
          id: books.id,
          name: books.name,
          versionId: books.versionId,
          abbreviation: books.abbreviation,
          position: books.position,
          testament: books.testament,
          createdAt: books.createdAt,
          updatedAt: books.updatedAt,
        })
        .from(books)
        .innerJoin(versions, eq(books.versionId, versions.id))
        .where(eq(versions.name, versionName))
        .orderBy(books.position);

      return data;
    },
    [],
    { revalidate }
  );

  return cachedData(versionName);
}

export async function getBook(
  versionName: string,
  bookName: string
): Promise<Book | null> {
  if (!versionName || !bookName) {
    return null;
  }

  const cachedData = unstable_cache(
    async (versionName: string, bookName: string) => {
      const [data] = await db
        .select({
          id: books.id,
          name: books.name,
          versionId: books.versionId,
          abbreviation: books.abbreviation,
          position: books.position,
          testament: books.testament,
          createdAt: books.createdAt,
          updatedAt: books.updatedAt,
        })
        .from(books)
        .innerJoin(versions, eq(books.versionId, versions.id))
        .where(and(eq(versions.name, versionName), eq(books.name, bookName)))
        .limit(1);

      return data;
    },
    [],
    { revalidate }
  );

  return cachedData(versionName, bookName);
}
