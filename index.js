'use strict';

const Elevator = require('./src/Elevator');
const Building = require('./src/Building');
const Passenger = require('./src/Passenger');
const ElevatorManager = require('./src/ElevatorManager');

let building = new Building(24, new ElevatorManager());

building.addElevator(new Elevator(1));
building.addElevator(new Elevator(2));
building.addElevator(new Elevator(3));

// Put passenger on 7th floor
building.stepOnTheFloor(7, new Passenger('Bob', 15));
building.stepOnTheFloor(7, new Passenger('Sarah', 5));
building.stepOnTheFloor(7, new Passenger('John', 24));

// Put passenger on 9th floor
building.stepOnTheFloor(9, new Passenger('Stiv', 21));
building.stepOnTheFloor(9, new Passenger('Bill', 1));
building.stepOnTheFloor(9, new Passenger('Mark', 16));
