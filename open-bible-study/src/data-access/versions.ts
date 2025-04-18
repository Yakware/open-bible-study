import { db } from "@/lib/db";
import { Version, versions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

const revalidate = 3600;

export async function getVersions(): Promise<Version[]> {
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

export async function getVersion(versionName: string): Promise<Version | null> {
  if (!versionName) {
    return null;
  }

  const cachedData = unstable_cache(
    async (versionName: string) => {
      const [data] = await db
        .select()
        .from(versions)
        .where(eq(versions.name, versionName))
        .limit(1);

      return data;
    },
    [],
    { revalidate }
  );

  return cachedData(versionName);
}
