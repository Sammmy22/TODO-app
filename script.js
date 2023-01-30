const title = document.querySelector("#title");

const desc = document.querySelector("#desc");

document.querySelector("#submit").addEventListener("click", function () {
  const time = new Date();
  const container = document.querySelector("#container");
  let title_content = title.value;
  let desciption = desc.value;

  title.value = "";
  desc.value = "";

  container.innerHTML += `<article class="task">
        <header>${title_content}</header>
        ${desciption}
        <footer>
          Added on: ${`${time.getHours()}:${
            time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
          } ${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`} 
          <button class="delete">Remove</button>
        </footer>
      </article>`;

  const tasks = document.querySelectorAll(".task");

  const remove = document.querySelectorAll(".delete");

  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener("click", function () {
      tasks[i].remove();
    });
  }
});
