import "reflect-metadata";
import { createConnection } from 'typeorm';
import { startServer } from './app';

async function main () {
    
     await createConnection();
     const app = await startServer();
     const PORT = process.env.PORT || 3000;
     app.listen(PORT, () => {
     console.log('Server on port ', PORT)});
}

main();
