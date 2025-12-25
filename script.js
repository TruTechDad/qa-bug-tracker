const bugForm = document.getElementById("bugForm");
const bugList = document.getElementById("bugList");

let bugs = JSON.parse(localStorage.getItem("bugs")) || [];

function saveBugs() {
  localStorage.setItem("bugs", JSON.stringify(bugs));
}

function renderBugs() {
  bugList.innerHTML = "";

  bugs.forEach((bug, index) => {
    const div = document.createElement("div");
    div.className = "bug";

    div.innerHTML = `
      <h3>${bug.title}</h3>
      <p>${bug.description}</p>
      <span class="badge ${bug.priority.toLowerCase()}">${bug.priority}</span>
      <p>Status: ${bug.status}</p>
      <button onclick="updateStatus(${index})">Resolve</button>
      <button onclick="deleteBug(${index})">Delete</button>
    `;

    bugList.appendChild(div);
  });
}

bugForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newBug = {
    title: title.value,
    description: description.value,
    priority: priority.value,
    status: "Open",
    created: new Date().toLocaleString(),
  };

  bugs.push(newBug);
  saveBugs();
  renderBugs();
  bugForm.reset();
});

function updateStatus(index) {
  bugs[index].status = "Resolved";
  saveBugs();
  renderBugs();
}

function deleteBug(index) {
  bugs.splice(index, 1);
  saveBugs();
  renderBugs();
}

renderBugs();
