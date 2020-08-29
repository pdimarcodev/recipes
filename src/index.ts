import "reflect-metadata";
import { createConnection } from 'typeorm';
import { startServer } from './app';

async function main () {
     createConnection();
     const app = await startServer();
     app.listen(3000);
     console.log('Server on port ', 3000);
     
}

main();
