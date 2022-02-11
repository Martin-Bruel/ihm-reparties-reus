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
      img: String
    },
    data () {
      return {
        isActive: false,
        url: `http://${process.env.VUE_APP_BACK_IP}:8080/reus-api/image/`
      }
    },
    methods: {
        holdHandler () {
            this.isActive = true
        },
        holdHandlerEnd(){
            this.isActive = false
        }
    },
    mounted() {
      console.log(this.id)
    }
  }
  