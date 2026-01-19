function load() {
  const data = JSON.parse(localStorage.getItem("pptData"));
  if (!data) return;

  document.getElementById("total").innerText = data.presentations.length;
  document.getElementById("current").innerText = data.currentPPT;

  const list = document.getElementById("list");
  list.innerHTML = "";

  let count = {Ongoing:0, Completed:0, Upcoming:0};

  data.presentations.forEach(p => {
    count[p.status]++;
    list.innerHTML += `
      <div class="item">
        <b>${p.pptName}</b> - ${p.teamName}
        <span class="${p.status}">${p.status}</span>
      </div>
    `;
  });

  drawChart(count);
}

let chart;
function drawChart(c) {
  const ctx = document.getElementById("chart");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Ongoing", "Completed", "Upcoming"],
      datasets: [{
        data: [c.Ongoing, c.Completed, c.Upcoming]
      }]
    }
  });
}

load();
setInterval(load, 5000); // AUTO REFRESH
