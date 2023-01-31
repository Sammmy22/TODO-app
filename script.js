const title = document.querySelector("#title");

const desc = document.querySelector("#desc");

let titles = [];

const container = document.querySelector("#container");
document.querySelector("#submit").addEventListener("click", function () {
  const inputTime = new Date();
  let title_content = title.value;
  let description = desc.value;

  const time = `${inputTime.getHours()}:${
    inputTime.getMinutes() < 10
      ? "0" + inputTime.getMinutes()
      : inputTime.getMinutes()
  } ${inputTime.getDate()}-${
    inputTime.getMonth() + 1
  }-${inputTime.getFullYear()}`;

  if (title_content === "" || description === "") {
    alert("Do not leave Title or Description empty!");
  } else {
    const task_obj = {
      name: title_content,
      description: description,
      time: time,
    };

    localStorage.setItem(title_content, JSON.stringify(task_obj));

    titles.push(title_content);
    localStorage.setItem("keys", titles);

    title.value = "";
    desc.value = "";

    container.innerHTML += `<article class="task">
        <header>${title_content}</header>
        ${description}
        <footer>
          Added on: ${time} 
          <button class="delete">Remove</button>
        </footer>
      </article>`;

    const tasks = document.querySelectorAll(".task");

    const remove = document.querySelectorAll(".delete");

    for (let i = 0; i < remove.length; i++) {
      remove[i].addEventListener("click", function () {
        tasks[i].remove();
        const removed = this.parentNode.parentNode.childNodes[1].innerHTML;

        for (let i = 0; i < titles.length; i++) {
          if (titles[i] == removed) {
            titles.splice(i, 1);
          }
        }
        localStorage.setItem("keys", titles);
        localStorage.removeItem(removed);
      });
    }
  }
});

const body = document.querySelector("body");

window.addEventListener("load", function () {
  // alert("Document loaded");
  const prevs = localStorage.getItem("keys").split(",");

  if (prevs.length === 0) {
  }

  for (let i = 0; i < prevs.length; i++) {
    const task_obj = JSON.parse(localStorage.getItem(prevs[i]));
    // console.log(task_obj);
    container.innerHTML += `<article class="task">
        <header>${task_obj.name}</header>
        ${task_obj.description}
        <footer>
          Added on: ${task_obj.time} 
          <button class="delete">Remove</button>
        </footer>
      </article>`;
  }
  const tasks = document.querySelectorAll(".task");

  const remove = document.querySelectorAll(".delete");

  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener("click", function () {
      tasks[i].remove();
      const removed = this.parentNode.parentNode.childNodes[1].innerHTML;

      for (let i = 0; i < titles.length; i++) {
        if (titles[i] == removed) {
          titles.splice(i, 1);
        }
      }
      localStorage.setItem("keys", titles);
      localStorage.removeItem(removed);
    });
  }
});
