function counter() {
  var slideCount = [[1], [3]];
  var imgCount = [[1], [3]];
  var p = Math.min(...imgCount);
  var s = Math.min(...slideCount);
  var pMax = Math.max(...imgCount);
  var sMax = Math.max(...slideCount);

  let i = p;
  let x = s;
  console.log('the value of i is ' + i);

  if (i > pMax){
    console.log('reset image');
    i = p;
    if (x > sMax){
      console.log('reset slide');
      x = s;
    };
  };


  console.log('start removal');
    
  while (x < (sMax + 1)){
    document.querySelectorAll(".slide" + x).forEach(function(rem){
      rem.style.display = "none";
      console.log('removed image');
    });

    x++;

    console.log(".slide" + x + "Img" + i);
  };

  i++
  console.log('the value of i is ' + i);
};