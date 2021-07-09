//setting variables
var tabSet = 'none'
var mymap
var marker
var points = []
var obj = {
  Entertainment : [
    ["Fear Factory Queenstown", -45.03, 168.65],
    ["Formula Challenge", -38.66, 176.14],
    ["Seal Swim Kaikoura", -42.40, 173.68],
    ["Rainbows End", -36.99, 174.88]
  ],
  Experiences : [
    ["Northland Experiences", -35.20, 173.9],
    ["Envy Experiences", -45.42, 167.71],
    ["Cricket Experiences NZ", -36.89, 174.8],
    ["Outback Experiences NZ", -40.76, 175.1]
  ],
  Reserves : [
    ["Withiel Thomas Reserve", -36.87, 174.77],
    ["Hinewai Reserve", -43.80, 173.03],
    ["Tauparikaka Marine Reserve", -43.75, 169.14],
    ["Taupae Marine Reserve", -39.05, 174.0]
  ],
  Music : [
    ["Festival One", -37.87, 175.34],
    ["Rhythm and Vines", -38.59, 177.9],
    ["Splore Festival", -36.97, 175.25],
    ["Jim Beam Homegrown", -41.28, 174.75]
  ],
  Cultural : [
    ["W.O.W.A @ Te Papa Museum", -41.29, 174.78],
    ["Hobbiton Tours", -37.87, 175.68],
    ["Balloons over Waikato", -37.80, 175.27],
    ["Art Deco Weekend", -39.48, 176.91]
  ],
  Sporting : [
    ["ASB Tennis Arena", -36.85, 174.77],
    ["Seddon Park", -37.78, 175.27],
    ["ASB Sports Center", -41.31, 174.80],
    ["Lancaster Park Stadium", -43.53, 172.65]
    
  ]
};
var slideCount = [[1], [3]];
var imgCount = [[1], [3]];
var p = Math.min(...imgCount);
var s = Math.min(...slideCount);
var pMax = Math.max(...imgCount);
var sMax = Math.max(...slideCount);

let i = p;

//------------------------------------------------------------------------------
//run Function
//autoSlides();
setInterval(counter, 1200)

async function counter() {     
  x = s;
  while (x <= (sMax)){
    document.querySelectorAll(".slide" + x).forEach(function(rem){
      rem.style.display = "none";
    document.getElementById("s" + x + "sImg" + i).style.display = "flex";
    });
    await sleep(400);
    x++;
  };
  i++;
  if (i > (pMax)){
    console.log('reset image');
    i = p;
  }; 
};


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



//---------------------------------------------------------------------------


function openTab(tabName) {
  tabSet = tabName
  var i;
  var x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  };
  document.getElementById(tabName).style.display = "flex";
  
}

//---------------------------------------------------------------------------


function openPage(pageName, markerID) {
  var i;
  var x = document.getElementsByClassName("page");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  };
  document.getElementById(pageName).style.display = "flex";
  mapInteractive();
  updateMapInteractive(markerID)
}


//---------------------------------------------------------------------------


function validateForm() {

  //Checks if the email is a valid email
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(contact.emailInput.value)){
    
    //If the email is valid, Checks if the question box has been filled
    if (/[\s\S]/.test(contact.textInput.value)){

      //Submits the form
      return (true);
    }

    //If the email is valid, but the box is not filled, set the box message to 'block' and the email to 'none'
    document.getElementById("textFalse").style.display = "block";
    document.getElementById("emailFalse").style.display = "none";

    //Does not submit the form
    return (false);
  }
  
  //If the email is not valid, but the box is filled, set the email message to 'block' and the box message to 'none'
  if (/[\s\S]/.test(contact.textInput.value)){
    document.getElementById("textFalse").style.display = "none";
    document.getElementById("emailFalse").style.display = "block";

    //Does not submit the form
    return (false);
  }

  //if neither are filled, display both the invalid email and the not filled box message
  document.getElementById("textFalse").style.display = "block";
  document.getElementById("emailFalse").style.display = "block";
  
  //Does not submit the form
  return (false);
}


//---------------------------------------------------------------------------

function attractionPage(){
  tabSet = 'Entertainment'
}
function eventPage(){
  tabSet = 'Music'
}


function mapInteractive(){  

  mymap = L.map('mapid').setView([-41.2, 174.7], 5); 

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    minZoom: 5,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>', 
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
  }).addTo(mymap);

  var southWest = L.latLng(-49.16124002156627, 187), northEast = L.latLng(-31.99964385636044, 161);
  var bounds = L.latLngBounds(southWest, northEast);

  mymap.setMaxBounds(bounds);
  mymap.on('drag', function() {
	  mymap.panInsideBounds(bounds, { animate: false });
  });
  return;
};


function updateMapInteractive(markerID){

  for (i=0;i<points.length;i++) {
    mymap.removeLayer(points[i]);
  };
  points=[];
  
  curTab = tabSet;
  for (var i = 0; i < obj[curTab].length; i++) {
    marker = new L.marker([obj[curTab][i][1], obj[curTab][i][2]])
      .bindPopup('<a href="https://www.google.com/search?q=' + obj[curTab][i][0] + '">' + obj[curTab][i][0] + '</a>')
      .addTo(mymap);
      points.push(marker);
  };
}



//-------------------------------Things to ignore--------------------------------------------


// async function autoSlides() {
//   for (var ss = 1 ; ss < 4 ; ss++){
//     var sSlide = ("s"+ ss + "sImg"); 
//     document.getElementById(sSlide+currSlide).style.display = "none";    
//     currSlide++;
//     if (maxSlide < currSlide) {currSlide = 1};    
//     document.getElementById(sSlide+currSlide).style.display = "block";
//     await sleep(1750);
//   }
//   setTimeout(autoSlides, 500);
// } 



// async function autoSlides() {
//   var i;
//   var count = [[1], [1], [1]];
//   for (i = 0; i < 3; i++){
//     var sSlide = ("s"+ (i + 1) + "sImg");
//     console.log("s"+ (i + 1) + "sImg");
//     console.log(addCount);
//     document.querySelectorAll(".slide" + (i + 1)).forEach(function(rem){
//       rem.style.display = "none";
//     });
//     document.getElementById(sSlide + count[i]).style.display = 'block';
//     addCount++;
//     count[i] = addCount;
//     await sleep(1750);
//   };
//   setTimeout(autoSlides, 500);
// };

/*
  var Entertainment = [
    ["Fear Factory Queenstown", -45.03, 168.65],
    ["Formula Challenge", -38.66, 176.14],
    ["Seal Swim Kaikoura", -42.40, 173.68],
    ["Rainbows End", -36.99, 174.88]
  ];

  var Experiences = [
    ["Northland Experiences", -35.20, 173.9],
    ["Envy Experiences", -45.42, 167.71],
    ["Cricket Experiences NZ", -36.89, 174.8],
    ["Outback Experiences NZ", -40.76, 175.1]
  ];

  var Reserves = [
    ["Withiel Thomas Reserve", -36.87, 174.77],
    ["Hinewai Reserve", -43.80, 173.03],
    ["Tauparikaka Marine Reserve", -43.75, 169.14],
    ["Taupae Marine Reserve", -39.05, 174.0]
  ];

  var Music = [
    ["Festival One", -37.87, 175.34],
    ["Rhythm and Vines", -38.59, 177.9],
    ["Splore Festival", -36.97, 175.25],
    ["Jim Beam Homegrown", -41.28, 174.75]
  ];

  var Culture = [
    ["W.O.W.A @ Te Papa Museum", -41.29, 174.78],
    ["Hobbiton Tours", -37.87, 175.68],
    ["Balloons over Waikato", -37.80, 175.27],
    ["Art Deco Weekend", -39.48, 176.91]
  ];

  var Sporting = [

  ];
*/

/*
Entertainment

["Rainbows End", -36.99, 174.88]
["Fear Factory Queenstown", -45.03, 168.65]
["Formula Challenge", -38.66, 176.14]
["Seal Swim Kaikoura", -42.40, 173.68]


Experiences

["Outback Experiences NZ", -40.76, 175.1]
["Northland Experiences", -35.20, 173.9]
["Envy Experiences", -45.42, 167.71]
["Cricket Experiences NZ", -36.89, 174.8]


Reserves

["Taupae Marine Reserve", -39.05, 174.0]
["Withiel Thomas Reserve", -36.87, 174.77]
["Hinewai Reserve", -43.80, 173.03]
["Tauparikaka Marine Reserve", -43.75, 169.14]


Events
Music

["Jim Beam Homegrown", -41.28, 174.75]
["Festival One", -37.87, 175.34]
["Rhythm and Vines", -38.59, 177.9]
["Splore Festival", -36.97, 175.25]


Arts and Culture

["Art Deco Weekend", -39.48, 176.91]
["W.O.W.A @ Te Papa Museum", -41.29, 174.78]
["Hobbiton Tours", -37.87, 175.68]
["Balloons over Waikato", -37.80, 175.27]

Sporting
*/