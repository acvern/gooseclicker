/*
	Goose Clicker v0.1
	Author: Alvern Chen
	Last modified: January 6, 2017
	TODO: 	Play with style some more until I get it clean and scalable.
			Something about the indentation in the buyButtons.
*/

// Initialize global variables
var totalClicks = 0;
var totalGeese = 0;
var researchPoints = 0;
var totalResearch = 0;

var geese = 0;
var buildings = [];
var baseGPS = 0;
var geesePerSecond = 0;

var clicker = 1;
var globalMulti = 1;
var clickerMulti = 1;
var buyAmount = 1;

const GOOSE = 0;
const MOTHERGOOSE = 1;
const DRAKE = 2;
const UNIVERSITYOFWATERFOWL = 3;

// Function to create a new building
function newBuilding(name, id, cost, baseValue) {
	buildings[id] = {count: 0, name: name, cost: cost, value: baseValue,
	multiplier: 1};
}

// This function runs when the main button is clicked
function incrementClick() {
	totalGeese += clicker;
	geese += clicker;
	updateStats();
}

function incrementTime() {
	totalGeese += geesePerSecond;
	geese += geesePerSecond;
}

function buy(id) {
	if (geese >= buildings[id].cost * buyAmount) {
		geese -= buildings[id].cost * buyAmount;
		buildings[id].count += buyAmount;
		buildings[id].cost =
			Math.ceil(buildings[id].cost * (1.15 ** buyAmount));
		geesePerSecond = getGPS();
		updateStats();
		updateButton(id);
	}
}

// Creates a new button to buy a building
function newBuy(id) {
	var buyButton = document.createElement("div");
	buyButton.setAttribute("class", "buyButton");
	buyButton.setAttribute("onclick", "buy(" + id + ")");
	
	buyButton.innerHTML = buildings[id].name + "<br>" +
	"Cost: " + buildings[id].cost + "<br>" +
	"Count: " + buildings[id].count;
	
	/*
	var nameLine = document.createTextNode(buildings[id].name);
	
	var costLine = document.createTextNode("Cost: " + buildings[id].cost);
		
	var countLine = document.createTextNode("Count: " + buildings[id].count);
	
	buyButton.appendChild(nameLine);
	buyButton.appendChild(document.createElement("br"));
	buyButton.appendChild(costLine);
	buyButton.appendChild(document.createElement("br"));
	buyButton.appendChild(countLine);
	
	*/
	
	return buyButton;
}

function getGPS() {
	var gps = 0;
	for (b = 0; b < buildings.length; b++) {
		gps += buildings[b].value * buildings[b].count * 
		buildings[b].multiplier;
	}
	gps *= globalMulti;
	return gps;
}

function updateStats() {
	document.getElementById("geese").innerHTML = "Geese: " + geese;
	document.getElementById("gps").innerHTML = 
	"Geese/second: " + geesePerSecond;
}

function updateButton(id) {
	var buttons = document.getElementsByClassName("buyButton");
	buttons[id].innerHTML = buildings[id].name + "<br>" +
	"Cost: " + buildings[id].cost + "<br>" +
	"Count: " + buildings[id].count;
}

function update() {
	incrementTime();
	updateStats();
}

function init() {
	newBuilding("Goose", GOOSE, 5, 1);
	newBuilding("Mother Goose", MOTHERGOOSE, 100, 5);
	newBuilding("Drake", DRAKE, 416, 10);
	newBuilding("University of Waterfowl",
	UNIVERSITYOFWATERFOWL, 6000, 100);
	
	var buyBuildings = document.getElementById("mainBuildings");
	for (i = 0; i < buildings.length; i++) {
		buyBuildings.appendChild(newBuy(i));
		buyBuildings.appendChild(document.createElement("br"));
	}
	updateStats();
}

var main = setInterval(function() { update() }, 1000);

window.onload = init();

/* 	TODO: 
	create lots of html buttons to test
	test!
*/