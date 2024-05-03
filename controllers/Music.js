//const data = require('../models/data.json')
const Music = require('../models/Music')
const fs = require('fs');
const path = require('path');
const controllerMusic = {

    // /music & /music?search=    Afficher toute les musiques, ou afficher les musiques qui contiennent le titre recherché
find: async (req, res) => {
    if (req.query.search) {
        const query = req.query.search;
        const result = await Music.findAll({where: {title: query}});
        if (result.length === 0) {
            return res.status(404).json({ error: "No matching songs found ..." });
        }

        res.status(200).json({ result });
        console.log(result);
    } else {
        const data = await Music.findAll(); // Récupération de toutes les musiques dans la base de données
        res.status(200).json({ result: data });
    }
},


    // /music!:id   Afficher la musique qui a l'id recherché
    findById: async (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ error: "Don't use text for id" });
        }
    
        const music = await Music.findByPk(id); // Recherche de la musique par son ID dans la base de données
    
        if (!music) {
            return res.status(404).json({ error: "Music not found" });
        }
    
        return res.status(200).json({ result: music });
    },



    // /music!  Afficher un message d'erreur
    IdNotFound: (req, res) => {
        res.status(404).json({error : "Please enter a valid ID !"})
    },


    // /musicrandom  Afficher une musique aléatoire
    random: async(req, res) => {
        const data = await Music.findAll()         //DB
        const length = data.length
        res.status(200).json({result : data[Math.floor(Math.random() * length)]})
    },


    // /music  Créer une musique
    create: async(req, res) => {
        console.log(req.body)
        const data = await Music.create(req.body)                                  //DB
        res.status(201).json({ success: 'Song is created', data : req.body })


    },

    delete: async(req, res) => {
        const idMusic = req.params.id
        const data = await Music.destroy({where : {id: idMusic}})                       //DB
        res.status(200).json({ success: 'Song is deleted' })
    },
        
            downloadCover: (req, res) => {
        const fileName = req.params.fileName;
        const directory = req.params.directory;
        if (directory !== "cover" && directory !== "music") {
            return res.status(400).json({ error: "Directory not exist ! It's cover or music" });
        }
        const filePath = path.resolve(`./upload/${directory}/${fileName}`);
        if (fs.existsSync(filePath)) {
            // Envoyer le fichier au client sans le télécharger
            return res.sendFile(filePath);
        } else {
            return res.status(404).json({ error: "File not found" });
        }
    }

}


//export le module
module.exports = controllerMusic
