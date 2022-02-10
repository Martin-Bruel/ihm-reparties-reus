export default {
    name: 'Card',
    props: {
      nb : Number,
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
        isActive: false
      }
    },
    methods: {
        holdHandler () {
            this.isActive = true
        },
        holdHandlerEnd(){
            this.isActive = false
        }
    }
  }
  