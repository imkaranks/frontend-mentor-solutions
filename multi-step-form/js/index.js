const $fieldsets = document.querySelectorAll(".form-fieldset");
const $stepCounts = document.querySelectorAll(".form-step-item");
const $btns = document.querySelectorAll(".btn");
const $inputs = document.querySelectorAll("input");

let state = {
  current: 0,
  fullname: '',
  email: '',
  phone: '',
  plan: '',
  isYearly: false,
  wantLargerStorage: false,
  wantOnlineService: false,
  wantCustomization: false
}

function skipBack () {
  if (state.current > 1) {
    state = { ...state, current: state.current - 1 };
    showFieldset(state.current);
    handleActiveSteps(state.current);
  }
}

function showFieldset (currentStep) {
  $fieldsets.forEach(fieldset => {
    if (fieldset.dataset.step == currentStep) {
      fieldset.removeAttribute("hidden");
    } else {
      fieldset.setAttribute("hidden", true);
    }
  });
}

function skipNext () {
  if (state.current < $fieldsets.length) {
    state = { ...state, current: state.current + 1 };
    showFieldset(state.current);
    handleActiveSteps(state.current);
  }
}

$btns.forEach($btn => {
  $btn.addEventListener('click', () => {
    if ($btn.classList.contains("btn-go-back")) {
      skipBack();
    }
    else if ($btn.classList.contains("btn-go-next")) {
      skipNext();
    }
  })
});