import express, { Request, Response } from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generateId } from "./utils/randomIdGenerator";
import path from "path";
import { getFilePaths } from "./utils/file";
import "dotenv/config";
import { uploadFile } from "./aws/uploader";
import { createClient } from "redis";

//redis init
const publisher = createClient();
publisher.connect();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/deploy", async (req: Request, res: Response) => {
    const { repoUrl } = req.body;
    const id = generateId();
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));
    const files = getFilePaths(path.join(__dirname, `output/${id}`));

    files.forEach(async (file) => {
        await uploadFile(file.slice(__dirname.length + 1), file);
    });

    publisher.lPush("build-q", id);

    res.json({ id });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
