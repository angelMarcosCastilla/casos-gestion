import router from '#route/route.js';
import { caseApi } from '#services/case.js';
import express from 'express';
import path from 'node:path';
import { engine } from 'express-handlebars';
const app = express();
const BASE_PATH = process.cwd();
const VIEW_PATH = path.join(BASE_PATH, 'src', 'views');
const PUBLIC_PATH = path.join(BASE_PATH, 'public');

app.use(express.static(PUBLIC_PATH));
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', 'hbs');
app.set('views', VIEW_PATH);
app.use(express.json());

app.get('/', async (req, res) => {
  const cases = await caseApi.getCases();
  res.render('home', cases);
});

app.use('/api', router);

export default app;
