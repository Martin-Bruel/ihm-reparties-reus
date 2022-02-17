export default class PositionsSorts {
    constructor(positions) {
        this.positions = positions
    }
    sortOnTop(){
        console.log(this.positions)
        this.positions.sort((a,b) => (a.position.lat > b.position.lat) ? 1 : ((b.position.lat > a.position.lat) ? -1 : 0))
        console.log(this.positions.forEach(element => {
            console.log(element.position.lat)
        }))
    }
    sortOnLeft(){
        console.log(this.positions)
        this.positions.sort((a,b) => (a.position.lat < b.position.lat) ? 1 : ((b.position.lat < a.position.lat) ? -1 : 0))
        console.log(this.positions.forEach(element => {
            console.log(element.position.lat)
        }))
    }
    sortOnRight(lattitude, longitude){
        var tmpPositions = this.positions
        var resultPositions = []
        // console.log(tmpPositions)
        tmpPositions.sort((a,b) => (a.position.lng < b.position.lng) ? 1 : ((b.position.lng < a.position.lng) ? -1 : 0))
        var minimumDistance = 10
        tmpPositions.forEach((element) => {
            // console.log(element.position.lng)
            if (element.position.lng > longitude){
                if(this.findAngle({lat:lattitude, lng: longitude+5},{lat:lattitude, lng: longitude}, element.position) < 50){
                    // console.log("Angle : ", this.findAngle({lat:lattitude, lng: longitude+5},{lat:lattitude, lng: longitude}, element.position))
                    var currentDistance = Math.sqrt((lattitude - element.position.lat)**2 + (longitude - element.position.lng)**2)
                    // console.log("currentDistance : ", currentDistance)
                    if(currentDistance < minimumDistance){
                        minimumDistance = currentDistance
                        resultPositions = element
                        // console.log("Distance entre A et B : ",Math.sqrt((lattitude - element.position.lat)**2 + (longitude - element.position.lng)**2))
                    }
                }
            }
        })
        // console.log(tmpPositions)
        return resultPositions
    }
    sortOnBottom(lattitude, longitude){
        var tmpPositions = this.positions
        var resultPositions = []
        tmpPositions.sort((a,b) => (a.position.lng > b.position.lng) ? 1 : ((b.position.lng > a.position.lng) ? -1 : 0))
        var minimumDistance = 10
        tmpPositions.forEach((element) => {
            console.log(element.position.lng)
            console.log(element.position.lng," < ", longitude)
            if (element.position.lng < longitude){
                console.log("Angle : ", this.findAngle({lat:lattitude, lng: longitude-5},{lat:lattitude, lng: longitude}, element.position))
                if(this.findAngle({lat:lattitude, lng: longitude-5},{lat:lattitude, lng: longitude}, element.position) < 90){
                    console.log("Angle : ", this.findAngle({lat:lattitude, lng: longitude+5},{lat:lattitude, lng: longitude}, element.position))
                    var currentDistance = Math.sqrt((lattitude - element.position.lat)**2 + (longitude - element.position.lng)**2)
                    // console.log("currentDistance : ", currentDistance)
                    if(currentDistance < minimumDistance){
                        minimumDistance = currentDistance
                        resultPositions = element
                        // console.log("Distance entre A et B : ",Math.sqrt((lattitude - element.position.lat)**2 + (longitude - element.position.lng)**2))
                    }
                }
            }
        })
        // console.log(tmpPositions)
        return resultPositions
    }
    findAngle(A,B,C) {
        var AB = Math.sqrt(Math.pow(B.lat-A.lat,2)+ Math.pow(B.lng-A.lng,2));    
        var BC = Math.sqrt(Math.pow(B.lat-C.lat,2)+ Math.pow(B.lng-C.lng,2)); 
        var AC = Math.sqrt(Math.pow(C.lat-A.lat,2)+ Math.pow(C.lng-A.lng,2));
        return (Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB))* 180) / Math.PI;
    }
}