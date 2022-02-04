import Card from '../Card.vue'

export default {
    name: 'Graph',
    data () {
        return {
          cards: [1, 2],
    }
        
      },
      methods: {
          addCard () {
              this.cards.push(this.cards.length+1)
          },
      },
      components: {
        Card
      },
  }