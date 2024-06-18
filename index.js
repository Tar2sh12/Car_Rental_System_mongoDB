import express, { json } from 'express';
const app = express();

import userRouter from './src/modules/user/user.routes.js';
import carRouter from './src/modules/car/car.routes.js';
import rentalRouter from './src/modules/rental/rental.routes.js'
import { db_connection } from './DB/connection.js';
app.use(json())
app.use('/user',userRouter)
app.use('/car',carRouter)
app.use('/rental',rentalRouter)
db_connection()
app.listen(3004,()=>{
    console.log('runing on port 3004');
})



