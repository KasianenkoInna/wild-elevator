'use strict';

module['exports'] = class ElevatorManager
{
    /**
    * @param {number} floor
    * @param {Elevator[]} elevators
    *
    * @return {Void}
    */
    callElevator(floor, elevators)
    {
        let elevator = this.__pickElevator(elevators);

        console.log(`Manager piecked for Floor: ${floor}, Eleveator: ID[${elevator.getId()}]`);

        elevator.addFloorToStopOn(floor);
    }

    /**
    * @param {Elevator[]} elevators
    *
    * @return {Elevator}
    */
    __pickElevator(elevators)
    {
        let randomIndex = Math.floor(Math.random() * elevators.length);
        return elevators[randomIndex];
    }
}
