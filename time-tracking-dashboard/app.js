import data from "./data.json" assert {type: 'json'};

class App {
  constructor() {
    this.$wrapper = document.querySelector('.dashboard-schedule');

    this.render();
  }

  render() {
    this.displayCard(this.$wrapper, data, "daily");

    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', event => {
        this.displayCard(this.$wrapper, data, event.target.value);
      });
    });
  }

  displayCard(container, data, time) {
    container.innerHTML = '';
    data.forEach(item => {
      container.innerHTML += `
        <div class="card rounded-md bg-${item.title.toLowerCase()}">
            <img src="./images/icon-${item.title.toLowerCase().replace(' ', '-')}.svg" alt="">
            <div class="card-content rounded-md">
                <h2 class="card-title">${item.title}</h2>
                <p class="card-subtitle-big">${item.timeframes[time].current}</p>
                <p class="">Last week - <span>${item.timeframes[time].previous}</span></p>
            </div>
        </div>`;
    })
  }
}

new App();