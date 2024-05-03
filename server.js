const express = require('express');                 // Importez express
const CORS = require('cors');                       // Importez CORS
const swaggerUi = require('swagger-ui-express');    // Importez swagger-ui-express
const swaggerDocument = require('./swagger.json');  // Importez votre fichier JSON Swagger ici
const port = 3000;                                  // Port du serveur
const version = 'v1';                               // Version de l'API
const router = require('./routes/routes');          // Importez votre routeur ici
const app = express();                              // Initialiser express
const db = require('./db/dbconfig');                // Importez votre base de donnée ici

//expresse autorisé CORS (utiliser le json via d'autre domaine)
app.use(CORS());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/api/${version}`, router);

// Middleware pour afficher la documentation Swagger
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Connexion et vérification de la base de donnée

db.sync().then(()=> {
    console.log('Database connected ...');
    app.listen(port, () => {
        //console.log(`Server is : http://localhost:${port}`);
        console.log('Server started ...')
    });
})


