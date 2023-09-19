// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);

console.dir(galleryItems);

const list = document.querySelector('.js-products');

list.insertAdjacentHTML('beforeend', createMarkup(galleryItems));
// list.addEventListener("click", handleClick);

console.dir(list);

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>
</li>
  `
    )
    .join('');
}

const lightbox = new SimpleLightbox('.js-products a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.dir(lightbox);

// lightbox.on("show.simplelightbox", function () {
//   lightbox
//     .element()
//     .querySelector(".sl-prev, .sl-next")
//     .addEventListener("click", () => {
//       lightbox.close();
//     });
// });
