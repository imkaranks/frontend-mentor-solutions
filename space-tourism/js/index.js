const menuBtn = document.querySelector('[aria-controls="primary-navigation"]');
const primaryNav = document.querySelector('#primary-navigation');
const tabList = document.querySelector('[role="tablist"]');
const tabs = document.querySelectorAll('[role="tab"]');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');

window.addEventListener('load', () => {
  menuBtn.addEventListener('click', (e) => {
    const button = e.currentTarget;
    const isExpanded = button.getAttribute('aria-expanded');
    if (isExpanded === 'false') {
      primaryNav.setAttribute('data-expanded', true);
      button.setAttribute('aria-expanded', true);
      button.querySelector('.sr-only').textContent = 'Close Menu';
    }
    else {
      primaryNav.setAttribute('data-expanded', false);
      button.setAttribute('aria-expanded', false);
      button.querySelector('.sr-only').textContent = 'Open Menu';
    }
  });
});

class TabList {
  constructor(tabList) {
    this.tabList = tabList;
    this.tabs = tabList.querySelectorAll('[role="tab"]');
    this.container = tabList.parentNode;
    this.tabPanels = this.container.querySelectorAll('[role="tabpanel"]');
    this.pictures = document.querySelectorAll('picture');

    this.previous = null;
    this.current = 0;
    this.focus = this.current;

    this.changeTab = this.changeTab.bind(this);
    this.addEventListeners();
  }

  addEventListeners() {
    this.initTabs();

    this.tabList.addEventListener('keydown', (e) => this.handleKeydown(e.keyCode))
  }

  initTabs() {
    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].addEventListener('click', () => this.handleClick(i));
    }
  }

  handleClick(index) {
    if (index === this.current) return;
    this.previous = this.current;
    this.current = index;
    this.changeTab();
    this.tabs[this.previous].setAttribute('tabindex', -1);
    this.tabs[this.current].setAttribute('tabindex', 0);
  }

  changeTab() {
    this.tabs[this.previous].setAttribute('data-active', false);
    this.tabs[this.current].setAttribute('data-active', true);
    this.tabPanels[this.previous].setAttribute('hidden', '');
    this.tabPanels[this.current].removeAttribute('hidden');
    this.pictures[this.previous].setAttribute('hidden', '');
    this.pictures[this.current].removeAttribute('hidden');
  }

  handleKeydown(keyCode) {
    const keydownLeft = 37;
    const keydownRight = 39;
    switch (keyCode) {
      case keydownLeft:
        this.focus = this.focus > 0 ? this.focus - 1 : this.tabs.length-1;
        break;
      case keydownRight:
        this.focus = this.focus < this.tabs.length-1 ? this.focus + 1 : 0;
        break;
      case 13:
        this.previous = this.current;
        this.current = this.focus;
        this.changeTab();
        break;
    }
    this.tabs[this.current].setAttribute('tabindex', -1);
    this.tabs[this.focus].setAttribute('tabindex', 0);
    this.tabs[this.focus].focus();
  }
}

new TabList(tabList);