import React, { useState } from 'react';

function App() {
  const notificationSound = new Audio(process.env.PUBLIC_URL + "/notification-sound.mp3"); // Replace with your sound file
  const [permission, setPermission] = useState(Notification.permission);

  const handleNotificationClick = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification.");
    } else if (permission === "granted") {
      notificationSound.play(); // Play the notification sound
      const notification = new Notification("Hello from Push Notification!", {
        icon: process.env.PUBLIC_URL + "/logo192.png",
        body: "This is a sample push notification using React.",
      });

      notification.onclick = () => {
        console.log("Notification clicked!");
      };
    } else if (permission !== "denied") {
      Notification.requestPermission().then((newPermission) => {
        if (newPermission === "granted") {
          setPermission(newPermission);
          handleNotificationClick();
        }
      });
    }
  }

  return (
    <div className="App">
      <h1>React Push Notifications</h1>
      <button onClick={handleNotificationClick}>Show Notification</button>
    </div>
  );
}

export default App;
