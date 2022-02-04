import Card from '../Card.vue'
import { Draggable } from 'draggable-vue-directive'

export default {
    name: 'Graph',
    directives: {
        Draggable,
      },
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