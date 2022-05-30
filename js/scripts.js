let pokemonRepository = (function () {
	let pokemonList = [];

	let searchInput = document.querySelector('#myInput');

	searchInput.addEventListener('input', search);

	// function to check typeof and add pokemon
	function add(pokemon) {
		if (
			typeof pokemon === 'object' &&
			'name' in pokemon &&
			'detailsUrl' in pokemon
		) {
			return pokemonList.push(pokemon);
		} else {
			console.log('pokemon is not correct');
		}
	}

	// function to return all items in pokemonList
	function getAll() {
		return pokemonList;
	}

	function addListItem(pokemon) {
		let list = document.querySelector('.pokemon-list');
		let listPokemon = document.createElement('li');
		listPokemon.classList.add('group-pokemon-list');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('highlights-name');
		button.setAttribute('data-toggle', 'modal');
		button.setAttribute('data-target', '#pokemonModal');
		listPokemon.append(button);
		list.append(listPokemon);
		addEvent(button, pokemon);
	}

	function addEvent(button, pokemon) {
		button.addEventListener('click', function () {
			showDetails(pokemon);
		});
	}

	function loadList() {
		return fetch(apiUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					add(pokemon);
					console.log(pokemon);
				});
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function showDetails(pokemon) {
		loadDetails(pokemon).then(function () {
			showModal(pokemon);
		});
	}

	// log the pokemon
	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (details) {
				item.imageUrlFront = details.sprites.front_default;
				item.height = details.height;
				item.types = details.types;
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function search(e) {
		const keyword = e.target.value;
		const pokeList = document.querySelectorAll('li');
		pokeList.forEach((p) => {
			if (p.innerText.toUpperCase().includes(keyword.toUpperCase())) {
				p.style.display = 'block';
			} else {
				p.style.display = 'none';
			}
		});
	}

	// Modal creation
	function showModal(pokemon) {
		// eslint-disable-next-line no-undef
		let modalTitle = $('.modal-title');
		// eslint-disable-next-line no-undef
		let modalBody = $('.modal-body');
		// eslint-disable-next-line no-undef
		let pokemonName = $('<h2>' + pokemon.name + '</h2>');
		// eslint-disable-next-line no-undef
		let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
		// eslint-disable-next-line no-undef
		let pokemonImage = $('<img class="pokemon-modal-image">');
		pokemonImage.attr('src', pokemon.imageUrlFront);
		// eslint-disable-next-line no-undef
		let typeTextElement = $('<p>' + 'Types: ' + '</p>');
		let typeElement = document.createElement('p');
		pokemon.types.forEach((type, index) => {
			if (index === pokemon.types.length - 1) {
				typeElement.innerText += type.type.name;
			} else {
				typeElement.innerText += type.type.name + ', ';
			}
		});

		modalTitle.empty();
		modalBody.empty();
		modalTitle.append(pokemonName);
		modalBody.append(pokemonImage);
		modalBody.append(pokemonHeight);
		modalBody.append(typeTextElement);
		modalBody.append(typeElement);
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		showDetails: showDetails,
		loadList: loadList,
		loadDetails: loadDetails,
		addEvent: addEvent,
	};
})();

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
