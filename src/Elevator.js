'use strict';

module['exports'] = class Elevator
{
    /**
    * @param {Number} id
    */
    constructor(id)
    {
        this.id = id;
        this.currentFloor = 1;
        this.maxPassengers = 4;
        this.passengers = [];
        this.__floorsToStopQueue = [];
        this.__goFloor = null;
    }

    getId()
    {
        return this.id;
    }

    /**
    * @param {Building} building
    */
    setBuilding(building)
    {
        this.building = building;
    }

    getCurrentFloor()
    {
        return this.currentFloor;
    }

    __moveUp()
    {
        this.currentFloor++ ;
        console.log(`|--ID[${this.getId()}]---[UP^]----[floor: ${this.getCurrentFloor()}, passangers: ${this.__printPassengersInfo()}]--|`);
    }

    __moveDown()
    {
        this.currentFloor-- ;
        console.log(`|--ID[${this.getId()}]---[DOWNv]----[floor: ${this.getCurrentFloor()}, passangers: ${this.__printPassengersInfo()}]--|`);
    }

    /**
    * @return {String}
    */
    __printPassengersInfo()
    {
        let info = '';
        if (this.passengers.length > 0) {
            for (let passenger of this.passengers) {
                info += `[name: ${passenger.getName()}, GoingTo: ${passenger.getArrivalFloor()}]`;
            }
        } else {
            info = 'empty';
        }

        return info;
    }

    /**
    * @param {Passenger} passenger
    * @return {Boolean}
    */
    __addPassenger(passenger)
    {
        if (this.isFull()) {
            return false;
        }

        console.log(`ELevator: ID[${this.getId()}], Adding passenger : [`, passenger, ']');
        this.passengers.push(passenger);
        this.__addFloorToQueue(passenger.getArrivalFloor());
        return true;
    }

    /**
    * @return {Passenger[]}
    */
    __releasePassangers()
    {
        if (0 >= this.passengers.length) {
            return [];
        }

        let released = [];
        for (let passanger of this.passengers) {
            if (this.getCurrentFloor() === passanger.getArrivalFloor()) {
                released.push(passanger);
                let index = this.passengers.indexOf(passanger);
                this.passengers.splice(index, 1);
                console.log(`|--ID[${this.getId()}]-__releasePassangers-[floor: ${this.getCurrentFloor()}, Released: [${passanger.getName()}]--|`);
            }
        }

        return released;
    }

    isFull()
    {
        return this.passengers.length >= this.maxPassengers;
    }

    /**
    * @param {Number} floor
    *
    * @return {Boolean}
    */
    __addFloorToQueue(floor)
    {
        if( -1 !== this.__floorsToStopQueue.indexOf(floor)){
            return false;
        }

        if (floor === this.__goFloor) {
            return false;
        }

        this.__floorsToStopQueue.push(floor);

        return true;
    }

    /**
    * @param {Number} floor
    */
    addFloorToStopOn(floor)
    {
        if (true === this.__addFloorToQueue(floor)) {
            this.__go();
        }
    }

    __go()
    {
        if (0 >= this.__floorsToStopQueue.length || null !== this.__goFloor) {
            return;
        }

        this.__goFloor = this.__floorsToStopQueue.shift();

        console.log(`ID:[${this.getId()}] __goFloor: `, this.__goFloor, 'Queue: ', this.__floorsToStopQueue);

        this.__moveToGoFloor();
    }

    __checkWaitingPassangerAndAddIfHasPlace()
    {
        if (this.isFull()) {
            return;
        }

        let passengerWaiting = this.building.getFloorFirstPasssenger(this.getCurrentFloor());
        console.log(`ELevator: ID[${this.getId()}], Got waiting passenger : [`, passengerWaiting, ']');
        if (null !== passengerWaiting) {
            if (true === this.__addPassenger(passengerWaiting)) {
                this.__checkWaitingPassangerAndAddIfHasPlace();
            }
        }
    }

    __moveToGoFloor()
    {
        let passangersReleased = this.__releasePassangers();
        if (this.__goFloor === this.getCurrentFloor()) {
            this.__checkWaitingPassangerAndAddIfHasPlace();

            this.__goFloor = null;
            return this.__go();
        }

        if (this.__goFloor > this.getCurrentFloor()) {
            this.__moveUp();
        } else {
            this.__moveDown();
        }

        let self = this;
        setTimeout(
            function() {
                self.__moveToGoFloor();
            },
            2000
        );
    }
};
