//Ovo su Express aplikacije
import express from 'express';
import compression from 'compression';

import { fileURLToPath} from 'url';
import { dirname, sep} from 'path';
import { title } from 'process';

//configurations
const 
    __dirname = dirname(fileURLToPath( import.meta.url)) + sep,
    config = {
        port: process.env.PORT || 3000,
        dir: {
            root:   __dirname,
            static: __dirname + '/static' + sep,
            views:  __dirname + 'views' + sep
        }
    };

console.dir(config, { depth: null, color: true});

//Express initiation
const app = express();
//neda da se ubaci express identifikator
app.disable('x-powered-by');

//HTML kompresija
app.use( compression() );

// koristiti EJS templete
app.set('view engine', 'ejs');
app.set('views', config.dir.views);

//log every request to the terminal
app.use((req, res, next) => {
    console.log(req.url);
    next();
})

//home page routes
app.get('/', (req, res) => {
    res.render('message', { title: 'Zdravo Express Svete!' });
});

//još jedna ruta
app.get('/i_opet/', (req, res) => {
    res.render('message', { title: 'Zdravo Express Svete još jednom!'})
});

// hello ruta
import { helloRouter } from './routes/hello.js';
app.use('/hello', helloRouter);

// zdravo ruta
import { zdravoRouter } from './routes/zdravo.js';
app.use('/zdravo', zdravoRouter);

//folder sa statičkim sadržajem
app.use(express.static( config.dir.static )); 

//pokretanje servera
app.listen(config.port, () => {
    console.log(`Primer aplikacije na adresi http://localhost:$config.port`);
});

//404 greša
app.use((req, res) => {
    res.status(404).render('message', { title: 'Not Found' });
});

//export defoltnih stvari
export { config, app }; 
