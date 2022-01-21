"use strict"

const ratio = {
	"m": {
		m: 1,
		cm: 100,
		in: 39.37,
		ft: 3.281,
	},
	"cm": {
		m: 0.01,
		cm: 1,
		in: 0.394,
		ft: 0.033,
	},
	"in": {
		m: 0.0254,
		cm: 2.54,
		in: 1,
		ft: 0.0833,
	},
	"ft": {
		m: 0.3048,
		cm: 30.48,
		in: 12,
		ft: 1,
	},

};

const result = {};

function converter (source) {
	const original_data = JSON.parse(source);

	const original_unit = original_data.distance.unit;
	const original_value = original_data.distance.value;
	const final_unit = original_data.convert_to;

	result.unit = final_unit;

	result.value = original_value * ratio[original_unit][final_unit];
	result.value = Math.round( result.value * 100 ) / 100;

	const result_json = JSON.stringify(result);

	console.log(result_json);
};

function add_units (source) {
	const new_units = JSON.parse(source);

	for (let key in new_units) {

		ratio[key] = new_units[key];
	
		for (let prop in new_units[key]) {
			for (let char in ratio) {
				if (char === prop) {
					ratio[char][key] = 1 / new_units[key][char];
					ratio[char][key] = Number(ratio[char][key].toFixed(7));
				};
			};
		};
	};
};


const expansion_units = {
	"km": {
		km: 1,
		m: 1000,
		cm: 100000,
		mm: 1000000,
		in: 39379.1,
		ft: 3280.84,
		yd: 1093.61,
		mi: 0.621371,
	},
	"mm": {
		km: 0.000001,
		m: 0.001,
		cm: 0.1,
		mm: 1,
		in: 0.0393701,
		ft: 0.003281,
		yd: 0.0010936,
		mi: 0.0000006,
	},
	"yd": {
		km: 0.0009144,
		m: 0.9144,
		cm: 91.44,
		mm: 914.4,
		in: 36,
		ft: 3,
		yd: 1,
		mi: 0.000568,
	},
	"mi": {
		km: 1.60934,
		m: 1609.34,
		cm: 160934,
		mm: 1609340,
		in: 63360,
		ft: 5280,
		yd: 1760,
		mi: 1,
	},
}

const expansion_units_json = JSON.stringify(expansion_units);

add_units(expansion_units_json);

// Перевіряємо, що ми успішно додали нові одиниці виміру до конвертеру. У вигляді об'єкту або JSON
console.log(ratio);
// console.log(JSON.stringify(ratio));


// Приклад роботи конвертера (зніміть коментар з коду нижче):

// let operation = {
// 	distance: {
// 		unit: "m",
// 		value: 142,
// 	},
// 	convert_to: "yd",
// };

// let operation_json = JSON.stringify(operation);

// converter(operation_json);