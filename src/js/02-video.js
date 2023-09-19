import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Vimeo(iframe);

player.on('timeupdate', throttle(onTimeUpdate, 1000)); // Оновлюємо час не частіше, ніж раз на секунду

// Збережемо час відтворення у локальне сховище під ключем "videoplayer-current-time" в обробнику події timeupdate
function onTimeUpdate(data) {
  const currentTime = data.seconds; // Отримуємо поточний час відтворення у секундах
  localStorage.setItem('videoplayer-current-time', currentTime);
}

// Під час перезавантаження сторінки використовуємо збережений час відтворення для встановлення поточного часу відтворення плеєра:
window.addEventListener('DOMContentLoaded', () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(savedTime); // Відновлюємо відтворення з збереженої позиції
  }
});

// const LS_KEY = 'Array of names';
// const names = ['Alise', 'Emma'];
// localStorage.setItem(LS_KEY, JSON.stringify(names));
// // Достає інфу зі сховища
// const value = localStorage.getItem(LS_KEY);
// console.log(JSON.parse(value));
// //  Видаляє по ключу інфу
// localStorage.removeItem(LS_KEY);
