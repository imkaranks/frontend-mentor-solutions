class App {
  constructor() {
    this.tabPanels = document.querySelectorAll('[role="tabpanel"]');
    this.tabs = document.querySelectorAll('[role="tab"]');
    this.state = { current: 0 };

    this.tabLeft = this.tabLeft.bind(this);
    this.tabRight = this.tabRight.bind(this);
    this.showContent = this.showContent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hideAll = this.hideAll.bind(this);
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener('keydown', event => {
      if (window.innerWidth < 768) {
        switch (event.key.toLowerCase()) {
          case 'arrowleft':
            this.tabLeft();
            break;
          case 'arrowright':
            this.tabRight();
            break;
        }
      }
      else {
        switch (event.key.toLowerCase()) {
          case 'arrowup':
            this.tabLeft();
            break;
          case 'arrowdown':
            this.tabRight();
            break;
        }
      }
    });

    this.tabs.forEach(tab => {
      tab.addEventListener('click', this.handleClick);
    })
  }

  tabLeft() {
    if (this.state.current > 0) {
      this.state = { current: this.state.current - 1 };
    }
    else if (this.state.current === 0) {
      this.state = { current: this.tabPanels.length - 1 };
    }
    this.showContent();
  }

  tabRight() {
    if (this.state.current < this.tabPanels.length - 1) {
      this.state = { current: this.state.current + 1 };
    }
    else if (this.state.current === this.tabPanels.length - 1) {
      this.state = { current: 0 };
    }
    this.showContent();
  }

  showContent() {
    this.hideAll();
    this.tabs[this.state.current].setAttribute('tabindex', '0');
    this.tabs[this.state.current].focus();
    this.tabPanels[this.state.current].removeAttribute('hidden');
  }

  handleClick(event) {
    this.hideAll();
    const target = event.target.getAttribute('aria-controls');
    const index = parseInt(event.target.getAttribute('data-index'));
    this.state = { current: index };
    event.target.setAttribute('tabindex', '0');
    document.querySelector(`#${target}`).removeAttribute('hidden');
  }

  hideAll() {
    this.tabs.forEach(tab => {
      tab.setAttribute('tabindex', '-1');
    });
    this.tabPanels.forEach(tabPanel => {
      tabPanel.setAttribute('hidden', '');
    });
  }
}

new App();
