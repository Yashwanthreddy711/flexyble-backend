const express=require('express');
const bodyParser=require('body-parser')
const cors=require('cors');
const app=express();
const env=require('dotenv').config();
const dbconfig=require('./config/dbconfig')

app.use(cors());
app.use(bodyParser.json());
const PORT=process.env.PORT || 3001;
app.get('/api/users', (req, res) => {
    const ADD_QUERY = 'SELECT * FROM flexyble.users';

    dbconfig.query(ADD_QUERY, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

       
    });
});


app.post('/api/adduser', async (req, res) => {
    //console.log(req.body);

    
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const mobileNumber=req.body.mobileNumber;
    const age=req.body.age;
    const address=req.body.address;
    const selectedSlot=req.body.selectedSlot;
    const joiningDate=req.body.joiningDate;

    try {
       
        const joiningDate = new Date(req.body.joiningDate).toISOString().split('T')[0];

        const query = `INSERT INTO flexyble.users (firstName, lastName, email, mobileNumber, age, address, selectedSlot, joiningDate) 
        VALUES ('${firstName}', '${lastName}', '${email}', ${mobileNumber}, ${age}, '${address}', '${selectedSlot}', '${joiningDate}')`;

//console.log('SQL Query:', query);

const result = await dbconfig.execute(query);
console.log(result);
        //console.log('User added successfully');
        res.status(201).send('User created successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/payment', async (req, res) => {
    const email = req.body.email;
    const amount = req.body.amount;
    const paymentDate = req.body.joiningDate;
    const cardholder=req.body.cardholder;
  
    try {
        const paymentDate = new Date(req.body.paymentDate).toISOString().split('T')[0];
    
      
        const query = `INSERT INTO flexyble.payment (email, cardholder, amount, paymentDate) 
                       VALUES ('${email}', '${cardholder}', ${amount}, '${paymentDate}')`;
    
        console.log('SQL Query:', query);
    
        await dbconfig.execute(query);
        res.status(201).send('Payment created successfully');
    
      
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
    
});


app.listen(PORT,()=>{
    console.log('http://localhost:3001');
})