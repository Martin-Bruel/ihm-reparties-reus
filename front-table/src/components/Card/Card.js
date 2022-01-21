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
  }
}