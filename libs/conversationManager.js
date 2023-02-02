import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "../conversations.json");

const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();

function getCID(number) {
  try {
    db.read();
    var bucket = db.data[number];

    if (bucket) {
      return bucket;
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

function setCID(number, data) {
  try {
    db.data[number] = data;
    db.write();

    return data;
  } catch (error) {
    return false;
  }
}

export { getCID, setCID };
