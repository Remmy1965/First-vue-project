'use strict';
const attackFunction = function (val1, val2) {
  return Math.trunc(Math.random() * (val1 - val2)) + val2;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      } else {
        return { width: this.monsterHealth + '%' };
      }
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      } else {
        return { width: this.playerHealth + '%' };
      }
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = attackFunction(12, 5);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addlogMessage('player', 'attack', attackValue);
      console.log(this.monsterHealth);
    },
    attackPlayer() {
      const attackValue = attackFunction(15, 8);
      this.addlogMessage('monster', 'attack', attackValue);
      this.playerHealth -= attackValue;
    },
    specialMonsterAttack() {
      this.currentRound++;
      const attackValue = attackFunction(25, 10);
      this.monsterHealth -= attackValue;
      this.addlogMessage('player', 'special attack', attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = attackFunction(20, 8);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addlogMessage('player', 'heal', healValue);
      this.attackPlayer();
    },
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    surrender() {
      this.winner = 'monster';
    },
    addlogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount('#game');
