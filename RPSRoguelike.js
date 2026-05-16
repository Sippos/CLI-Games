let playerHP = 10;
let playerMaxHP = 10;
let enemyHP = 6;
let damage = 2;
let enemyLevel = 1;
let lastMessage = "A wild enemy appears!";
let currentPath = "normal";
const moves = ["rock", "paper", "scissor"];

const readline = require("readline")


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function showScreen() {
    console.clear();

    console.log("\x1b[35m==============================\x1b[0m");
    console.log("\x1b[33m     RPS ROGUELIKE              \x1b[0m");
    console.log("\x1b[35m==============================\x1b[0m\n");

    console.log(`\x1b[36mPlayer HP: ${playerHP}\x1b[0m`);
    console.log(`\x1b[31mEnemy HP: ${enemyHP}\x1b[0m`);
    console.log(`\x1b[33mDamage: ${damage}\x1b[0m\n`);

    console.log(`\x1b[37m${lastMessage}\x1b[0m\n`);
}

function playRound() {
    showScreen();
rl.question("Choose rock, paper or scissor: ", (answer) => {
    const playerMove = answer.toLowerCase();
    const enemyMove = moves[Math.floor(Math.random() * moves.length)]
    
    if (!moves.includes(playerMove)) {
        console.log("Please choose rock, paper or scissor.");
        playRound();
        return;
    }
    
    if (playerMove === enemyMove) {
        lastMessage = `You chose ${playerMove}. Enemy chose ${enemyMove}. \x1b[33mDraw!\x1b[0m`;
    } else if (
        (playerMove === "rock" && enemyMove === "scissor") ||
        (playerMove === "paper" && enemyMove === "rock") ||
        (playerMove === "scissor" && enemyMove === "paper")
    ) {
        enemyHP -= damage;
        lastMessage = `You chose ${playerMove}. Enemy chose ${enemyMove}. \x1b[32mYou hit the enemy!\x1b[0m`;
    }   else {
        playerHP -= damage;
        lastMessage = `You chose ${playerMove}. Enemy chose ${enemyMove}. \x1b[31mThe enemy hits you!\x1b[0m`;
    }
    
    console.log(`\x1b[36mPlayer HP: ${playerHP}\x1b[0m`);
    console.log(`Enemy HP: ${enemyHP}`);

    if (playerHP <= 0) {
        console.log("Game over! You died.");
        rl.close();
    }   else if (enemyHP <= 0) {
        console.log("You defeated the enemy!");
        chooseUpgrade(currentPath);
    }   else {
        playRound();
    }
});
}

function chooseUpgrade(path) {
    console.log("\x1b[35m\nChoose your upgrade:\x1b[0m");

    if (path === "elite") {
        console.log("\x1b[31mELITE REWARD!\x1b[0m");
        console.log("1. +4 Max HP");
        console.log("2. +2 Damage");
        console.log("3. Full Heal");
    } else {
        console.log("1. +2 Max HP");
        console.log("2. +1 Damage");
        console.log("3. Heal 4 HP");
    }

    rl.question("Pick 1, 2 or 3: ", (choice) => {
        if (path === "elite") {
            if (choice === "1") {
                playerMaxHP += 4;
                playerHP += 4;
            } else if (choice === "2") {
                damage += 2;
            } else if (choice === "3") {
                playerHP = playerMaxHP;
            }
        } else {
            if (choice === "1") {
                playerMaxHP += 2;
                playerHP += 2;
            } else if (choice === "2") {
                damage += 1;
            } else if (choice === "3") {
                playerHP += 4;
                if (playerHP > playerMaxHP) playerHP = playerMaxHP;
            }
        }

        choosePath();
    });
}

playRound();

function choosePath() {
    console.clear();

    console.log("\x1b[35m========= CHOOSE YOUR PATH =========\x1b[0m\n");

    console.log("                 YOU");
    console.log("                  │");
    console.log("        ┌─────────┴─────────┐");
    console.log("        │                   │");
    console.log("        ▼                   ▼");
    console.log("  [1] Graveyard       [2] Blood Moon");
    console.log("  Normal fight        Elite fight");
    console.log("  Normal upgrade      Rare upgrade\n");

    rl.question("Choose path 1 or 2: ", (choice) => {
        if (choice === "1") {
            currentPath = "normal";
            lastMessage = "You enter the Graveyard...";
            startNextFight("normal");
        } else if (choice === "2") {
            currentPath = "elite";
            lastMessage = "You walk under the Blood Moon...";
            startNextFight("elite");
        } else {
            choosePath();
        }
    });
}

function startNextFight(type) {
    enemyLevel++;

    if (type === "elite") {
        enemyHP = 10 + enemyLevel * 3;
        lastMessage = `An elite enemy appears!`;
    } else {
        enemyHP = 6 + enemyLevel * 2;
        lastMessage = `Enemy Level ${enemyLevel} appears!`;
    }

    playRound();
}