'use strict'
module['exports'] = class Passenger
{
    constructor(name, arrivalFloor)
    {
        this.name = name;
        this.arrivalFloor = arrivalFloor;
    }

    getName()
    {
        return this.name;
    }

    getArrivalFloor()
    {
        return this.arrivalFloor;
    }
}
