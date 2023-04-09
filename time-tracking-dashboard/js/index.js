const $scheduleWrapper = document.querySelector(".dashboard__schedule");

window.addEventListener("load", async () => {
  const response = await fetch("./js/data.json");
  const data = await response.json();
  loadScheduleCard(data, "daily");
})

function loadScheduleCard (data, time) {
  data.forEach(item => {
    $scheduleWrapper.innerHTML += 
      `<div class="card rounded-md bg-${item.title.toLowerCase()}">
        <img src="./images/icon-${item.title.toLowerCase().replace(' ', '-')}.svg" alt="">
        <div class="card__content rounded-md">
            <h2 class="card__title">${item.title}</h2>
            <p class="card__subtitle--big">${item.timeframes[time].current}</p>
            <p class="">Last week - <span>${item.timeframes[time].previous}</span></p>
        </div>
      </div>`;
  });
}