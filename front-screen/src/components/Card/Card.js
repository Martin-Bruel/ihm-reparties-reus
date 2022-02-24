import axios from 'axios';
import Vue from 'vue'

export default {
    name: 'Card',
    props: {
      id : null,
      cardOrLink: String,
      title: String,
      subtitle: String,
      flag: String,
      positions: Array,
      content: String,
      img: String,
      type: String,
      expandNode: Function,
      expandAllLinks: Function,
      removeCard: Function
    },
    data () {
      return {
        isActive: false,
        url: `http://${process.env.VUE_APP_BACK_IP}:8080/reus-api/image/`,
        counter: 0,
        isMenuActive: false,
        hasPosition: false,
        isHugeCard: false,
        borderColor: "black",
        borderWidth : "0.5px"
      }
    },
    methods: {
        holdHandler () {
            this.isActive = true
        },
        holdHandlerEnd(){
            this.isActive = false
        },
        activateMenu(){
            this.isMenuActive = true
        },
        desactivateMenu(){
          this.isMenuActive = false
        },
        expandCardNode(){
          this.desactivateMenu()
          this.expandNode(this.id)
        },
        expandAllCardLinks(){
          this.desactivateMenu()
          this.expandAllLinks()
        },
        setHugeCard(){
          this.isHugeCard = true
          setTimeout(() => {
            this.isHugeCard = false
          },175); 
        },
        setBorderColor(color){
          console.log("COLOR")
          this.borderColor = color
          this.borderWidth = "3px"
          setTimeout(() => {
            this.borderColor = "black"
            this.borderWidth = "0.5px"
          },175); 
        },
        removeCardNode(){
          this.desactivateMenu()
          this.removeCard(this.id)
        },
        detectDoubleTap() {
            if(this.counter === 1) {
              this.counter = 0
              this.activateMenu();
            }else{
              this.counter++
              setTimeout(() => {
                this.counter = 0
              },300); 
            }
        },
        requestPosition(){
          this.desactivateMenu()
          axios.post(`http://${process.env.VUE_APP_BACK_IP}:8080/reus-api/table/position/${Vue.prototype.$screenId}`, {lat: this.positions[0].lat, lon: this.positions[0].lon})
          this.setHugeCard()
        }
    },
    mounted() {
      if (this.positions.length > 0)
        this.hasPosition = true
    }
  }
  