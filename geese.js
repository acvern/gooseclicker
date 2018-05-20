/*
	Goose Clicker v0.2a
	Author: Alvern Chen
	Last modified: May 20, 2018
	TODO: 	Implement upgrades and save functions
			Draw flocks of birds in the background, start with goose in front
			Currency will be feathers. Everything is feathers. 
			Is clicking a mechanic? Decide.
*/

// Initialize global variables
var totalClicks = 0;
var totalFeathers = 0;
var researchPoints = 0;
var totalResearch = 0;

var feathers = 0;
var buildings = [];
var baseGPS = 0;
var feathersPerSecond = 0;

var clicker = 1;
var globalMulti = 1;
var clickerMulti = 1;
var buyAmount = 1;

const GOOSE = 0;
const MOTHERGOOSE = 1;
const DRAKE = 2;
const FLOCK = 3;
const UNIVERSITYOFWATERFOWL = 4;


// Function to create a new building
function newBuilding(name, id, cost, baseValue) {
	buildings[id] = {count: 0, name: name, cost: cost, value: baseValue,
	multiplier: 1};
}

// This function runs when the main button is clicked
function incrementClick() {
	totalFeathers += clicker;
	feathers += clicker;
	updateStats();
}

// Updating function that scales with time
function incrementTime(speed) {
	var increment = speed/1000 * feathersPerSecond;
	totalFeathers += increment;
	feathers += increment;
}

// Run this when buying an item
function buy(id) {
	if (feathers >= buildings[id].cost * buyAmount) {
		feathers -= buildings[id].cost * buyAmount;
		buildings[id].count += buyAmount;
		buildings[id].cost =
			Math.ceil(buildings[id].cost * (1.15 ** buyAmount));
		feathersPerSecond = getFPS();
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

function getFPS() {
	var fps = 0;
	for (b = 0; b < buildings.length; b++) {
		fps += buildings[b].value * buildings[b].count * 
		buildings[b].multiplier;
	}
	fps *= globalMulti;
	return fps;
}

function updateStats() {
	document.getElementById("feathers").innerHTML = "Feathers: " + Math.floor(feathers);
	document.getElementById("fps").innerHTML = 
	"Feathers/second: " + feathersPerSecond;
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
	newBuilding("Flock", FLOCK, 1000, 25);
	newBuilding("University of Waterfowl", UNIVERSITYOFWATERFOWL, 6000, 100);
	
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