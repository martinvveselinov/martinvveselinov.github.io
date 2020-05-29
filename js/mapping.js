       var timerVar;
       var totalminutes;
      var map;
      var bikes = [];
      var stands = [];
      var positions = [];
      var current;
      var cur_pos;
      function initMap(){
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 13
        });
        if(navigator.geolocation){
          var cur_pos;
                  navigator.geolocation.getCurrentPosition(function(position) {
            cur_pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
      var infowindow = new google.maps.InfoWindow();
      var type = [];
      var curr_type = "here";
      type[0] = "BMX";
      type[1] = "Balkanche";
      type[2] = "Trikolka";
      type[3] = "Kolichka";
      type[4] = "Trotinetka";
      type[5] = "bike";
      current = new google.maps.Marker({position: cur_pos, map: map, icon: '../img/here.png'});
      current.addListener('click', function() {
              infowindow.close();
              infowindow = new google.maps.InfoWindow({
                content: "You are here!"  
              });
              infowindow.open(map, current);
          });  
     
      var total = (Math.floor(Math.random() * 25) + 1);
      var total_stands = (Math.floor(Math.random() * 10) + 1);
      document.getElementById("cnt").innerHTML += total;
      var i;
    /*  for(i = 0; i < total_stands; ++i){
        var free = Math.floor(Math.random() * 5) + 1;
        var posi = {
          lat: position.coords.latitude + (Math.floor(Math.random() * 199) -99)/5000,
          lng: position.coords.longitude - (Math.floor(Math.random() * 199) -99)/5000
        }
        stands[i] = new google.maps.Marker({position: posi, free: free, map: map, icon: '../img/bikestand.png'});
        stands[i].setVisible(false);
      }*/
      for(i = 0; i < total; ++i){
        var typ = type[Math.floor(Math.random() * 5)];
        var battery = Math.floor(Math.random() * 100);
        var posi = {
                lat: position.coords.latitude + (Math.floor(Math.random() * 199) -99)/5000,
                lng: position.coords.longitude - (Math.floor(Math.random() * 199) -99)/5000
              }
        bikes[i] = new google.maps.Marker({position: posi, type: typ, battery: battery, map: map, icon: '../img/current.png'});
        
        bikes[i].addListener('click', (function(marker, i) {
           return function() {
            infowindow.close();
            from = current.position;
            to = marker.position;
            dist = Math.floor(Spherical.computeDistanceBetween(from, to));

            infowindow = new google.maps.InfoWindow({
              content: "Distance from you: " + dist + " m.<br>Bike type: " + bikes[i].type + "<br>Remaining battery: " + bikes[i].battery + "%<br><button type=\"buttton\" onclick=\"unlockBike(\'" +this.position+ "\',\'start\');\">Start session</button>"
            }); 
            infowindow.open(map, this);
            }
        })(bikes[i], i));
      }
       for(i = 0; i < total_stands; ++i){
        var free = Math.floor(Math.random() * 5);
        var posi = {
          lat: position.coords.latitude + (Math.floor(Math.random() * 199) -99)/5000,
          lng: position.coords.longitude - (Math.floor(Math.random() * 199) -99)/5000
        }
        stands[i] = new google.maps.Marker({position: posi, free: free, map: map, icon: '../img/bikestand.png'});
        stands[i].setVisible(false);
        stands[i].addListener('click', (function(stand, i) {
           return function() {
            infowindow.close();
            from = current.position;
            to = stand.position;
            dist = Math.floor(Spherical.computeDistanceBetween(from, to));

        infowindow = new google.maps.InfoWindow({
          content: "Distance from you: " + dist + " m.<br>Free slots: " + stands[i].free + "<br>"}); 
        //unlockBike(this);
        infowindow.open(map, this);
         }
    })(stands[i], i));
      }
            map.setCenter(cur_pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });

     } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      function showAll(type){
      var i;
      if(type == 'bikes'){
        for (i = 0; i < bikes.length; i++){
          marker = bikes[i];
          marker.setVisible(true);
        }
        for (i = 0; i < stands.length; i++){
          marker = stands[i];
          marker.setVisible(false);
          
        } 
      }
      else{
       for (i = 0; i < stands.length; i++){
          marker = stands[i];
          marker.setVisible(true); 
        } 
        for (i = 0; i < bikes.length; i++){
        marker = bikes[i];
        marker.setVisible(false);
        }
      }
    }
     
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
      finishpayment = function(){
        document.getElementById("bill").setAttribute("hidden", true);
        document.getElementById("bill").innerHTML = "";
        document.getElementById("pay").setAttribute("hidden", true);
        document.getElementById("pay").innerHTML = "";
        document.getElementById("stop").setAttribute("hidden", true);
        document.getElementById("stop").innerHTML = "";
        document.getElementById("minutes").setAttribute("hidden", true);
        document.getElementById("minutes").innerHTML = "";
        document.getElementById("card-info").setAttribute("hidden", true);
        document.getElementById("finishpay").setAttribute("hidden", true);
        document.getElementById("finishpay").innerHTML = "";
      }
      revealPay = function(){
        document.getElementById("card-info").removeAttribute("hidden");
      }
      pay = function(value){
        document.getElementById("finishpay").removeAttribute("hidden");
        document.getElementById("finishpay").innerHTML = "Finish payment";
        var bill = totalminutes*0.39;
        if(value == "card"){
          alert("Credit/debit card");
        }
        else if(value == "voucher"){
          alert("Voucher");
        }
        else alert("problem");
      }
      filterMarkers = function(type, category){
        if(type == "all"){
          for (i = 0; i < bikes.length; i++) {
            marker = bikes[i];
            if(marker.getVisible() == "false"){
              marker.setVisible(true);
            }
          }
        }  
        else if(type == "type"){
          for (i = 0; i < bikes.length; i++) {
              marker = bikes[i];
              if(marker.type == category || category == 'all'){
                if(marker.getVisible() == "false"){
                  //marker.setVisible(true);
                }
              }
              else{          
                  marker.setVisible(false);
              }
          }  
        }
        else if(type == "battery"){
          for (i = 0; i < bikes.length; i++){
            marker = bikes[i];
            if(parseInt(marker.battery) >= parseInt(category) - 9 && parseInt(marker.battery) <= parseInt(category) || category == 'all'){
                marker.setVisible(true);
            }
            else{
                marker.setVisible(false);
            }
          }  
        }
        else if(type == "location"){
          var from, to;
          for (i = 0; i < bikes.length; i++){
            marker = bikes[i];
            from = current.position;
            to = bikes[i].position;
            if(Spherical.computeDistanceBetween(from, to) <= parseInt(category) || category == 'all')
            {
                marker.setVisible(true);
            }
            else
            {          
                marker.setVisible(false);
            }
          }  
        }           
      }
      var unlockBike = function(marker, status){
          var test = JSON.parse(JSON.stringify(marker));
          document.getElementById("stop").innerHTML = "End session";
          document.getElementById("stop").removeAttribute("hidden");
          document.getElementById("stop").style.borderRight = "2px solid black";
          for(var i = 0; i < bikes.length; ++i){
            if(test != bikes[i].position){
              bikes[i].setVisible(false);
            }
          }
          timerVar = setInterval(countTimer, 1000);
          var totalSeconds = 0;
          function countTimer() {
           ++totalSeconds;
           var hour = Math.floor(totalSeconds /3600);
           var minute = Math.floor((totalSeconds - hour*3600)/60);
           var seconds = totalSeconds - (hour*3600 + minute*60);
           if(hour < 10)
             hour = "0"+hour;
           if(minute < 10)
             minute = "0"+minute;
           if(seconds < 10)
             seconds = "0"+seconds;
           document.getElementById("minutes").innerHTML = hour + ":" + minute + ":" + seconds;
           totalminutes = hour*60 + minute;
          }
        }
      function stop(){
        document.getElementById("pay").removeAttribute("hidden");
        document.getElementById("pay").innerHTML = "Pay";
        document.getElementById("bill").removeAttribute("hidden");
        document.getElementById("bill").innerHTML = "Bill: " + totalminutes*0.39;
        clearInterval(timerVar);
        for(var i = 0; i < bikes.length; ++i){
              bikes[i].setVisible(true);
        }
        var minutesLabel = document.getElementById("minutes");
        minutesLabel.setAttribute("hidden", true);
        minutesLabel.innerHTML = "";
        document.getElementById("stop").removeAttribute("style");
        document.getElementById("stop").setAttribute("hidden", true);
        document.getElementById("stop").innerHTML = "";
      }
    
    function show(type){
      if(type == "all"){
        
      }  
    else{
      var x = document.getElementById(type);

      if(x.hasAttribute("hidden")){
        x.removeAttribute("hidden");
      }
      else x.setAttribute("hidden", true);
      
    }
    }
    function openSlideMenuTemplate(menu){
      var id = "side-menu-" + menu;
      document.getElementById(id).style.width = '260px';
      document.getElementById('map').style.marginLeft = '260px';
    }
    function closeSlideMenuTemplate(menu){
      var id = "side-menu-" + menu;
      document.getElementById(id).style.width = '0';
      if(menu == 'acc'){
        document.getElementById('map').style.marginLeft = '0';
      }
    }
    function logout(){
      var txt;
      var r = confirm("Are you sure you want to logout?");
      if (r == true) {
        txt = "See you soon!";
        window.location.href = "../index.html";
      } else {
        txt = "Logout cancelled!";
      }
    }