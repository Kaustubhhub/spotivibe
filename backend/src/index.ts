import http from 'http';
import app from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT: number = parseInt(process.env.PORT || "8081", 10);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Gracefully shutting down...");
  server.close(() => {
    console.log("Closed out remaining connections.");
    process.exit(0);
  });
});
