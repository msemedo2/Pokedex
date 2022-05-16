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

  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    }
  }
})();

// Loop over each item using forEach() method.

function myLoopFunction(pokemon) {
  document.write((pokemon.name + ' (height: '+ pokemon.height + ') '));
  
}

pokemonRepository.getAll().forEach(myLoopFunction);