/*
  
  Сделайте библиотеку покемонов
  
  1. Выведите список всех покемонов по адресу
  https://pokeapi.co/api/v2/pokemon?limit=100&offset=0
  
  Каждый результат оформите по шаблону: «Незагруженный покемон» (см. HTML)
  2. При нажатии на кнопку «Загрузить...» загружайте данные по адресу
  https://pokeapi.co/api/v2/pokemon/имя
  где имя - имя покемона. Например:
  https://pokeapi.co/api/v2/pokemon/ditto
  Результаты загружайте по шаблону «Пример карточки покемона»
*/



async function loadPokemonList() {
  const listElement = document.querySelector('.list');
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
  const data = await response.json();

  const pokemons = data.results;

  for (const pokemon of pokemons) {
    const item = document.createElement('div');
    item.className = 'item';

    const title = document.createElement('h3');
    title.className = 'item__title';
    title.textContent = pokemon.name;

    const link = document.createElement('a');
    link.href = '#';
    link.className = 'item__load';
    link.textContent = 'Загрузить изображение...';

    link.addEventListener('click', async (event) => {
      event.preventDefault();
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const details = await res.json();

      const container = document.createElement('div');
      container.className = 'item__contents';

      const image = document.createElement('img');
      image.src = details.sprites.other['dream_world'].front_default || details.sprites.front_default;
      image.alt = pokemon.name;
      image.className = 'item__image';

      container.append(image);
      item.replaceChild(container, link); // Заменяем ссылку на изображение
    });

    item.append(title, link);
    listElement.append(item);
  }
}

loadPokemonList();