// computed props: -> functions returning the value of props which depend on other props
// watchers: methods named the same as properties whose params are the old and new value of the prop being watched
function getRandomValue() {
    return Math.floor(Math.random() * (12 - 5)) + 5;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null
        };
    },
    methods: {
        startNewGame() {
            // reset all vars
            this.currentRound = 0;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.winner = null
        },
        attackMonster() {
            // get a random value for how much damage the player deals
            this.currentRound++;
            let damageDealt = getRandomValue();
            this.monsterHealth -= damageDealt;
            this.attackPlayer();    // monster strikes back
        },

        attackPlayer() {
            let damageDealt = getRandomValue();
            this.playerHealth -= damageDealt;
        },

        specialAttack() {
            // the player can deal a special attack every 3 rounds
            this.currentRound++;
            let attackValue = getRandomValue(12, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer(); // monster strikes back
        },
        healPlayer() {
            this.currentRound ++
            let healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue <= 100) {
                this.playerHealth += healValue;
            } else {
                this.playerHealth = 100;
            }
            this.attackPlayer();
        },
        surrender() {
            this.playerHealth = 0;
        }
    },
    computed: {
        battleWon() {
            return (this.monsterHealth <= 0 && this.playerHealth >= 0) ? "Player Won" : "Still Fighting"
        },
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%' }
            } else {
                return { width: this.monsterHealth + '%' }
            }

        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%' }
            } else {
                return { width: this.playerHealth + '%' }
            }
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0
        }
    },
    watch: {
        playerHealth(value) {
            if (value  <= 0 && this.monsterHealth <= 0) {
                // draw
                this.winner = "draw"
            } else if (value <= 0) {
                // player lost
                this.winner = "monster"
            }
        },
        monsterHealth(value) {
            if (value  <= 0 && this.playerHealth <= 0) {
                // draw
                this.winner = "draw"
            } else if (value <= 0) {
                // monster lost
                this.winner = "player"
            }
        },
    }
});

app.mount("#game")