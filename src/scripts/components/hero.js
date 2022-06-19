class Hero extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div tabindex="0" class="hero__inner">
            <h1 tabindex="0" class="hero__title">Happines is Good Food</h1>
            <p tabindex="0"  class="hero__subtitle">
                Good food is nourishment of the soul and you don't neeed a silver fork to eat good food</p>
            <a href="#main-content" class="btn">Let's Eat!</a>
        </div>
        `;
    }
}
customElements.define('my-hero', Hero);