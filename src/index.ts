import express, { Request, Response } from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generateId } from "./utils/randomIdGenerator";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/deploy", async (req: Request, res: Response) => {
  const { repoUrl } = req.body;
  const id = generateId();
  await simpleGit().clone(repoUrl, `./output/${id}`);

  res.json({});
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
