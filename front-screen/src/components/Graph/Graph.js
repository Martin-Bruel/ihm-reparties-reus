import Card from '../Card.vue'
import LeaderLine from 'leader-line-vue';

export default {
  name: 'Graph',
  data () {
      return {
        cards: [this.generateCardContent()],
        cardsLinks: [],
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
          this.cards.push(this.generateCardContent());

          // Add lines
          let randomNumberOfNewLines = this.randomIntFromInterval(1, 3);

          console.log("randomNumberOfNewLines : " + randomNumberOfNewLines);

          setTimeout(() => {

            let linkEverExists = [];
            this.cardsLinks.push(this.generateCardLinkContent());

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
              let lastAddedCard = document.getElementById("card" + (this.cards.length-1).toString());
              // console.log(lastAddedCard);
  
              console.log("End " + randomCardId.toString());
              let randomCardExceptLastAdded = document.getElementById("card" + randomCardId.toString());
              // console.log(randomCardExceptLastAdded);
  

              setTimeout(() => {

                console.log("Middle " + (this.cardsLinks.length-1).toString());     
                let linkLabelCart = document.getElementById("link" + (this.cardsLinks.length-1).toString());
  

                this.lines.push(LeaderLine.setLine(
                  lastAddedCard,
                  linkLabelCart,
                  { 
                    startPlug: 'behind', 
                    endPlug: 'behind',
                    color: 'black',
                  }
                )); 
                
                this.lines.push(LeaderLine.setLine(
                  linkLabelCart,
                  randomCardExceptLastAdded,
                  { 
                    startPlug: 'behind', 
                    endPlug: 'behind',
                    color: 'black',
                  }
                )); 
                console.log("--------------------------");

              }, 100);       
            }
          }, 1100);       
      },
      generateCardContent() {

        let titles = ['Prison du Pontet', 'François Defrancie', 'Pablo Escrobár', 'Póme Hanpóasoñé', 'Garage de Pedro', 'Clemíndile', 'Tribunal de Cannes', 'Pascuàl Obistrõ', 'Làra Fabién', 'Mandaríle'];
        let subtitles = ['2 rue de la rape à fromage - 01234 BREST', '35 ans - Mexique - Cartel de Madeline', '265 Avenue de la liberté - Cannes France', '25 ans - Chili - Cartel de San Miguel', '46 Boulevard de la pomme de terre - 06410 - Biot', '12 ans - Salvador - Garagiste', '2 ans - France - Cartel de Madeline'];
        let images = ['jackson1.jpg', 'jackson2.jpg', 'jackson3.jpg'];
        let flags = ['france.png', 'chili.png'];
        let content = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nibh sagittis, vestibulum elit vitae, venenatis justo. Duis vel leo a risus tincidunt tincidunt eu a orci. Pellentesque sagittis maximus nisi a euismod. Phasellus nec velit dui'];
        return {
          title: titles[Math.floor(Math.random()*titles.length)],
          subtitle: subtitles[Math.floor(Math.random()*subtitles.length)],
          flag: flags[Math.floor(Math.random()*flags.length)],
          img: images[Math.floor(Math.random()*images.length)],
          content : content[Math.floor(Math.random()*content.length)],
          cardOrLink: 'card'
        }
      },
      randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      },
      generateCardLinkContent() {
        let accroches = ['CDI', 'CDD', 'Garage de Pedro', 'Cartel de Madeline', 'Vente de produits'];
        let yearOrMonth = ['mois', 'années'];
        let number = this.randomIntFromInterval(1, 10);
        let accroche = accroches[this.randomIntFromInterval(0, accroches.length-1)];
        let content = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nibh sagittis, vestibulum elit vitae, venenatis justo. Duis vel leo a risus tincidunt tincidunt eu a orci. Pellentesque sagittis maximus nisi a euismod. Phasellus nec velit dui'];
        
        return {
          title: `${number} ${yearOrMonth[this.randomIntFromInterval(0, 1)]} - ${accroche}`,
          content : content[Math.floor(Math.random()*content.length)],
          cardOrLink: 'link'
        }
      }
  },
  components: {
    Card
  },
}