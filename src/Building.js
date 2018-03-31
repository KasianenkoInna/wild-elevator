'use strict';

module['exports'] = class Building
{
    /**
    * @param {Number} florsQuantity
    * @param {ElevatorManager} elevatorManager
    */
    constructor(florsQuantity, elevatorManager)
    {
        this.florsQuantity = florsQuantity;
        this.elevatorManager = elevatorManager;
        this.floors = Array(this.florsQuantity).fill().map(u => []);
        this.elevators = [];
    }

    /**
    * @param {Elevator}
    */
    addElevator(elevator)
    {
        elevator.setBuilding(this);
        this.elevators.push(elevator);
    }

    /**
    * @param {Number} floor
    * @param {Passenger} passenger
    */
    stepOnTheFloor(floor, passenger)
    {
        this.floors[floor].push(passenger);

        this.elevatorManager.callElevator(floor, this.elevators);
    }

    /**
    * @param {Number} floor
    * @param {Passenger|null}
    */
    getFloorFirstPasssenger(floor)
    {
        let floorPassengers = this.floors[floor];
        if (undefined === floorPassengers || 0 >= floorPassengers.length) {
            return null;
        }

        return floorPassengers.shift();
    }
}
