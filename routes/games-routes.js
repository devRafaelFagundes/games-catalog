//all the games routes duhhh
const express = require('express');
const {showAllGames, showEspecificGame, updateGame, createGame, deleteGame} = require('../controllers/games-controller')
const router = express.Router();


router.get('/', (req, res)=>{
    showAllGames(req, res)
})
router.get('/submit', (req, res)=>{
    res.render('submit.ejs')
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