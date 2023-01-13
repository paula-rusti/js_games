// computed props: -> functions returning the value of props which depend on other props
function getRandomValue() {
    return Math.floor(Math.random() * (12 - 5)) + 5;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100
        };
    },
    methods: {
        attackMonster() {
            // get a random value for how much damage the player deals
            let damageDealt = getRandomValue();
            this.monsterHealth -= damageDealt;
            this.attackPlayer();    // monster strikes back
        },

        attackPlayer() {
            let damageDealt = getRandomValue();
            this.playerHealth -= damageDealt;
        },

        debugPrint() {
            console.log(this.monsterHealth)
        }
    },
    computed: {
        battleWon() {
            return (this.monsterHealth <= 0 && this.playerHealth >= 0) ? "Player Won" : "Still Fighting"
        },
        monsterBarStyles() {
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles() {
            return {width: this.playerHealth + '%'}
        }
    },
    watch: {

    }
});

app.mount("#game")