var firebaseConfig = {
  apiKey: "AIzaSyBRXmVrTHBVgNRdvJLc4WBvOyhiio3I3hU",
  authDomain: "wily-app-c50ff.firebaseapp.com",
  databaseURL: "https://wily-app-c50ff-default-rtdb.firebaseio.com",
  projectId: "wily-app-c50ff",
  storageBucket: "wily-app-c50ff.appspot.com",
  messagingSenderId: "148773051634",
  appId: "1:148773051634:web:f6479bf8a2aa95a5bdc46b"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  function addUser()
  {

    user_name = localStorage.getItem("user_name").value;
    document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

  }
  
  function addRoom()
  {

    room_name=document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({purpose : "adding room name"});
    localStorage.setItem("room_name",room_name);
    window.location="kwitter_page.html"
    
  }

  function getData()
  {

    firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key;
    Room_names=childKey;
    console.log("Room Name - " + Room_names);
    row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
    document.getElementById("output").innerHTML += row;
        });
        });

        }

getData();
 function redirectToRoomName(name)

 {
console.log(name);
localStorage.setItem("room_name", name);
window.location="kwitter_page.html";

 }

 function logout()
 {

localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location="kwitter.html";
 }
