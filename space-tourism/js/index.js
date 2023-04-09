const $menuBtn = document.querySelector('.btn--menu');
const $primaryNav = document.querySelector('.nav--primary');

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