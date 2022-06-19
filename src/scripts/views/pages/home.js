import Spinner from '../templates/spinner';
import RestaurantSource from '../../data/restaurant-source';
import { restaurantItemTemplate } from '../templates/template-html';
import { initSwalError } from '../../utils/swal-initiator';

const Home = {
  async render() {
    return `
    <div class="container">
      <div id="loading"></div>
      <div class="main">
        <h2 tabindex="0" class="main-content__title">Explore Restaurant</h2>
        <section id="explore-restaurant"></section>
      </div>
    </div>
    `;
  },

  async afterRender() {
    const loading = document.querySelector('#loading');
    const mainContainer = document.querySelector('.main');
    loading.innerHTML = Spinner();
    mainContainer.style.display = 'none';
    const listContainer = document.querySelector('#explore-restaurant');

    try {
      const data = await RestaurantSource.getListRestaurant();
      data.restaurants.forEach((restaurant) => {
        listContainer.innerHTML += restaurantItemTemplate(restaurant);
      });
      mainContainer.style.display = 'block';
      loading.style.display = 'none';
    } catch (err) {
      mainContainer.style.display = 'block';
      loading.style.display = 'none';
      listContainer.innerHTML = `Error: ${err.message}`;
      initSwalError(err.message);
    }
  },
};

export default Home;

