export default {
  name: 'Card',
  props: {
    title: String,
    subtitle: String,
    flag: {
      default: false,
    },
    content: String,
    img: String
  },
  data () {
    return {
      isActive: false,
      url: "http://localhost:8080/reus-api/image/"
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
