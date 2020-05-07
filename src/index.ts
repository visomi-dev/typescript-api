import server from './server';
import documentation from './documentation';
import mongoose from './db/mongoose';

async function main(): Promise<void> {
  await documentation();
  await mongoose();
  await server();
}

main();
