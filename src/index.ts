import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { join, normalize } from 'path';

export function findConfig(name: string, limit: number) {
  let path = process.cwd();

  for (let i = 0; i < limit; i++) {
    let exists = false;

    try {
      exists = existsSync(join(path, name));
    } catch(e) {
      break;
    }

    if (exists) {
      return join(path, name);
    } else {
      path = normalize(join(path, '..'));
    }
  }
}

export default function config(name: string = '.env', limit: number = 2) {
  const path = findConfig(name, limit);

  if (path) return dotenv.config({ path });
}