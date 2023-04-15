function solve(array) {
  const assigneeObj = {};

  let toDoPoints = 0;
  let inProgressPoints = 0;
  let CodeReviewPoints = 0;
  let DonePoints = 0;

  const numberOfAssignees = array.shift();

  for (let index = 0; index < numberOfAssignees; index++) {
    const [assignee, taskId, title, status, estimatedPoints] = array
      .shift()
      .split(":");
    if (assigneeObj.hasOwnProperty(assignee)) {
      assigneeObj[assignee][taskId] = { title, status, estimatedPoints };
    } else {
      assigneeObj[assignee] = {};
      assigneeObj[assignee][taskId] = { title, status, estimatedPoints };
    }
  }

  for (const line of array) {
    const command = line.split(":")[0];
    if (command == "Add New") {
      const [assignee, taskId, title, status, estimatedPoints] = line
        .split(":")
        .slice(1);
      if (!assigneeObj.hasOwnProperty(assignee)) {
        console.log(`Assignee ${assignee} does not exist on the board!`);
      } else {
        assigneeObj[assignee][taskId] = { title, status, estimatedPoints };
      }
    } else if (command == "Change Status") {
      const [assignee, taskId, newStatus] = line.split(":").slice(1);

      if (!assigneeObj.hasOwnProperty(assignee)) {
        console.log(`Assignee ${assignee} does not exist on the board!`);
        continue;
      }

      if (!assigneeObj[assignee].hasOwnProperty(taskId)) {
        console.log(`Task with ID ${taskId} does not exist for ${assignee}!`);
        continue;
      }

      assigneeObj[assignee][taskId].status = newStatus;
    } else if (command == "Remove Task") {
      const [assignee, index] = line.split(":").slice(1);

      if (!assigneeObj.hasOwnProperty(assignee)) {
        console.log(`Assignee ${assignee} does not exist on the board!`);
        continue;
      }

      const assigneeArray = Array.from(Object.keys(assigneeObj[assignee]));

      if (index < 0 || index >= assigneeArray.length) {
        console.log("Index is out of range!");
        continue;
      }

      let objToDelete = assigneeArray.filter(
        (task) => assigneeArray.indexOf(task) == Number(index)
      )[0];
      delete assigneeObj[assignee][objToDelete];
    }
  }
  for (const key in assigneeObj) {
    for (const key2 in assigneeObj[key]) {
      let data = assigneeObj[key][key2];

      if (data.status == "ToDo") {
        toDoPoints += Number(data.estimatedPoints);
      } else if (data.status == "In Progress") {
        inProgressPoints += Number(data.estimatedPoints);
      } else if (data.status == "Code Review") {
        CodeReviewPoints += Number(data.estimatedPoints);
      } else if (data.status == "Done") {
        DonePoints += Number(data.estimatedPoints);
      }
    }
  }
  console.log(`ToDo: ${toDoPoints}pts`);
  console.log(`In Progress: ${inProgressPoints}pts`);
  console.log(`Code Review: ${CodeReviewPoints}pts`);
  console.log(`Done Points: ${DonePoints}pts`);

  if (DonePoints >= toDoPoints + inProgressPoints + CodeReviewPoints) {
    console.log("Sprint was successful!");
  } else {
    console.log("Sprint was unsuccessful...");
  }
}

solve([
  "4",
  "Kiril:BOP-1213:Fix Typo:Done:1",
  "Peter:BOP-1214:New Products Page:In Progress:2",
  "Mariya:BOP-1215:Setup Routing:ToDo:8",
  "Georgi:BOP-1216:Add Business Card:Code Review:3",
  "Add New:Sam:BOP-1237:Testing Home Page:Done:3",
  "Change Status:Georgi:BOP-1216:Done",
  "Change Status:Will:BOP-1212:In Progress",
  "Remove Task:Georgi:3",
  "Change Status:Mariya:BOP-1215:Done",
]);
