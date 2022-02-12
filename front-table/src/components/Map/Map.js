import { latLng } from "leaflet";
import { LMap, LIcon, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import axios from 'axios';
import Card from "../Card.vue";
export default {
    name: "Example",
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LTooltip,
        LIcon,
        Card
    },
    data() {
        return {
            zoom: 12,
            cards: [],
            center: latLng(43.62806792078592, 7.082102807121494),
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            withPopup: latLng(47.41322, -1.219482),
            withTooltip: latLng(47.41422, -1.250482),
            currentZoom: 11.5,
            currentCenter: latLng(47.41322, -1.219482),
            showParagraph: false,
            mapOptions: {
                zoomSnap: 0.5
            },
            points: [
                {
                    id: 0,
                    position: latLng(43.6772055254188, 7.221590151093953),
                    cards: []
                },
                {
                    id: 1,
                    position: latLng(43.66125715133231, 7.149229672934273),
                    cards: []
                },
                {
                    id: 2,
                    position: latLng(43.70979412389887, 7.123823790405431),
                    cards: []
                }
            ],
            showMap: true,
            modalOpen: false,
            showModal: false,
            detailedCards: []
        };
    },
    methods: {
        onMove(id, event){
            this.$emit('on-move', id, event)
            let y = event.detail.event.screenY
            let x = event.detail.event.screenX

            if (y === undefined) y = event.detail.event.changedTouches[0].clientY
            if (x === undefined) x = event.detail.event.changedTouches[0].clientX
            if (y < 80 || x < 80){
                this.detailedCards = this.detailedCards.filter(card => card.id != id);
            } 
        },
        zoomUpdate(zoom) {
            this.currentZoom = zoom;
        },
        centerUpdate(center) {
            this.currentCenter = center;
        },
        showLongText() {
            this.showParagraph = !this.showParagraph;
        },
        innerClick() {
            alert("Click!");
        },
        openModal() {
            this.modalOpen = !this.modalOpen;
        },
        displayDetails(cards, event){
            // console.log(event)
            this.detailedCards = cards
            var alignement = 0
            this.detailedCards.forEach(element => {
                console.log(element)
                element.positionX = event.containerPoint.x+alignement
                element.positionY = event.containerPoint.y+alignement
                alignement += 10
            });
            this.detailedCards[0].positionX = event.containerPoint.x
            this.detailedCards[0].positionY = event.containerPoint.y
            // console.log(event.containerPoint.x,event.containerPoint.y)
            // console.log(this.detailedCards)
        } 
    },
    created(){
    },
    mounted(){
        axios.get(`http://${process.env.VUE_APP_BACK_IP}:8080/reus-api/cards`).then(response => {
            this.cards = response.data
            this.points[0].cards.push(this.cards[0])
            // this.points[0].cards.push(this.cards[1])
            this.points[1].cards.push(this.cards[0])
            this.points[2].cards.push(this.cards[1])
            this.points[2].cards.push(this.cards[2])
            console.log(this.cards)
            console.log(this.points)
        })
    }
};