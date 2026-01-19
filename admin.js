if (localStorage.getItem("auth") !== "yes") {
  location.href = "login.html";
}

let pptData = null;

function loadJSON(e) {
  const reader = new FileReader();
  reader.onload = ev => {
    pptData = JSON.parse(ev.target.result);
    localStorage.setItem("pptData", JSON.stringify(pptData));
    render();
  };
  reader.readAsText(e.target.files[0]);
}

function render() {
  const box = document.getElementById("adminList");
  box.innerHTML = "";

  pptData.presentations.forEach((p, i) => {
    box.innerHTML += `
      <div class="item">
        <b>${p.pptName}</b><br>
        Team: ${p.teamName}
        <select onchange="updateStatus(${i}, this.value)">
          <option ${p.status=="Upcoming"?"selected":""}>Upcoming</option>
          <option ${p.status=="Ongoing"?"selected":""}>Ongoing</option>
          <option ${p.status=="Completed"?"selected":""}>Completed</option>
        </select>
      </div>
    `;
  });
}

function updateStatus(i, val) {
  pptData.presentations[i].status = val;

  if (val === "Ongoing") {
    pptData.currentPPT = pptData.presentations[i].pptName;
  }

  localStorage.setItem("pptData", JSON.stringify(pptData)); // AUTO SAVE
}

function openLive() {
  window.open("live.html", "_blank");
}
