import FavRestaurantIdb from '../data/restaurant-idb';
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from '../views/templates/like-button';
import { initSwalError, initSwalSuccess } from './swal-initiator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, data }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = data.restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    try {
      const { id } = this._restaurant;

      // get Restaurant in indexed db
      const restaurant = await FavRestaurantIdb.getRestaurant(id);

      if (restaurant) {
        this._renderLikedButtonTemplate();
      } else {
        this._renderLikeButtonTemplate();
      }
    } catch (err) {
      console.error(err);
      initSwalError(err.message);

      throw new Error(err);
    }
  },

  _renderLikeButtonTemplate() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate(); // append html

    const likeButton = document.querySelector('#likeButton');

    likeButton.addEventListener('click', async () => {
      // onClick fav the selected Restaurant
      await FavRestaurantIdb.putRestaurant(this._restaurant);
      initSwalSuccess('Restaurant favorited!');
      this._renderButton();
    });
  },

  _renderLikedButtonTemplate() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate(); // append html

    const likeButton = document.querySelector('#likeButton');

    likeButton.addEventListener('click', async () => {
      // onClick unfav the selected Restaurant
      await FavRestaurantIdb.deleteRestaurant(this._restaurant.id);
      initSwalSuccess('Restaurant unfavorited!');
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
