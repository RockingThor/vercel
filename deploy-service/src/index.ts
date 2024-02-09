import { createClient, commandOptions } from "redis";

const subscriber = createClient();
subscriber.connect();

async function main() {
    while (1) {
        const message = await subscriber.brPop(
            commandOptions({ isolated: true }),
            "build-q",
            0
        );
        console.log(message);
    }
}

main();
