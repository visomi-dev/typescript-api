import server from './server';
import documentation from './documentation';

async function main(): Promise<void> {
  await documentation();
  await server();
}

main();
