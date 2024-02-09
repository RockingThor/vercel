import fs from "fs";
import path from "path";

export const getFilePaths = (folderPath: string) => {
    let store: string[] = [];

    const files = fs.readdirSync(folderPath);

    files.forEach((file) => {
        const filePath = path.join(folderPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            store = store.concat(getFilePaths(filePath));
        } else {
            store.push(filePath);
        }
    });

    return store;
};
