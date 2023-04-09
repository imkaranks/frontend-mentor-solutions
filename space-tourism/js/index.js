const $menuBtn = document.querySelector('.btn--menu');
const $primaryNav = document.querySelector('.nav--primary');

const $tabBtns = document.querySelectorAll('.btn--tab');

function expandMenu() {
  const isNavExpanded = $primaryNav.getAttribute('data-expanded');
  if (isNavExpanded === 'false') {
    $primaryNav.setAttribute('data-expanded', true);
    $menuBtn.setAttribute('aria-expanded', true);
  }
  else {
    $primaryNav.setAttribute('data-expanded', false);
    $menuBtn.setAttribute('aria-expanded', false);
  }
}

$menuBtn.addEventListener("click", expandMenu);

function handleActiveState(elements) {
  elements.forEach(item => {
    item.addEventListener('click', () => {
      for (let element of elements) {
        const isActive = element.getAttribute('data-selected');
        if (isActive === 'true') {
          element.setAttribute('data-selected', false);
          break;
        }
      }
      item.setAttribute('data-selected', true);
    })
  });
}

handleActiveState($tabBtns);

window.addEventListener("load", async () => {
  try {
    const response = await fetch("./js/data.json");
    if (!response.ok) {
      throw new Error(response.status);
    }
    const { destinations, crew, technology } = await response.json();
    
    if (document.body.classList.contains("bg-layout--destination")) {
      $tabBtns.forEach(btn => {
        btn.addEventListener("click", event => {
          loadDestinationCard(event.target.dataset.controls, destinations);
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
});

function loadDestinationCard (planet, data) {
  const [ destination ] = data.filter(item => item.name === planet);

  document.querySelector('.destination__image').src = destination.images.webp;
  document.querySelector('.destination__image').alt = destination.name;
  document.querySelector('.destination__info').innerHTML = `
    <h3 class="destination__title text-800 font-accent text-white uppercase">${destination.name}</h3>
    <p>${destination.description}</p>
    <div class="destination__stats grid uppercase">
        <div class="destination__stat">
            <h4 class="text-300 font-primary-cond letter-space-400">Avg. distance</h4>
            <p class="text-500 text-white">${destination.distance}</p>
        </div>
        <div class="destination__stat">
            <h4 class="text-300 font-primary-cond letter-space-400">Est. travel time</h4>
            <p class="text-500 text-white">${destination.travel}</p>
        </div>
    </div>
    `;
}