const database = require('./db.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to SVEC Graduation Admin Server!');
});

app.get('/get_attendees', async (req, res) => {
    const query = `SELECT roll_no, name, branch, program, batch FROM attendee_student`;
    try {
        const db = await database.connectToDatabase();
        const [result] = await db.execute(query);
        await db.end();

        if (result.length === 0) {
            res.status(409).send({ message: 'No Attendees Found' });
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        console.error('Failed to get attendees:', err);
        res.status(500).send({ error: 'Failed to get attendees.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
