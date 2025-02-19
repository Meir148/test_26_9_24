import express from 'express';
import beeperRoutes from './router/router';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/beepers', beeperRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
