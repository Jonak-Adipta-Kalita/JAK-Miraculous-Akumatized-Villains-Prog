const dex = document.getElementById('dex');
const fetchVillains = async () => {
    const res = await fetch("https://jak_api.p.rapidapi.com/miraculous", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "jak_api.p.rapidapi.com",
			"x-rapidapi-key": "d3474315fcmshe6f03eb826f16bcp181f82jsn7d262d2601be"
		}
	});
	const data = await res.json();
	console.log(data);
	const villains = data.akumatized.map((result, index) => ({
		...result,
		id: index + 1,
		image: `https://jak-api.vercel.app/${result.image}`
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
	const res = await fetch("https://jak_api.p.rapidapi.com/miraculous", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "jak_api.p.rapidapi.com",
			"x-rapidapi-key": "d3474315fcmshe6f03eb826f16bcp181f82jsn7d262d2601be"
		}
	});
	const villaien = await res.json();
	displayPopup(villaien, id);
};

const displayPopup = (villaien, id) => {	
	const image = `https://jak-api.vercel.app/${villaien.akumatized[id - 1].image}`;
	const power_and_abilities = Array(villaien.akumatized[id - 1].power_and_abilities).map((powerAndAbilities) => powerAndAbilities.join(", "));
	let goal;
	let quoteHTMLString;
	let goalsHTMLString;
	let power_and_abilitiesHTMLString;
	
	if (!villaien.akumatized[id - 1].goals[1]) {
		goal = Array(villaien.akumatized[id - 1].goals).map((gol) => gol[0]);
	} else {
		goal = Array(villaien.akumatized[id - 1].goals).map((gol) => gol.join(", "));
	}
	
	if (villaien.akumatized[id - 1].quote === null) {
		quoteHTMLString = "";
	} else {
		quoteHTMLString = `<small>Quote: </small>${villaien.akumatized[id - 1].quote}`;
	}
	
	if (villaien.akumatized[id - 1].goals[0] === null) {
		goalsHTMLString = "";
	} else {
		goalsHTMLString = `<small>Goal(s): </small>${goal}`;
	}
	
	if (villaien.akumatized[id - 1].power_and_abilities[0] === null) {
		power_and_abilitiesHTMLString = "";
	} else {
		power_and_abilitiesHTMLString = `<small>Power and Ability(s): </small>${power_and_abilities}`;
	}

	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${image}" />
				<h2 class="card-title">
					${villaien.akumatized[id - 1].id + 1}. ${villaien.akumatized[id - 1].name}
				</h2>
				<p><small>Victim: </small>${villaien.akumatized[id - 1].victim}</p>
				<p>${goalsHTMLString}</p>
				<p>${quoteHTMLString}</p>
				<p>${power_and_abilitiesHTMLString}</p>
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
