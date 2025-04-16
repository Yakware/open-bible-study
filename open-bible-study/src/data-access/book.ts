import { db } from "@/lib/db";
import { books, versions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

const revalidate = 3600;

export async function getBooksByVersion(versionName: string) {
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
