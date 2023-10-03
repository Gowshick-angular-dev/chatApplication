
function sendNotification(message, user) {
    document.onvisibilitychange = ()=> {
      if(document.hidden) {
        const notification = new Notification("New message from Open Chat", {
          icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
          body: `@${user}: ${message}`
        })
        notification.onclick = ()=> function() {
          window.open("http://192.168.1.18:3001/chat")
        //   window.open("http://localhost:3001/chat")
        }
      }
    }  
}

export default function checkPageStatus(message, user) {
    if(!("Notification" in window)) {
      alert("This browser does not support system notifications!")
    } 
    else if(Notification.permission === "granted") {
      sendNotification(message, user)
    }
    else if(Notification.permission !== "denied") {
       Notification.requestPermission((permission)=> {
          if (permission === "granted") {
            sendNotification(message, user)
          }
       })
    }
}