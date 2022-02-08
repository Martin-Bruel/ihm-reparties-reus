import Card from '../Card.vue'
import LeaderLine from 'leader-line-vue';

export default {
  name: 'Graph',
  data () {
      return {
        cards: [1, 2],
        lines: []
      }   
  },
  mounted() {

    this.lines.push(LeaderLine.setLine(
      document.getElementById('0'),
      document.getElementById('1'), 
      { 
        startPlug: 'behind', 
        endPlug: 'behind',
        color: 'black',
        middleLabel: this.randomLinkTitle()
      }
    ));

    let self = this;
    window.setInterval(function(){
      self.lines.forEach(line => {
        line.position();
      });
    }, 50);
  },
  methods: {
      addCard () {
          this.cards.push(this.cards.length+1);


          // Add lines
          let randomNumberOfNewLines = this.randomIntFromInterval(1, 3);

          // console.log("randomNumberOfNewLines : " + randomNumberOfNewLines);

          setTimeout(() => {

            let linkEverExists = [];

            for(let i = 0; i < randomNumberOfNewLines; i++) {
            
              let randomCardId = this.randomIntFromInterval(0, this.cards.length-2);
              while(linkEverExists.includes(randomCardId)) {
                randomCardId = this.randomIntFromInterval(0, this.cards.length-2);
              }
              linkEverExists.push(randomCardId);
  
              // console.log("Start " + (this.cards.length-1).toString());     
              let start = document.getElementById((this.cards.length-1).toString());
              // console.log(start);
  
              // console.log("End " + randomCardId.toString());
              let end = document.getElementById(randomCardId.toString());
              // console.log(end);
  
              this.lines.push(LeaderLine.setLine(
                start,
                end,
                { 
                  startPlug: 'behind', 
                  endPlug: 'behind',
                  color: 'black',
                  middleLabel: this.randomLinkTitle()
                }
              ));     
            }
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