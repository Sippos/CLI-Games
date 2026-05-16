let playerHP = 10;
let playerMaxHP = 10;
let enemyHP = 6;
let damage = 2;
let enemyLevel = 1;
let lastMessage = "A wild enemy appears!";
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
        chooseUpgrade();
    }   else {
        playRound();
    }
});
}

function chooseUpgrade() {
    console.log("\x1b[35m\nChoose your upgrade:\x1b[0m");
    console.log("\x1b[32m1. +2 Max HP\x1b[0m");
    console.log("\x1b[31m2. +1 Damage\x1b[0m");
    console.log("\x1b[36m3. Heal 4 HP\x1b[0m");

    rl.question("Pick 1, 2 or 3: ", (choice) => {
        if (choice === "1") {
            playerMaxHP += 2;
            playerHP += 2;
            console.log("Your max HP increased!");
        } else if (choice === "2") {
            damage += 1;
            console.log("Your damage increased!");
        } else if (choice === "3") {
            playerHP += 4;
            if (playerHP > playerMaxHP) {
                playerHP = playerMaxHP;
            }
            console.log("You healed!");
        } else {
            console.log("Invalid choice.");
            chooseUpgrade();
            return;
        }
        startNextFight();
    });
}

playRound();

function startNextFight() {
    enemyLevel++;
    enemyHP = 6 + enemyLevel * 2;
    console.log(`\n\x1b[35m--- Enemy Level ${enemyLevel} appears! ---\x1b[0m`);
    playRound();
}