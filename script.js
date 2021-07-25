const dex = document.getElementById('dex');
const fetchVillains = async () => {
    const url = "/akumatized.json";
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	const villains = data.villains.map((result, index) => ({
		...result,
		id: index + 1,
		image: `./images/${result.image}`
	}));
	displayVillains(villains);
};

const displayVillains = (villain) => {
    const villansHTMLString = villain
        .map((villaien) => (`
			<li class="card" onclick="selectVillain(${villaien.id})">
				<img class="card-image" src="${villaien.image}"/>
				<h2 class="card-title">${villaien.id}. ${villaien.name}</h2>
			</li>
		`)).join('');
    dex.innerHTML = villansHTMLString;
};

const selectVillain = async (id) => {
	const url = `\akumatized.json`;
	const res = await fetch(url);
	const villaien = await res.json();
	displayPopup(villaien, id);
};

const displayPopup = (villaien, id) => {	
	const image = `./images/${villaien.villains[id - 1].image}`;
	let goal;
	
	if (!villaien.villains[id - 1].goals[1]) {
		goal = Array(villaien.villains[id - 1].goals).map((gol) => gol[0]);
	} else {
		goal = Array(villaien.villains[id - 1].goals).map((gol) => gol.join(", "));
	}

	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${image}" />
				<h2 class="card-title">
					${villaien.villains[id - 1].id + 1}. ${villaien.villains[id - 1].name}
				</h2>
				<p><small>Goal: </small>${goal}</p>
				<p><small>Quote: </small>${villaien.villains[id - 1].quote}</p>
			</div>
		</div>
	`;
	dex.innerHTML = htmlString + dex.innerHTML;
};

const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};

fetchVillains();
