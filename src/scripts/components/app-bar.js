class AppBar extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
        this.innerHTML = `
        <nav tabindex="0" class="nav">
        <div tabindex="0" class="menu-hp">
          <div>
            <a href="/" class="logo-font">Insieme <i title="love" class="fa fa-heart"></i></a>
          </div>
          <div tabindex="0" class="menu-container">
            <button aria-label="button menu dropdown on mobile" class="menu" Restaurant type="button">
              <span tabindex="0" class="fa fa-caret-down"></span>
            </button>
          </div>
        </div>
  
        <ul class="nav-list">
          <li class="nav-item"><a href="/">Home</a></li>
          <li class="nav-item"><a href="#/favorite"">Favorite</a></li>
          <li class="nav-item">
            <a href="https://github.com/dimas708" target="_blank" rel="noopener noreferrer">About Us</a>
          </li>
        </ul>
      </nav>
      `;
    }
}
customElements.define('app-bar', AppBar);