export default {
  name: 'Card',
  props: {
    title: String,
    subtitle: String,
    callback: {
      type: Function,
    },
    flag: {
      default: false,
    },
    content: String,
    img: String
  },
  data () {
    return {
      windowHeight: window.innerHeight,
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
      },
      openMenu(){
        console.log("bijour")
        console.log(this.windowHeight)
        let position = document.querySelector('#centeredDiv');
        console.log(position)
        console.log(position.getBoundingClientRect().top)
      },

      doMessage() {
        const msg = {
          id: 2,
          message: "yolo",
        };
        this.callback(JSON.stringify(msg));
      }
  }
}
