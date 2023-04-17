function attachEvents() {
    const BASE_URL = "http://localhost:3030/jsonstore/tasks/";
    const toDoUl = document.querySelector("#todo-section .task-list");
    const inProgressUl = document.querySelector(
        "#in-progress-section .task-list"
    );
    const codeReviewUl = document.querySelector(
        "#code-review-section .task-list"
    );
    const doneUl = document.querySelector("#done-section .task-list");

    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");

    const loadBtn = document.getElementById("load-board-btn");
    const addBtn = document.getElementById("create-task-btn");

    loadBtn.addEventListener("click", onLoad);
    addBtn.addEventListener("click", onAdd);

    async function onLoad(e) {
        if (e) {
            e.preventDefault();
        }

        clearAll();

        const response = await fetch(BASE_URL);
        const data = await response.json();

        for (const { title, description, status, _id } of Object.values(data)) {
            if (status === "ToDo") {
                const liEl = document.createElement("li");
                liEl.className = "task";
                const h3El = document.createElement("h3");
                h3El.textContent = title;
                const pEl = document.createElement("p");
                pEl.textContent = description;
                const btnEl = document.createElement("button");
                btnEl.textContent = "Move to In Progress";
                btnEl.addEventListener("click", onUpdate);
                btnEl.id = _id;
                liEl.appendChild(h3El);
                liEl.appendChild(pEl);
                liEl.appendChild(btnEl);
                toDoUl.appendChild(liEl);
            } else if (status === "In Progress") {
                const liEl = document.createElement("li");
                liEl.className = "task";
                const h3El = document.createElement("h3");
                h3El.textContent = title;
                const pEl = document.createElement("p");
                pEl.textContent = description;
                const btnEl = document.createElement("button");
                btnEl.textContent = "Move to Code Review";
                btnEl.addEventListener("click", onUpdate);
                btnEl.id = _id;
                liEl.appendChild(h3El);
                liEl.appendChild(pEl);
                liEl.appendChild(btnEl);
                inProgressUl.appendChild(liEl);
            } else if (status === "Code Review") {
                const liEl = document.createElement("li");
                liEl.className = "task";
                const h3El = document.createElement("h3");
                h3El.textContent = title;
                const pEl = document.createElement("p");
                pEl.textContent = description;
                const btnEl = document.createElement("button");
                btnEl.textContent = "Move to Done";
                btnEl.addEventListener("click", onUpdate);
                btnEl.id = _id;
                liEl.appendChild(h3El);
                liEl.appendChild(pEl);
                liEl.appendChild(btnEl);
                codeReviewUl.appendChild(liEl);
            } else if (status === "Done") {
                const liEl = document.createElement("li");
                liEl.className = "task";
                const h3El = document.createElement("h3");
                h3El.textContent = title;
                const pEl = document.createElement("p");
                pEl.textContent = description;
                const btnEl = document.createElement("button");
                btnEl.textContent = "Close";
                btnEl.addEventListener("click", onUpdate);
                btnEl.id = _id;
                liEl.appendChild(h3El);
                liEl.appendChild(pEl);
                liEl.appendChild(btnEl);
                doneUl.appendChild(liEl);
            }
        }
    }

    async function onAdd(e) {
        if (e) {
            e.preventDefault();
        }

        const title = titleInput.value;
        const description = descriptionInput.value;
        const status = "ToDo";

        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ title, description, status }),
        };

        await fetch(BASE_URL, options);
        titleInput.value = "";
        descriptionInput.value = "";
        onLoad();
    }

    async function onUpdate(e) {
        if (e) {
            e.preventDefault();
        }

        if (e.target.textContent === "Move to In Progress") {
            let status = "In Progress";
            const options = {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ status }),
            };
            
            await fetch(`${BASE_URL}${e.target.id}`, options);

        } else if (e.target.textContent === "Move to Code Review") {
            let status = "Code Review";
            const options = {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ status }),
            };

            await fetch(`${BASE_URL}${e.target.id}`, options);

        } else if (e.target.textContent === "Move to Done") {
            let status = "Done";
            const options = {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ status }),
            };

            await fetch(`${BASE_URL}${e.target.id}`, options);

        } else if (e.target.textContent === 'Close') {
            const options = {
                method: "DELETE"
            }

            await fetch(`${BASE_URL}${e.target.id}`, options)
        }

        onLoad();
    }

    function clearAll() {
        toDoUl.innerHTML = "";
        inProgressUl.innerHTML = "";
        codeReviewUl.innerHTML = "";
        doneUl.innerHTML = "";
    }
}

attachEvents();
