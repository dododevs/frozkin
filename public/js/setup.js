const { createApp, ref } = Vue;
import Card from './components/Card.js';
import deck from '../local/deck.js';

const md = new showdown.Converter();
md.setOption('simpleLineBreaks', true);

const t = deck.type_strings;
const { doors, treasures } = {
	doors: deck.doors.map(door => ({
		...door,
		description: md.makeHtml(door.description),
		type: t[door.type],
		undead: door.type === "undead",
		left: door.type === "monster" || door.type === "undead" ? (door.level_gain > 1 ? `${door.level_gain} ${t["levels"]}` : "") : "",
		right: door.type === "monster" || door.type === "undead" ? (`${door.treasure_gain} ${door.treasure_gain > 1 ? t["treasures"] : t["treasure"]}`) : ""
	})),
	treasures: deck.treasures.map(treasure => ({
		...treasure,
		description: md.makeHtml(treasure.description),
		left: t[treasure.type],
		right: treasure.value > 0 ? `${treasure.value} ${t["gold"]}` : "Nessun valore",
		big: "big" in treasure,
	}))
};

createApp({
	components: {
		Card
	},
	setup() {
		return {
			deck: { doors, treasures },
			game: {
				state: "setup"
			}
		}
	}
}).mount('#app');