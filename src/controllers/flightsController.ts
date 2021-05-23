import { Request, Response } from 'express';

import pool from '../database';

class FlightsController{

    public async list (req: Request, res: Response): Promise<void>{
        // For pool initialization, see above.
        pool.query('SELECT * FROM FLIGHTS', 
            function (error, results, fields) {
                if (error) {
                    console.error(error);
                    res.status(500).send(error);
                }
                res.status(200);
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.json(results);  
        });
    }

    public async getOne (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        
        pool.query('SELECT * FROM FLIGHTS WHERE flight_number = ?',
            [id],
            function(error, results, fields) {
                if (error) {
                    console.error(error);
                    res.status(500).send(error);
                }
                
                res.status(200);
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.json(results);                
            });
        
            //res.json({message: 'flights listed'});
    }

    public async create (req: Request, res: Response): Promise<void>{
        //console.log(req.body)
        pool.query('INSERT INTO FLIGHTS set ?', [req.body], function (error, results) {
            res.status(200);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, AcceptAccept");
            if (error) {
                res.json({status: false, message: error});
            } else {
                res.json({status: true, message: 'flight saved'});
            }
        });
    }
    
    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        pool.query('DELETE FROM FLIGHTS WHERE flight_number = ?',
            [id], 
            function(error, results, fields) {
                res.status(200);
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, AcceptAccept");
                if (error) {
                    res.json({status: false, message: error});
                } else {
                    res.json({status: true, message: 'the flight was deleted'});
                }              
            });

    }
    
    public async update (req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        pool.query('UPDATE FLIGHTS SET ? WHERE flight_number = ?',
            ([req.body,id]), 
            function(error, results, fields) {
                res.status(200);
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, AcceptAccept");
                if (error) {
                    res.json({status: false, message: error});
                } else {
                    res.json({status: true, message: 'the flight was updated'});
                }              
            });

    }
    
}

const flightsController = new FlightsController();
export default flightsController;