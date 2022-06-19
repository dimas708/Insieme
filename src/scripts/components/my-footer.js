class MyFooter extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
      this.innerHTML = `
        <footer tabindex="0">
          <ul tabindex="0">
            <li tabindex="0">Copyright © 2022 - Insieme <i title="love" class="fa fa-heart"></i></li>
          </ul>
        </footer>
        `;
    }
}
customElements.define('my-footer', MyFooter);