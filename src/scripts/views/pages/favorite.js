import FavRestaurantIdb from '../../data/restaurant-idb';
import { restaurantItemTemplate } from '../templates/template-html';

const Favorite = {
  async render() {
    return `
      <div class="container">
        <h2 class="title-container">Favorited restaurant</h2>

        <section id="fav-restaurant"></section>
      </div>
    `;
  },

  async afterRender() {
    // get fav restaurant
    const data = await FavRestaurantIdb.getAllrestaurant();

    const listContainer = document.querySelector('#fav-restaurant');

    // if data empty
    if (data.length === 0) {
      listContainer .innerHTML = `
        Empty favorite restaurant. Put one, by clicking heart button in the detail page.
      `;
    }

    // display all fav restaurant
    const totalRest = data.length;
    data.forEach((restaurant, index) => {
      listContainer .innerHTML += restaurantItemTemplate(restaurant, index, totalRest);
    });
  },
};

export default Favorite;
