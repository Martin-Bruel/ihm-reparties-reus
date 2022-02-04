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
      windowHeight: window.innerHeight,
      isActive: false
    }
  },
  methods: {
      holdHandler () {
          this.isActive = true
      },
      holdHandlerEnd(){
          this.isActive = false
      },
      openMenu(){
        console.log("bijour")
        console.log(this.windowHeight)
        let position = document.querySelector('#centeredDiv');
        console.log(position)
        console.log(position.getBoundingClientRect().top)
      }
  }
}
