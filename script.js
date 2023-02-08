const title = document.querySelector("#title");

const desc = document.querySelector("#desc");

const container = document.querySelector("#container");
document.querySelector("#submit").addEventListener("click", function () {
  const inputTime = new Date();
  let title_content = title.value;
  let description = desc.value;

  if (title_content === "") {
    alert("A title is necessary!");
  } else {
    const time = `${inputTime.getHours()}:${
      inputTime.getMinutes() < 10
        ? "0" + inputTime.getMinutes()
        : inputTime.getMinutes()
    } ${inputTime.getDate()}-${
      inputTime.getMonth() + 1
    }-${inputTime.getFullYear()}`;

    const task_obj = {
      name: title_content,
      description: description,
      time: time,
    };

    localStorage.setItem(title_content, JSON.stringify(task_obj));

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
  }

  const tasks = document.querySelectorAll(".task");

  const remove = document.querySelectorAll(".delete");

  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener("click", function () {
      tasks[i].remove();
      const removed = this.parentNode.parentNode.childNodes[1].innerHTML;
      localStorage.removeItem(removed);
    });
  }
});

window.addEventListener("load", function () {
  const prevs = Object.keys(this.localStorage);

  if (prevs.length === 0) {
  }

  for (let i = 0; i < prevs.length; i++) {
    try {
      JSON.parse(localStorage.getItem(prevs[i]));
    } catch (e) {
      if (e instanceof SyntaxError) {
        this.localStorage.removeItem(prevs[i]);
      }
    }

    const task_obj = JSON.parse(localStorage.getItem(prevs[i]));

    try {
      !task_obj["name"] || !task_obj["time"];
    } catch (error) {
      if (error instanceof TypeError) {
        continue;
      }
    }

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
      localStorage.removeItem(removed);
    });
  }
});
