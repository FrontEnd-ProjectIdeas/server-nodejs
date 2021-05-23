import express, { Router } from 'express';
import flightsController from '../controllers/flightsController';

class FlightsRoutes {

    public router : Router =  Router();

    constructor () {
        this.config();
    }
    config(): void { 
        this.router.get('/', flightsController.list);
        this.router.get('/:id', flightsController.getOne); 
        this.router.post('/', flightsController.create);
        this.router.delete('/:id', flightsController.delete);
        this.router.put('/:id', flightsController.update);
    }

}

const flightsRoutes = new FlightsRoutes();
export default flightsRoutes.router;