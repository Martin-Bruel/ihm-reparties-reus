import axios from 'axios'

export default {
    data: () => ({ time: null }),
    methods: {
      async submit(){
        await axios.post("http://192.168.54.136:8080",{message: "SECOND POTEAU PALLOOOOOOOIIIIIS"},{"Access-Control-Allow-Origin": "*"});
        console.log("COUCOU");
      }
    }
}