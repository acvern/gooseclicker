/*
	Goose Clicker v0.2a
	Author: Alvern Chen
	Last modified: January 13, 2017
	TODO: 	Implement upgrades and save functions
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

// Updating function that scales with time
function incrementTime(speed) {
	var increment = speed/1000 * geesePerSecond;
	totalGeese += increment;
	geese += increment;
}

// Run this when buying an item
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
	document.getElementById("geese").innerHTML = "Geese: " + Math.floor(geese);
	document.getElementById("gps").innerHTML = 
	"Geese/second: " + geesePerSecond;
}

function updateButton(id) {
	var buttons = document.getElementsByClassName("buyButton");
	buttons[id].innerHTML = buildings[id].name + "<br>" +
	"Cost: " + buildings[id].cost + "<br>" +
	"Count: " + buildings[id].count;
}

function update(speed) {
	incrementTime(speed);
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

var main = setInterval(function() { update(100) }, 100);

window.onload = init();

/* 	TODO: 
	create lots of html buttons to test
	test!
*/