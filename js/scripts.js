let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	let modalContainer = document.querySelector('#modal-container');

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
		listPokemon.classList.add('pokemon-list-item');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('pokemon-list-button');
		listPokemon.appendChild(button);
		list.appendChild(listPokemon);
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

	// log the pokemon
	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (details) {
				item.imageUrl = details.sprites.front_default;
				item.height = details.height;
				item.types = details.types;
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

	// Modal creation
	function showModal(pokemon) {
		modalContainer.innerHTML = '';

		let modal = document.createElement('div');
		modal.classList.add('modal');

		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'X';
		closeButtonElement.addEventListener('click', hideModal);

		let titleElement = document.createElement('h1');
		titleElement.classList.add('pokemon-title-name');
		titleElement.innerText = pokemon.name.toUpperCase();

		let contentElement = document.createElement('p');
		contentElement.classList.add('pokemon-content-height');
		contentElement.innerText = `Height: ${pokemon.height}`;

		let imageElement = document.createElement('img');
		imageElement.classList.add('pokemon-front-image');
		imageElement.setAttribute('src', pokemon.imageUrl);
		imageElement.setAttribute('alt', pokemon.name + ' image');

		modal.appendChild(closeButtonElement);
		modal.appendChild(titleElement);
		modal.appendChild(contentElement);
		modal.appendChild(imageElement);
		modalContainer.appendChild(modal);

		modalContainer.classList.add('is-visible');
	}

	function hideModal() {
		modalContainer.classList.remove('is-visible');
	}

	// Hide modal on ESC key
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});

	// Hide modal when clicking outside the modal
	modalContainer.addEventListener('click', (e) => {
		let target = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails,
	};
})();

pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
