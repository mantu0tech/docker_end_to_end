import express from "express";
import router from "./routes/router";

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use("/", router);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});