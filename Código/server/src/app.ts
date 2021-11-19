import express from 'express';

const PORT = process.env.PORT || 3000

const app = express();

app.get('/', (req, res) => {
    res.end('Initial');
});

app.listen(PORT, () => { console.log('Serve listening on port', PORT)});
