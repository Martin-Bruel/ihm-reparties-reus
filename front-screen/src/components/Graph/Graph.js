import Card from '../Card.vue'
import LeaderLine from 'leader-line-vue';
import axios from 'axios';
import Vue from 'vue'

export default {
  name: 'Graph',
  props : {
    cards: null
  },
  data () {
      return {
        // cards: [this.generateCardContent()],
        cardsLinks: [],
        lines: [],
        holdingCards: [],
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
    holdCard(id, holdingCards, cardsLinks, lines){
        return function() {
          console.log(id, holdingCards)
          console.log(Vue.prototype.$screenId)
          if (holdingCards.length > 0){
            //At least two cards have a longpress
            console.log("FETCH LINKS : ")
            axios.get(`http://${process.env.VUE_APP_BACK_IP}:8080/reus-api/link/`+holdingCards[0]+'/'+id).then(response => {
             const res = response.data

              if(cardsLinks.filter(item => item.id === res.id).length === 0) {
                const cardLink = {
                  id: res.id,
                  title: res.title,
                  content : res.content,
                  position: res.position,
                  cardOrLink: 'link'
                 }
                 cardsLinks.push(cardLink)
                 setTimeout(()=>{
                      const card1Ref = document.getElementById("card"+holdingCards[0])
                      const card2Ref = document.getElementById("card"+id)
                      const linkCardRef = document.getElementById("link"+(cardsLinks.length-1).toString())
                      lines.push(LeaderLine.setLine(
                        card1Ref,
                        linkCardRef,
                        { 
                          startPlug: 'behind', 
                          endPlug: 'behind',
                          color: 'white',
                        }
                      ));
                      lines.push(LeaderLine.setLine(
                        card2Ref,
                        linkCardRef,
                        { 
                          startPlug: 'behind', 
                          endPlug: 'behind',
                          color: 'white',
                        }
                      ));
                  }, 100)
              }        
            })
          }
          holdingCards.push(id)
        }
      },
      releaseCard(id, holdingCards){
        return function() {
          console.log("releaseCard ", id, holdingCards);
          let index = holdingCards.indexOf(id)
          if (index !== -1){
            holdingCards.splice(index, 1)
          }
        }
      },
      holdLink (position){
        return function() {
          console.log(position)
          console.log(Vue.prototype.$screenId)
          axios.post(`http://${process.env.VUE_APP_BACK_IP}:8080/reus-api/table/position/${Vue.prototype.$screenId}`, {lat: position.lat, lon: position.lon})
        }
      },
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
              let lastAddedCard = document.getElementById("card" + this.cards[0].id.toString());
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
                    color: 'white',
                  }
                )); 
                
                this.lines.push(LeaderLine.setLine(
                  linkLabelCart,
                  randomCardExceptLastAdded,
                  { 
                    startPlug: 'behind', 
                    endPlug: 'behind',
                    color: 'white',
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
          cardOrLink: 'card',
          id : this.cards.length
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