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
      positions: Object,
      content: String,
      img: String,
      type: String,
      expandNode: Function
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
          this.expandNode(this.id)
        },
        detectDoubleTap() {
          this.counter++ 
            if(this.counter !== 1) {
                this.timer = setTimeout(function() {
                    this.counter = 0
                }, 500); 
            }else{
                this.counter = 0
                this.activateMenu();
            }
        },
        requestPosition(){
          axios.post(`http://${process.env.VUE_APP_BACK_IP}:8080/reus-api/table/position/${Vue.prototype.$screenId}`, {lat: this.position[0].lat, lon: this.position[0].lon})
        }
    },
    mounted() {
      console.log(this.position)
      if (this.positions.length > 0)
        this.hasPosition = true
    }
  }
  