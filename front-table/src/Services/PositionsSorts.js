export default class PositionsSorts {
    constructor(positions) {
        this.positions = positions
    }
    sortOnTop(lattitude, longitude){
        var tmpPositions = this.positions
        var resultPositions = []
        console.log(lattitude, longitude)
        tmpPositions.sort((a,b) => (a.position.lat < b.position.lat) ? 1 : ((b.position.lat < a.position.lat) ? -1 : 0))
        console.log(tmpPositions)
        var minimumDistance = 10
        for (let element of tmpPositions) {
            console.log(element.position.lat)
            if (element.position.lat > lattitude){
                console.log("angle : ",this.findAngle({lat:lattitude+5, lng: longitude},{lat:lattitude, lng: longitude}, element.position))
                if(Math.abs(this.findAngle({lat:lattitude+5, lng: longitude},{lat:lattitude, lng: longitude}, element.position)) < 90){
                    // console.log("Angle : ", this.findAngle({lat:lattitude, lng: longitude+5},{lat:lattitude, lng: longitude}, element.position))
                    var currentDistance = Math.sqrt((lattitude - element.position.lat)**2 + (longitude - element.position.lng)**2)
                    // console.log("currentDistance : ", currentDistance)
                    if(currentDistance < minimumDistance){
                        minimumDistance = currentDistance
                        resultPositions = element
                        // console.log("Distance entre A et B : ",Math.sqrt((lattitude - element.position.lat)**2 + (longitude - element.position.lng)**2))
                    }
                } else if(resultPositions != null) {
                    console.log("bijour")
                    break
                }
            }
        }
        // console.log(tmpPositions)
        return resultPositions
    }
    sortOnLeft(lattitude, longitude){
        var tmpPositions = this.positions
        var resultPositions = []
        console.log(lattitude,longitude)
        tmpPositions.sort((a,b) => (a.position.lng < b.position.lng) ? 1 : ((b.position.lng < a.position.lng) ? -1 : 0))
        var minimumDistance = 10
        for (let element of tmpPositions) {
            // console.log(element.position.lng)
            if (element.position.lng < longitude){
                if(Math.abs(this.findAngle( element.position,{lat:lattitude, lng: longitude},{lat:lattitude, lng: longitude-5})) < 90){
                    // console.log("Angle : ", this.findAngle({lat:lattitude, lng: longitude+5},{lat:lattitude, lng: longitude}, element.position))
                    var currentDistance = Math.sqrt((lattitude - element.position.lat)**2 + (longitude - element.position.lng)**2)
                    // console.log("currentDistance : ", currentDistance)
                    if(currentDistance < minimumDistance){
                        minimumDistance = currentDistance
                        resultPositions = element
                        // console.log("Distance entre A et B : ",Math.sqrt((lattitude - element.position.lat)**2 + (longitude - element.position.lng)**2))
                    }
                } else if(resultPositions != null) {
                    console.log("bijour")
                    break
                }
            }
        }
        // console.log(tmpPositions)
        return resultPositions
    }
    sortOnRight(lattitude, longitude){
        var tmpPositions = this.positions
        var resultPositions = []
        // console.log(tmpPositions)
        tmpPositions.sort((a,b) => (a.position.lng < b.position.lng) ? 1 : ((b.position.lng < a.position.lng) ? -1 : 0))
        var minimumDistance = 10
        for (let element of tmpPositions) {
            // console.log(element.position.lng)
            if (element.position.lng > longitude){
                if(Math.abs(this.findAngle({lat:lattitude, lng: longitude+5},{lat:lattitude, lng: longitude}, element.position)) < 90){
                    // console.log("Angle : ", this.findAngle({lat:lattitude, lng: longitude+5},{lat:lattitude, lng: longitude}, element.position))
                    var currentDistance = Math.sqrt((lattitude - element.position.lat)**2 + (longitude - element.position.lng)**2)
                    // console.log("currentDistance : ", currentDistance)
                    if(currentDistance < minimumDistance){
                        minimumDistance = currentDistance
                        resultPositions = element
                        // console.log("Distance entre A et B : ",Math.sqrt((lattitude - element.position.lat)**2 + (longitude - element.position.lng)**2))
                    }
                } else if(resultPositions != null) {
                    console.log("bijour")
                    break
                }
            }
        }
        // console.log(tmpPositions)
        return resultPositions
    }
    sortOnBottom(lattitude, longitude){
        var tmpPositions = this.positions
        var resultPositions = []
        console.log(lattitude, longitude)
        tmpPositions.sort((a,b) => (a.position.lat > b.position.lat) ? 1 : ((b.position.lat > a.position.lat) ? -1 : 0))
        console.log(tmpPositions)
        var minimumDistance = 10
        for (let element of tmpPositions) {
            console.log(element.position.lat)
            if (element.position.lat < lattitude){
                console.log("angle : ",this.findAngle({lat:lattitude-5, lng: longitude},{lat:lattitude, lng: longitude}, element.position))
                if(Math.abs(this.findAngle({lat:lattitude-5, lng: longitude},{lat:lattitude, lng: longitude}, element.position)) < 90){
                    // console.log("Angle : ", this.findAngle({lat:lattitude, lng: longitude+5},{lat:lattitude, lng: longitude}, element.position))
                    var currentDistance = Math.sqrt((lattitude - element.position.lat)**2 + (longitude - element.position.lng)**2)
                    // console.log("currentDistance : ", currentDistance)
                    if(currentDistance < minimumDistance){
                        minimumDistance = currentDistance
                        resultPositions = element
                        // console.log("Distance entre A et B : ",Math.sqrt((lattitude - element.position.lat)**2 + (longitude - element.position.lng)**2))
                    }
                } else if(resultPositions != null) {
                    console.log("bijour")
                    break
                }
            }
        }
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