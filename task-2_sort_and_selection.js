"use strict"

// Для перевірки роботи функції відбору та сортування передайте функції sort_and_selection параметр у конфігурації, яка була вказана у завданні.
// В кінці є тестовий запуск з об'єктом example, результат у консолі
let result_obj = {
	"result": [],
};
let original_data;
let sort_by;

function select_rule () {
	for ( let key in original_data["condition"] ) {
		if (key === "include") {
			selection_include("include");
		} else if (key === "exclude") {
			selection_exclude("exclude");
		}
	}
};

function selection_include (rule_type) {
	let cond_item = original_data["condition"][rule_type][0];

	for (let key in cond_item) {

		for (let i=0; i < original_data["data"].length; i++) {

			let data_item = original_data["data"][i];

			if (data_item[key] === cond_item[key]) {
				result_obj["result"].push(data_item);
			}
		}
	}
}

function selection_exclude (rule_type) {
	let cond_item = original_data["condition"][rule_type][0];

	for (let key in cond_item) {

		for (let i=0; i < original_data["data"].length; i++) {

			let data_item = original_data["data"][i];

			if ( !(data_item[key] === cond_item[key]) ) {
				result_obj["result"].push(data_item);
			}
		}
	}
}

function sort_arr (arr, sort_by) {
	arr.sort( (a, b) => {
		if (a[sort_by] > b[sort_by]) {
			return 1;
		} else if (a[sort_by] < b[sort_by]) {
			return -1;
		} return 0;
	}
)};

function sort_and_selection (source) {
	original_data = JSON.parse(source);
	sort_by = original_data["condition"]["sort_by"];

	select_rule();

	sort_arr(result_obj["result"], sort_by);
	const result_json = JSON.stringify(result_obj);
	console.log(result_json);
}

const example = {
	"data": [{"user": "mike@mail.com", "rating": 20, "disabled": true},
			{"user": "greg@mail.com", "rating": 14, "disabled": false},
			{"user": "greg@mail.com", "rating": 25, "disabled": false},
			{"user": "greg@mail.com", "rating": 41, "disabled": false},
			{"user": "greg@mail.com", "rating": 110, "disabled": false},
			{"user": "john@mail.com", "rating": 98, "disabled": true},
			{"user": "mike@mail.com", "rating":35, "disabled": false},
			{"user": "greg@mail.com", "rating": 9, "disabled": true},
			{"user": "greg@mail.com", "rating": 16, "disabled": true},
			{"user": "greg@mail.com", "rating": 156, "disabled": true},
			{"user": "greg@mail.com", "rating": 45, "disabled": true},
			{"user": "greg@mail.com", "rating": 22, "disabled": true},
			{"user": "greg@mail.com", "rating": 22, "disabled": true},],
	"condition": {"exclude": [{"disabled": true}], "sort_by": ["rating"]},
};

const example_json = JSON.stringify(example);

sort_and_selection(example_json);