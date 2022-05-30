/* eslint-disable no-undef */
let pokemonRepository = (function () {
		let e = [];
		function t(t) {
			if ('object' == typeof t && 'name' in t && 'detailsUrl' in t)
				return e.push(t);
			console.log('pokemon is not correct');
		}
		function n(e, t) {
			e.addEventListener('click', function () {
				o(t);
			});
		}
		function o(e) {
			i(e).then(function () {
				!(function (e) {
					let t = $('.modal-title'),
						n = $('.modal-body'),
						o = $('<h2>' + e.name + '</h2>'),
						i = $('<p>Height: ' + e.height + '</p>'),
						l = $('<img class="pokemon-modal-image">');
					l.attr('src', e.imageUrlFront);
					let a = $('<p>Types: </p>'),
						r = document.createElement('p');
					e.types.forEach((t, n) => {
						n === e.types.length - 1
							? (r.innerText += t.type.name)
							: (r.innerText += t.type.name + ', ');
					}),
						t.empty(),
						n.empty(),
						t.append(o),
						n.append(l),
						n.append(i),
						n.append(a),
						n.append(r);
				})(e);
			});
		}
		function i(e) {
			let t = e.detailsUrl;
			return fetch(t)
				.then(function (e) {
					return e.json();
				})
				.then(function (t) {
					(e.imageUrlFront = t.sprites.front_default),
						(e.height = t.height),
						(e.types = t.types);
				})
				.catch(function (e) {
					console.error(e);
				});
		}
		return (
			document
				.querySelector('#myInput')
				.addEventListener('input', function (e) {
					const t = e.target.value;
					document.querySelectorAll('li').forEach((e) => {
						e.innerText.toUpperCase().includes(t.toUpperCase())
							? (e.style.display = 'block')
							: (e.style.display = 'none');
					});
				}),
			{
				add: t,
				getAll: function () {
					return e;
				},
				addListItem: function (e) {
					let t = document.querySelector('.pokemon-list'),
						o = document.createElement('li');
					o.classList.add('group-pokemon-list');
					let i = document.createElement('button');
					(i.innerText = e.name),
						i.classList.add('highlights-name'),
						i.setAttribute('data-toggle', 'modal'),
						i.setAttribute('data-target', '#pokemonModal'),
						o.append(i),
						t.append(o),
						n(i, e);
				},
				showDetails: o,
				loadList: function () {
					return fetch(apiUrl)
						.then(function (e) {
							return e.json();
						})
						.then(function (e) {
							e.results.forEach(function (e) {
								let n = { name: e.name, detailsUrl: e.url };
								t(n), console.log(n);
							});
						})
						.catch(function (e) {
							console.error(e);
						});
				},
				loadDetails: i,
				addEvent: n,
			}
		);
	})(),
	apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (e) {
		pokemonRepository.addListItem(e);
	});
});
