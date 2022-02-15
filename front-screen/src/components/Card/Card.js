export default {
    name: 'Card',
    props: {
      id : null,
      cardOrLink: String,
      title: String,
      subtitle: String,
      flag: String,
      // flag: {
      //   default: false,
      // },
      content: String,
      img: String,
      type: String,
      expandNode: Function
    },
    data () {
      return {
        isActive: false,
        url: `http://${process.env.VUE_APP_BACK_IP}:8080/reus-api/image/`,
        counter: 0
      }
    },
    methods: {
        holdHandler () {
            this.isActive = true
        },
        holdHandlerEnd(){
            this.isActive = false
        },
        detectDoubleTap() {
          this.counter++ 
            if(this.counter !== 1) {
                this.timer = setTimeout(function() {
                    this.counter = 0
                }, 500); 
            }else{
                this.counter = 0
                this.expandNode(this.id)
            }
        }  
    },
    mounted() {
      console.log(this.id)
    }
  }
  