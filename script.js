// Contact Form Validation using JavaScript
document.getElementById("contactForm") && 
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Stop page from refreshing

  var name    = document.getElementById("name").value;
  var email   = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var msg     = document.getElementById("formMsg");

  if (name === "" || email === "" || message === "") {
    msg.style.color = "red";
    msg.textContent = "Please fill in all fields!";
    return;
  }

  // Send data to Node.js backend (Phase 5)
  fetch("http://localhost:5000/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message })
  })
  .then(res => res.json())
  .then(data => {
    msg.style.color = "green";
    msg.textContent = "Message sent successfully!";
    document.getElementById("contactForm").reset();
  })
  .catch(err => {
    msg.style.color = "red";
    msg.textContent = "Error sending message. Is the server running?";
  });
});
