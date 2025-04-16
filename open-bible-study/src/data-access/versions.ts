import { db } from "@/lib/db";
import { versions } from "@/lib/db/schema";
import { unstable_cache } from "next/cache";

const revalidate = 3600;

export async function getVersions() {
  const cachedData = unstable_cache(
    async () => {
      const data = await db.select().from(versions);

      return data;
    },
    [],
    { revalidate }
  );

  return cachedData();
}
