let pokemonRepository = (function () {
  
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

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };

})();

// Loop over each item using forEach() method.

function myLoopFunction(pokemon) {
  document.write((pokemon.name + ' (height: '+ pokemon.height + ') '));
  if (pokemon.height > 8) {
    document.write('-Wow, that\'s big! ');
  }
  document.write('<br>')
}

pokemonRepository.getAll().forEach(myLoopFunction);