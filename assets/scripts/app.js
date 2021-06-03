const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20; 


let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function endRound() {
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won!');
    }
    else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('You Lost!');
    }
    else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!');
    }
}

function attackMonster(mode) {
    const damage = dealMonsterDamage(mode);
    currentMonsterHealth -= damage
    endRound();
}

function attackHandler() {
    attackMonster(ATTACK_VALUE);
    
}

function strongAttackHandler() {
    attackMonster(STRONG_ATTACK_VALUE);
}

function healPlayerHandler() {
    increasePlayerHealth(HEAL_VALUE);
    endRound();
}
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler)
healBtn.addEventListener('click',healPlayerHandler);