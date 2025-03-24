//all the games routes duhhh
const express = require('express');
const {showAllGames, showEspecificGame, updateGame, createGame, deleteGame} = require('../controllers/games-controller')
const Game = require('../models/games')
const router = express.Router();


router.get('/', async  (req, res)=>{
    showAllGames(req, res)
})
router.get('/submit', async (req, res)=>{
    const maxYear =  new Date().getFullYear()
    res.render('submit.ejs', {maxYear})
})
router.get('/update/:id', async (req, res)=>{
    const game = await Game.findById(req.params.id)
    if (!game) {
        res.status(404).json({
            success : false,
            message : "game not found"
        })
    }
    res.render('update', {id : req.params.id, game})
})
router.put('/update/:id', (req, res)=>{
    updateGame(req, res)
})
router.post('/submit', (req, res)=>{
    createGame(req, res)
})
router.delete('/delete/:id', (req, res)=>{
    deleteGame(req, res)
})
router.get('/:id', (req, res)=>{
    showEspecificGame(req, res)
})

module.exports = router