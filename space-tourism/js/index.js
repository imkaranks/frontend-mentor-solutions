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