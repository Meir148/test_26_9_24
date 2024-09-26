import { Beeper } from '../models/beeper';
import * as fs from 'fs/promises'; 

//a list for storing beepers - in the type of Beeper
export let beepers: Beeper[] = [];

//loead the data
const showData = async (): Promise<Beeper[]> => {
    try {
        const data = await fs.readFile('./beepers.json', 'utf-8');
        return JSON.parse(data) || [];
    } catch (error) {
        console.error('error', error);
        return [];
    }
};

//save the data
const saveData = async (data: Beeper[]) => {
    await fs.writeFile('./beepers.json', JSON.stringify(data, null, 2));
};

//get all beepers
export const getAllBeepers = async () => await showData();

//get beeper by id
export const getBeeperById = async (id: number) => {
    const beepers = await showData();
    return beepers.find(beeper => beeper.id === id);
};

//save beeper
export const saveBeeper = async (beeper: Beeper) => {
    const beepers = await showData();
    beepers.push(beeper);
    await saveData(beepers);
};

//update beeper for changimg the status
export const updateBeeper = async (id: number, updatedBeeper: Beeper) => {
    const beepers = await showData();
    const index = beepers.findIndex(beeper => beeper.id === id);
    if (index !== -1) {
        beepers[index] = updatedBeeper;
        await saveData(beepers);
    }
};
//delete a beeper
export const deleteBeeper = async (id: number) => {
    const beepers = (await showData()).filter(beeper => beeper.id !== id);
    await saveData(beepers);
};
