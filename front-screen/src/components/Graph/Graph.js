import Card from '../Card.vue'
import LeaderLine from 'leader-line-vue';

export default {
  name: 'Graph',
  data () {
      return {
        cards: [1],
        lines: []
      }   
  },
  mounted() {
    let self = this;
    window.setInterval(function(){
      if(self.lines.length > 0) {
        self.lines.forEach(line => {
          line.position();
        });
      }    
    }, 50);
  },
  methods: {
      addCard () {
          this.cards.push(this.cards.length+1);


          // Add lines
          let randomNumberOfNewLines = this.randomIntFromInterval(1, 3);

          console.log("randomNumberOfNewLines : " + randomNumberOfNewLines);

          setTimeout(() => {

            let linkEverExists = [];

            for(let i = 0; i < randomNumberOfNewLines && i < this.cards.length-1; i++) {
            
              let cnt = 0;
              let randomCardId = null;
              do {
                console.log("in while loop");
                randomCardId = this.randomIntFromInterval(0, this.cards.length-2);
                cnt++;
              } while (linkEverExists.includes(randomCardId) && cnt < 10);
              linkEverExists.push(randomCardId);
              // console.log("linkEverExists : " + linkEverExists);
              // console.log("randomCardId : " + randomCardId)
  
              console.log("Start " + (this.cards.length-1).toString());     
              let lastAddedCard = document.getElementById((this.cards.length-1).toString());
              // console.log(lastAddedCard);
  
              console.log("End " + randomCardId.toString());
              let randomCardExceptLastAdded = document.getElementById(randomCardId.toString());
              // console.log(randomCardExceptLastAdded);
  
              this.lines.push(LeaderLine.setLine(
                lastAddedCard,
                randomCardExceptLastAdded,
                { 
                  startPlug: 'behind', 
                  endPlug: 'behind',
                  color: 'black',
                  middleLabel: this.randomLinkTitle()
                }
              ));     
            }

            console.log("--------------------------");
          }, 1100);       
      },
      randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      },
      randomLinkTitle() {
        let accroches = ['CDI', 'CDD', 'Garage de Pedro', 'Cartel de Madeline', 'Vente de produits'];
        let yearOrMonth = ['mois', 'années'];
        let number = this.randomIntFromInterval(1, 10);
        let accroche = accroches[this.randomIntFromInterval(0, accroches.length-1)];
        return `${number} ${yearOrMonth[this.randomIntFromInterval(0, 1)]} - ${accroche}`;
      }
  },
  components: {
    Card
  },
}