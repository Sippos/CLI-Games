let playerHP = 10;
let playerMaxHP = 10;
let enemyHP = 6;
let damage = 2;
let enemyLevel = 1;
let lastMessage = "A wild enemy appears!";
let currentPath = "normal";
const moves = ["rock", "paper", "scissor"];
let paperHeal = 0;
let scissorPoison = 0;
let rockBonusDamage = 0;
let totalDamage = damage;
const upgrades = [
    {
        name: "Stone Fist",
        weapon: "Rock",
        description: "+2 damage. Rock becomes a heavy hitter.",
        apply: () => {
            damage += 2;
        }
    },
    {
        name: "Paper Charm",
        weapon: "Paper",
        description: "Paper heals you for 2 HP when you win with it.",
        apply: () => {
            paperHeal += 2;
        }
    },
    {
        name: "Poison Scissors",
        weapon: "Scissor",
        description: "Scissor applies poison after a hit.",
        apply: () => {
            scissorPoison += 1;
        }
    }
];

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

    console.log(`🪨 : +${rockBonusDamage}`);
    console.log(`📜 : +${paperHeal}`);
    console.log(`✂️ : +${scissorPoison}\n`);

    console.log(`\x1b[37m${lastMessage}\x1b[0m\n`);
}

function getMoveIcon(move) {
    if (move === "rock") return "🪨";
    if (move === "paper") return "📜";
    if (move === "scissor") return "✂️";
}

function playRound() {
    showScreen();
rl.question("Choose rock 🪨, paper 📜 or scissor ✂️ : ", (answer) => {
    const playerMove = answer.toLowerCase();
    const enemyMove = moves[Math.floor(Math.random() * moves.length)]
    const fightText = `${getMoveIcon(playerMove)}  VS ${getMoveIcon(enemyMove)}`;
    
    if (!moves.includes(playerMove)) {
        console.log("Please choose rock, paper or scissor.");
        playRound();
        return;
    }
    
if (playerMove === enemyMove) {
    lastMessage = `${fightText}\n\x1b[33mDraw!\x1b[0m`;
} else if (
    (playerMove === "rock" && enemyMove === "scissor") ||
    (playerMove === "paper" && enemyMove === "rock") ||
    (playerMove === "scissor" && enemyMove === "paper")
) {
    if (playerMove === "rock") {
    totalDamage += rockBonusDamage;
}

enemyHP -= totalDamage;

lastMessage = `${fightText}\n\x1b[32mYou hit the enemy for ${totalDamage} damage!\x1b[0m`;

if (playerMove === "paper" && paperHeal > 0) {
    playerHP += paperHeal;

    if (playerHP > playerMaxHP) {
        playerHP = playerMaxHP;
    }

    lastMessage += `\n📜 You healed ${paperHeal} HP!`;
}

if (playerMove === "scissor" && scissorPoison > 0) {
    enemyHP -= scissorPoison;
    lastMessage += `\n✂️ Poison deals ${scissorPoison} extra damage!`;
}
} else {
    playerHP -= damage;
    lastMessage = `${fightText}\n\x1b[31mThe enemy hits you!\x1b[0m`;
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
    console.clear();

    console.log("\x1b[35m====================================\x1b[0m");
    console.log("\x1b[33m             LEVEL UP!               \x1b[0m");
    console.log("\x1b[35m====================================\x1b[0m\n");

    console.log("\x1b[36mChoose one upgrade:\x1b[0m\n");

    console.log("\x1b[37m[1] 🪨  Stone Fist\x1b[0m");
    console.log("    Rock: +2 bonus damage\n");

    console.log("\x1b[37m[2] 📜  Paper Charm\x1b[0m");
    console.log("    Paper: Heal +2 when you win with paper\n");

    console.log("\x1b[37m[3] ✂️  Poison Scissors\x1b[0m");
    console.log("    Scissor: Adds poison damage\n");

    rl.question("Pick your upgrade: ", (choice) => {
        if (choice === "1") {
            rockBonusDamage += 2;
            lastMessage = "Rock upgrade gained: Stone Fist!";
        } else if (choice === "2") {
            paperHeal += 2;
            lastMessage = "Paper upgrade gained: Paper Charm!";
        } else if (choice === "3") {
            scissorPoison += 1;
            lastMessage = "Scissor upgrade gained: Poison Scissors!";
        } else {
            chooseUpgrade(path);
            return;
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