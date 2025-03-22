import { syncBooksToSupabase } from "./utils/supabase";

async function main() {
  await syncBooksToSupabase();
}

main();
