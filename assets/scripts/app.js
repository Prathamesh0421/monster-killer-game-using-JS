const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

let enteredValue = parseInt(prompt("Choose the max health value", "100"));

if (!isNaN(enteredValue) && enteredValue > 0) {
  chosenMaxLife = enteredValue;
}

adjustHealthBars(chosenMaxLife);

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function writeToLog(ev, val, playerHealth, monsterHealth) {
  let logEntry;
  logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  if (ev === "PLAYER_ATTACK" || ev === "STRONG_PLAYER_ATTACK") {
    logEntry.target = "MONSTER";
  } else if (ev === "MONSTER_ATTACK") {
    logEntry.target = "PLAYER";
  }

  battleLog.push(logEntry);
}

function endRound() {
  let initialPlayerHealth = currentPlayerHealth;

  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  writeToLog(
    "MONSTER_ATTACK",
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert("You would be dead but bonus life saved you!");
    setPlayerHealth(initialPlayerHealth);
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You Won!");
    writeToLog(
      "GAME_OVER",
      "You Won!",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You Lost!");
    writeToLog(
        "GAME_OVER",
        "You Lost!",
        currentMonsterHealth,
        currentPlayerHealth
      );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("You have a draw!");
    writeToLog(
        "GAME_OVER",
        'You have a draw!',
        currentMonsterHealth,
        currentPlayerHealth
      );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode,event) {
  const damage = dealMonsterDamage(mode);
  currentMonsterHealth -= damage;
  
  writeToLog(event,damage,currentMonsterHealth,currentPlayerHealth);
  endRound();
}

function attackHandler() {
  attackMonster(ATTACK_VALUE,"PLAYER_ATTACK");
    
}

function strongAttackHandler() {
  attackMonster(STRONG_ATTACK_VALUE,"STRONG_PLAYER_ATTACK");
  
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can' increase the health more than chose max value");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    "PLAYER_HEAL",
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  console.log(battleLog);
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
