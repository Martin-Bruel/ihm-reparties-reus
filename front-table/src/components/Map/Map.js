import { latLng } from "leaflet";
import { LMap, LIcon, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import axios from 'axios';
import Card from "../Card.vue";
import PositionsSorts from "../../Services/PositionsSorts.js";
export default {
    name: "Example",
    props: {
        positionNotification: null
    },
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
            cards: [],
            center: latLng(43.62806792078592, 7.082102807121494),
            zoom: 12,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            withPopup: latLng(47.41322, -1.219482),
            withTooltip: latLng(47.41422, -1.250482),
            showParagraph: false,
            mapOptions: {
                doubleClickZoom: false
            },
            points: [],
            showMap: true,
            modalOpen: false,
            showModal: false,
            detailedCards: [],
            showShadow: false,
            shadowBigNav: null,
            currentZoom: null,
            currentCenter: null,
            positionsSorts: PositionsSorts
        };
    },
    methods: {
        onMove(id, event){
            this.$emit('on-move', this.detailedCards,id, event)
            let y = event.detail.event.screenY
            let x = event.detail.event.screenX

            if (y === undefined) y = event.detail.event.changedTouches[0].clientY
            if (x === undefined) x = event.detail.event.changedTouches[0].clientX
            if (y < 80 || x < 80){
                this.detailedCards = this.detailedCards.filter(card => card.id != id);
                this.showShadow = false;
            } 
        },
        zoomUpdate(zoom) {
            this.currentZoom = zoom;
        },
        centerUpdate(center) {
            this.center = center;
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
        displayDetails(point, event){
            axios.post(`http://${process.env.VUE_APP_BACK_IP}:8080/reus-api/cards/position`, {lat:point.position.lat, lon:point.position.lng}).then(response => {
                this.detailedCards = response.data
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
            })
            
        },
        activateShadow(){
            this.showShadow = true;
        },
        desactivateShadow(){
            this.showShadow = false;
        },
        moveToNextMarker(event){
            let screenX = window.innerWidth
            let screenY = window.innerHeight
            let x = event.containerPoint.x
            let y = event.containerPoint.y
            if(x > 120 && y < 120){
                console.log("TOP") 
                let lat = event.latlng.lat
                let lng = event.latlng.lng
                let sortedPositions = this.positionsSorts.sortOnTop(lat, lng)
                if(sortedPositions.length != 0){
                    this.shadowBigNav = "TOP"
                    this.center = latLng(sortedPositions.position.lat,sortedPositions.position.lng)
                } else {
                    this.shadowBigNav = "TOPNONE"
                }
                console.log(sortedPositions)
            }
            else if(x > 120 && y+120 > screenY){
                let lat = event.latlng.lat
                let lng = event.latlng.lng
                console.log("BOTTOM") 
                let sortedPositions = this.positionsSorts.sortOnBottom(lat, lng)
                if(sortedPositions.length != 0){
                    this.shadowBigNav = "BOTTOM"
                    this.center = latLng(sortedPositions.position.lat,sortedPositions.position.lng)
                } else {
                    this.shadowBigNav = "BOTTOMNONE"
                }
                console.log(sortedPositions)            }
            else if (x < 120 && y > 120){
                console.log("LEFT") 
                let lat = event.latlng.lat
                let lng = event.latlng.lng
                let sortedPositions = this.positionsSorts.sortOnLeft(lat, lng)
                if(sortedPositions.length != 0){
                    this.shadowBigNav = "LEFT"
                    this.center = latLng(sortedPositions.position.lat,sortedPositions.position.lng)
                } else {
                    this.shadowBigNav = "LEFTNONE"
                }
                console.log(sortedPositions)            }
            else if (x+120> screenX && y > 120){
                console.log("RIGHT")
                let lat = event.latlng.lat
                let lng = event.latlng.lng
                let sortedPositions = this.positionsSorts.sortOnRight(lat, lng)
                if(sortedPositions.length != 0){
                    this.shadowBigNav = "RIGHT"
                    this.center = latLng(sortedPositions.position.lat,sortedPositions.position.lng)
                } else {
                    this.shadowBigNav = "RIGHTNONE"
                }
                console.log(sortedPositions)
            }          
            console.log(screenX, screenY)
            console.log(x,y)
            setTimeout(() => {  this.shadowBigNav = "NULL" }, 250);
        }
    },
    created(){
    },
    updated(){
        // if(){
            
        // }
    },
    mounted(){
        axios.get(`http://${process.env.VUE_APP_BACK_IP}:8080/reus-api/positions`).then(response => {
            const postions = response.data;
            for(let [i, position] of postions.entries()){
                this.points.push({
                    id: i,
                    position: latLng(position.lat, position.lon)
                })
            }
            this.positionsSorts = new PositionsSorts(this.points)
        })
    }
};