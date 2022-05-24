let reqBtn= document.querySelector('.button');
let reqInput = document.querySelector('.place');
let respResultDiv= document.querySelector('.two');
let firstValue=document.querySelector(".line1.train");
let firstValue1 = document.querySelector(".line1.dep");
let firstValue2 = document.querySelector(".line1.arr");
let secondValue = document.querySelector(".line2.train");
let secondValue1 = document.querySelector(".line2.dep");
let secondValue2 = document.querySelector(".line2.arr");
let thirdValue = document.querySelector(".line3.train");
let thirdValue1 = document.querySelector(".line3.dep");
let thirdValue2 = document.querySelector(".line3.arr");

const API_KEY = '42c5f31a-7a69-45d6-bf1a-ada630305e75';
const arrId='740098001';

function getOrigin(origin,key){
    return `https://api.resrobot.se/v2.1/location.name?input=${origin}?$format=json&accessId=${key}`;
}

function getTrainDetails(depId,arrId,key) {
    return `https://api.resrobot.se/v2.1/trip?format=json&originId=${depId}&destId=${arrId}&passlist=true&showshowPassingPoints=true&accessId=${key}`;
}

reqBtn.addEventListener('click', event => {
    event.preventDefault();
    let origin = reqInput.value;
    let Origininfo = getOrigin(origin,API_KEY);
    axios.get(Origininfo).then(response => {
        //let originId=data.stopLocationorCoordLocation[0].stopLocation.extId; 
        let data = response.data;
        let  depId= data.stopLocationOrCoordLocation[0].StopLocation.extId;
console.log(depId);
let trainDetailsUrl=getTrainInfo(depId,arrId,API_KEY)
axios.get(trainDetailsUrl).then(response =>{
    let value=response.data;
    console.log(value);

let trainName=value.Trip[0].LegList.Leg[0].Product[0].name;
let trainName1=value.Trip[1].LegList.Leg[0].Product[0].name;
let trainName2=value.Trip[2].LegList.Leg[0].Product[0].name;
 let depTime=value.Trip[0].LegList.Leg[0].Origin.time;
 let depTime1=value.Trip[1].LegList.Leg[0].Origin.time;
 let depTime2=value.Trip[2].LegList.Leg[0].Origin.time;
 console.log(depTime);
 let  arrTime=value.Trip[0].Destination.time;
 let  arrTime1=value.Trip[1].Destination.time;
 let  arrTime2=value.Trip[2].Destination.time;
 console.log(arrTime);
firstValue.textContent='${trainName}';
firstValue1.textContent='${depTime}';
firstValue2.textContent='${arrTime}';
console.log(trainName);
console.log(depTime);
console.log(arrTime);
console.log(trainName1);
console.log(depTime1);
console.log(arrTime1);
console.log(trainName2);
console.log(depTime2);
console.log(arrTime2);
secondValue.textContent='${trainName1}';
secondValue1.textContent='${depTime1}';
secondValue2.textContent='${arrTime1}';
thirdValue.textContent='${trainName2}';
thirdValue1.textContent='${depTime2}';
thirdValue2.textContent='${arrTime2}';



        
})
        
    });
});