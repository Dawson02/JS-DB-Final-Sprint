// index.js

const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/about', (request, response) => {
  response.render('about.ejs');
});

const eventsRouter = require('./routes/events')
app.use('/events', eventsRouter);

const loginsRouter = require('./routes/logins')
app.use('/logins', loginsRouter);

const usersRouter = require('./routes/users')
app.use('/users', usersRouter);

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});