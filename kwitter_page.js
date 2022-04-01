var firebaseConfig = {
  apiKey: "AIzaSyBRXmVrTHBVgNRdvJLc4WBvOyhiio3I3hU",
  authDomain: "wily-app-c50ff.firebaseapp.com",
  databaseURL: "https://wily-app-c50ff-default-rtdb.firebaseio.com",
  projectId: "wily-app-c50ff",
  storageBucket: "wily-app-c50ff.appspot.com",
  messagingSenderId: "148773051634",
  appId: "1:148773051634:web:f6479bf8a2aa95a5bdc46b"
};
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
	room_name = localStorage.getItem("room_name");

function send() {
  msg = document.getElementById("msg").value;
  console.log("This is send function")
  console.log(room_name)
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });
  document.getElementById("msg").value = "";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("kwitter.html");
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        console.log(message_data);
        console.log(firebase_message_id);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLikes(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>"
        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
      }
    });
  });
}

getData();

function updateLikes(message_id) {
  console.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);
  firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes
  });

}