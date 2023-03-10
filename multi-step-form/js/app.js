class App {
  constructor() {
    this.$fieldsets = document.querySelectorAll(".form-fieldset");
    this.$stepCounts = document.querySelectorAll(".form-step-item");
    this.$btns = document.querySelectorAll(".btn");
    this.$inputs = document.querySelectorAll("input");
    this.state = {
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

    this.goBack = this.goBack.bind(this);
    this.goNext = this.goNext.bind(this);
    this.handleFieldsetVisiblity = this.handleFieldsetVisiblity.bind(this);
    this.handleStepList = this.handleStepList.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.selectCheckbox = this.selectCheckbox.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);

    this.addEventListeners();
  }

  addEventListeners() {

    this.$btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains("btn-go-back")) {
          this.goBack();
          this.handleFieldsetVisiblity();
          this.handleStepList();
        }
        else if (btn.classList.contains("btn-go-next")) {
          this.goNext();
          this.handleFieldsetVisiblity();
          this.handleStepList();
        }
      })
    });

    this.$inputs.forEach(input => {
      input.addEventListener('change', event => {
        this.handleInput(event)
        if (input.classList.contains('form-group-checkbox')) {
          console.log("ran")
          this.selectCheckbox();
        }
      });
      input.addEventListener('click', event => this.handleErrorMessage(event));
    })
  }

  goBack() {
    if(this.state.current > 0) {
      this.state = { ...this.state, current: this.state.current-1 };
    }
  }

  goNext() {
    if(this.state.current < this.$fieldsets.length-1) {
      this.state = { ...this.state, current: this.state.current+1 };
    }
  }

  handleFieldsetVisiblity() {
    this.$fieldsets.forEach(fieldset => {
      const fieldsetIndex = parseInt(fieldset.getAttribute('data-step'));
      if (fieldsetIndex === this.state.current) {
        fieldset.removeAttribute('hidden');
      }
      else {
        fieldset.setAttribute('hidden', '');
      }
    });
  }

  handleStepList() {
    this.$stepCounts.forEach(stepCount => {
      const currentStepCount = parseInt(stepCount.getAttribute("data-step"));
      if(currentStepCount === this.state.current) {
        stepCount.classList.add('active');
      }
      else {
        stepCount.classList.remove('active');
      }
    })
  }

  handleInput(event) {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
    this.state = { ...this.state, [input.name]: value };
    console.log(`fullname: ${this.state.fullname}\nemail: ${this.state.email}\nphone: ${this.state.phone}\nisYearly: ${this.state.isYearly}\nwantStorage: ${this.state.wantLargerStorage}\nwantService: ${this.state.wantOnlineService}\nwantCustoms: ${this.state.wantCustomization}`);
  }

  selectCheckbox() {
    document.querySelectorAll('form-group-checkbox').forEach(checkbox => {
      if(checkbox.hasAttribute('checked')){
        checkbox.setAttribute('checked', 'checked');
      }
      else {
        checkbox.removeAttribute('checked');
      }
    })
  }

  handleErrorMessage(event) {
  }
}

new App();