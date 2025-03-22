import { syncDataToPostgres } from "./utils/syncToPostgres";

async function main() {
  await syncDataToPostgres();
}

main();
