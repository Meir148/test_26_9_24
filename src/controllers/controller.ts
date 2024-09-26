import { Request, Response } from 'express';
import { Beeper } from '../models/beeper';
import { getAllBeepers, getBeeperById, saveBeeper, updateBeeper, deleteBeeper } from '../DAL/dal'; 

//create beeper - no info is needed from the user
export const createBeeper = async (req: Request, res: Response) => {
    const newBeeper: Beeper = {
        id: Date.now(),
        status: 'manufactured',    
        created_at: new Date(), 
        latitude:0,
        longitude:0   
    };
    await saveBeeper(newBeeper);  
    res.status(201).json(newBeeper); 
};

// get all beepers
export const getAll = async (req: Request, res: Response) => {
    const beepers = await getAllBeepers(); 
    res.json(beepers);
};

//get beeper by id
export const getById = async (req: Request, res: Response) => {
    const beeper = await getBeeperById(parseInt(req.params.id)); 
    if (!beeper) {
        res.status(404).json({ message: 'Beeper not found' });
    } else {
        res.json(beeper);
    }
};
//delete a beeper
export const deleteB = async (req: Request, res: Response) => {
    await deleteBeeper(parseInt(req.params.id));  
    console.log(`Deleted beeper with id ${req.params.id}`);
    res.status(204).send();
};
//update beeper status and coordinates than detonate it if status is deployed
export const updateStatus = async (req: Request, res: Response) => {
    
    const beeper = await getBeeperById(parseInt(req.params.id)); 
    if (!beeper) {
        res.status(404).json({ message: 'not found' });
        return;
    }

    beeper.status = req.body.status;

    if (beeper.status === 'deployed') {
        beeper.latitude = req.body.latitude;
        beeper.longitude = req.body.longitude;

        setTimeout(async () => {
            beeper.status = 'detonated';
            beeper.detonated_at = new Date();
            await updateBeeper(beeper.id, beeper);  
        }, 10000);
    }

    await updateBeeper(beeper.id, beeper); 
    res.json(beeper);
};

//search beepers by their status
export const getByStatus = async (req: Request, res: Response) => {
    const beepers = (await getAllBeepers()).filter(beeper => beeper.status === req.params.status);  
    res.json(beepers);
};
