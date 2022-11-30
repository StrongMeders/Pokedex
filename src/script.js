const pokemonName = document.querySelector('#name');
const pokemonNumber = document.querySelector('#number');
const pokemonImg = document.querySelector('.pokemon-image');
const form = document.querySelector('#search');
const input = document.querySelector("#ipt-search");
const buttonBack = document.querySelector(".back");
const buttonNext = document.querySelector(".next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonImg.style.display = 'block'
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = "";
    searchPokemon = data.id;
  }else {
    pokemonImg.style.display = 'none';
    pokemonName.innerHTML = 'err0r###';
    pokemonNumber.innerHTML = 'N/a';
  }
}

form.addEventListener ('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase())
})

buttonBack.addEventListener ('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
  }
})

buttonNext.addEventListener ('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
})

renderPokemon ('1')