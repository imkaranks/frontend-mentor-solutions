const $tabPanels = document.querySelectorAll("[role='tabpanel']");
const $tabs = document.querySelectorAll("[role='tab']");
let current = 0;

window.addEventListener("load", () => {
  $tabs.forEach($tab => {
    $tab.addEventListener("click", (e) => {
      for (let tab of $tabs) {
        tab.setAttribute('data-active', false);
      }
      handleActiveState(e);
    })
  });
  
  document.addEventListener("keydown", event => {
    switch (event.key.toLowerCase()) {
      case "arrowleft":
        tabTowardsLeft();
        break;
      case "arrowright":
        tabTowardsRight();
        break;
    }
  });
});

function tabTowardsLeft() {
  if (current > 0) {
    current = current - 1;
  } else if (current === 0) {
    current = $tabPanels.length - 1;
  }
  showCurrentTab();
}

function tabTowardsRight() {
  if (current < $tabPanels.length - 1) {
    current = current + 1;
  } else if (current === $tabPanels.length - 1) {
    current = 0;
  }
  showCurrentTab();
}

function showCurrentTab() {
  hideAll();
  $tabs[current].setAttribute('tabindex', '0');
  $tabs[current].focus();
  $tabPanels[current].removeAttribute('hidden');
}

function handleActiveState(event) {
  hideAll();
  const target = event.target;
  const controlledTabPanel = target.getAttribute("data-controls");
  const index = parseInt(target.getAttribute('data-index'));
  current = index;
  target.setAttribute('tabindex', '0');
  target.setAttribute('data-active', true);
  document.querySelector(`#${controlledTabPanel}`).removeAttribute('hidden');
}

function hideAll() {
  $tabs.forEach($tab => {
    $tab.setAttribute('tabindex', '-1');
  });
  $tabPanels.forEach($tabPanel => {
    $tabPanel.setAttribute('hidden', '');
  });
}