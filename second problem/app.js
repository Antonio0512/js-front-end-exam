window.addEventListener("load", solve);

function solve() {
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const labelInput = document.getElementById("label");
    const pointsInput = document.getElementById("points");
    const assigneeInput = document.getElementById("assignee");
    const btnCreate = document.getElementById("create-task-btn");
    const btnDelete = document.getElementById("delete-task-btn");
    const totalPointsEl = document.getElementById("total-sprint-points");

    const myObj = {};

    let totalPoints = 0;

    let taskCount = 0;

    btnCreate.addEventListener("click", onClick);
    btnDelete.addEventListener("click", onDelete);

    function onClick(e) {
        if (e) {
            e.preventDefault();
        }

        if (validityCheck()) {
            return;
        }

        const title = titleInput.value;
        const description = descriptionInput.value;
        const label = labelInput.value;
        const points = pointsInput.value;
        const assignee = assigneeInput.value;

        taskCount++;
        let tempTaskId = `task-${taskCount}`;

        myObj[tempTaskId] = { title, description, label, points, assignee };

        totalPoints += Number(myObj[tempTaskId].points);
        totalPointsEl.textContent = `Total Points ${totalPoints}pts`;

        const articleEl = document.createElement("article");
        articleEl.id = tempTaskId;
        articleEl.className = "task-card";

        const labelDiv = labelDivHandler();

        const h3El = document.createElement("h3");
        h3El.className = "task-card-title";
        h3El.textContent = titleInput.value;

        const pEl = document.createElement("p");
        pEl.className = "task-card-description";
        pEl.textContent = descriptionInput.value;

        const pointsDiv = document.createElement("div");
        pointsDiv.className = "task-card-points";
        pointsDiv.textContent = `Estimated at ${pointsInput.value} pts`;

        const assigneeDiv = document.createElement("div");
        assigneeDiv.className = "task-card-assignee";
        assigneeDiv.textContent = `Assigned to: ${assigneeInput.value}`;

        const actionsDiv = document.createElement("div");
        actionsDiv.className = "task-card-actions";

        const btnDel = document.createElement("button");
        btnDel.textContent = "Delete";
        btnDel.addEventListener("click", onLoadDelete);

        actionsDiv.appendChild(btnDel);

        articleEl.appendChild(labelDiv);
        articleEl.appendChild(h3El);
        articleEl.appendChild(pEl);
        articleEl.appendChild(pointsDiv);
        articleEl.appendChild(assigneeDiv);
        articleEl.appendChild(actionsDiv);

        document.getElementById("tasks-section").appendChild(articleEl);

        clearInputs();
    }

    function onLoadDelete(e) {
        const id = e.target.parentNode.parentNode.id;
        const buttonText = e.target.textContent;

        titleInput.value = myObj[id].title;
        descriptionInput.value = myObj[id].description;
        labelInput.value = myObj[id].label;
        pointsInput.value = myObj[id].points;
        assigneeInput.value = myObj[id].assignee;

        btnDelete.disabled = false;
        btnCreate.disabled = true;

        document.getElementById("task-id").value = id;

        disableInputs()
    }

    function onDelete() {
        const id = document.getElementById("task-id").value;

        totalPoints -= Number(myObj[id].points);
        totalPointsEl.textContent = `Total Points ${totalPoints}pts`;

        document.getElementById(id).remove();
        delete myObj[id];

        btnCreate.disabled = false;
        btnDelete.disabled = true;

        clearInputs();
        enableInputs();
    }

    function validityCheck() {
        if (
            titleInput.value === "" ||
            descriptionInput.value === "" ||
            labelInput.value === "" ||
            pointsInput.value === "" ||
            assigneeInput.value === ""
        ) {
            return true;
        }
    }

    function labelDivHandler() {
        if (labelInput.value === "Feature") {
            const labelDiv = document.createElement("div");
            labelDiv.className = labelData();
            labelDiv.innerHTML = "Feature &#8865;";
            return labelDiv;
        } else if (labelInput.value === "Low Priority Bug") {
            const labelDiv = document.createElement("div");
            labelDiv.className = labelData();
            labelDiv.innerHTML = "Low Priority Bug &#9737;";
            return labelDiv;
        } else if (labelInput.value === "High Priority Bug") {
            const labelDiv = document.createElement("div");
            labelDiv.className = labelData();
            labelDiv.innerHTML = "High Priority Bug &#9888;";
            return labelDiv;
        }
    }

    function labelData() {
        if (labelInput.value === "Feature") {
            return "task-card-label feature";
        } else if (labelInput.value === "Low Priority Bug") {
            return "task-card-label low-priority";
        } else if (labelInput.value === "High Priority Bug") {
            return "task-card-label high-priority";
        }
    }

    function clearInputs() {
        titleInput.value = "";
        descriptionInput.value = "";
        labelInput.value = "";
        pointsInput.value = "";
        assigneeInput.value = "";
    }

    function disableInputs() {
        titleInput.disabled = true;
        descriptionInput.disabled = true;
        labelInput.disabled = true;
        pointsInput.disabled = true;
        assigneeInput.disabled = true;
    }

    function enableInputs() {
        titleInput.disabled = false;
        descriptionInput.disabled = false;
        labelInput.disabled = false;
        pointsInput.disabled = false;
        assigneeInput.disabled = false;
    }
}