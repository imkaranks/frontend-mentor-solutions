const $scheduleWrapper = document.querySelector(".dashboard__schedule");
const $btns = document.querySelectorAll(".btn");

window.addEventListener("load", async () => {
  const response = await fetch("./js/data.json");
  const data = await response.json();
  loadScheduleCard(data, "daily");

  $btns.forEach(btn => {
    btn.addEventListener('click', event => {
      for (let $btn of $btns) {
        $btn.setAttribute("data-active", false);
      }
      btn.setAttribute("data-active", true);

      const time = event.target.dataset.controls;

      loadScheduleCard(data, time);
    })
  })
})

function loadScheduleCard (schedules, time) {
  $scheduleWrapper.innerHTML = "";
  schedules.forEach(schedule => {
    $scheduleWrapper.innerHTML += 
      `<div class="card rounded-md bg-${schedule.title.toLowerCase()}">
        <img src="./images/icon-${schedule.title.toLowerCase().replace(' ', '-')}.svg" alt="">
        <div class="card__content rounded-md">
          <h2 class="card__title">${schedule.title}</h2>
          <p class="card__subtitle--big">${schedule.timeframes[time].current}</p>
          <p class="">Last week - <span>${schedule.timeframes[time].previous}</span></p>
        </div>
      </div>`;
  });
}