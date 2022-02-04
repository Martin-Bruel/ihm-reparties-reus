import Card from "../Card";

export default {
    name: 'Graph',
    data () {
        return {
          cards: [1, 2]
        }
      },
      methods: {
          addCard () {
              console.log(this.cards)
              this.cards.push(this.cards.length+1)
          },
      },
      components: {
        Card
      },
  }