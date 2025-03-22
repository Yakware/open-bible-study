const { SUPABASE_URL, SUPABASE_API_KEY } = process.env;

if (typeof SUPABASE_URL !== "string" || typeof SUPABASE_API_KEY !== "string") {
  throw new Error(
    `Missing environment variables: SUPABASE_URL: ${Boolean(
      SUPABASE_URL
    )}, SUPABASE_API_KEY: ${Boolean(SUPABASE_API_KEY)}`
  );
}

export { SUPABASE_URL, SUPABASE_API_KEY };
