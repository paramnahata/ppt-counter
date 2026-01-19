fetch("data.json")
    .then(res => res.json())
    .then(data => {
        document.getElementById("totalPPT").innerText = data.presentations.length;
        document.getElementById("currentPPT").innerText = data.currentPPT;

        const pptList = document.getElementById("pptList");

        data.presentations.forEach(ppt => {
            const div = document.createElement("div");
            div.className = "ppt-card";

            div.innerHTML = `
                <h3>${ppt.pptName}</h3>
                <p>Team: ${ppt.teamName}</p>
                <p class="status ${ppt.status}">${ppt.status}</p>
            `;

            pptList.appendChild(div);
        });
    })
    .catch(err => {
        console.error("Error loading data:", err);
    });
