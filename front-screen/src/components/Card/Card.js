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
        hasPosition: false
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
        }
    },
    mounted() {
      if (this.positions.length > 0)
        this.hasPosition = true
    }
  }
  