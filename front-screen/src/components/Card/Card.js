
export default {
    name: 'Card',
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