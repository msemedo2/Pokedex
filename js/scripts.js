// alert('Hello world');

// let favoriteFood = 'Pizza';
// document.write(favoriteFood);

let pokemonList = [
  {
    name: 'Bulbasaur',
    height: 7,
    types: ['grass', 'poison']
  },
  {
    name: 'Charizard',
    height: 8,
    types: ['fire', 'flying']
  },
  {
    name: 'Blastoise',
    height: 9,
    types: ['water', 'ground']
  }
];

// Iterate over each item to display pokemon 'name (height)'.
// Check if height is over 9.

for (i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + ' (height: '+ pokemonList[i].height + ') ');
  if (pokemonList[i].height > 8) {
    document.write('- Wow, that\'s big! ');
  }
}