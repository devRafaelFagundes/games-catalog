//functions to be called by the router, so it needs to have all the query logic here, also, it needs to render the ejs page and pass the info
const express = require('express')
const mongoose = require('mongoose')
const Game = require('../models/games')

const showAllGames = async (req, res)=> {
    try {
        let message
        const genre = req.query.genre
        const filtered = {}

        if (genre) {
            filtered.genre = genre
        }
        let allGames = await Game.find(filtered).sort({rating : -1})
        if (genre && allGames?.length === 0) {
            allGames = await Game.find().sort({rating : -1})
            message = 'No games were matched with filter requisition'
        }
        res.render('home', {data : allGames, message})
    } catch (e) {
        console.log(e)
        res.status(500).send('error trying to load game, try again later')
    }
}

const showEspecificGame = async (req, res)=>{
    try {
        const gameId = req.params.id
        const gameById = await Game.findById(gameId)
        if (!gameById) {
            res.status(404).json({
                success : false,
                message : 'no games were found'
            })
        }
        const maxYear = new Date().getFullYear()
        res.render('specific', {game : gameById, maxYear})

    } catch (e) {
        console.log(e)
        res.status(404).render('error', {message : 'Game not found', status : "404"})
    }
}

const updateGame = async (req, res)=>{
    try {
        const updateGame = req.body;
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, updateGame, {
            new : true
        })
        if (!updatedGame) {
            res.status(404).json({
                success : false,
                message : 'game not found, try with another id'
            })
        }
        res.render('done', {game : updatedGame, message : 'Game updated successfully'})
    } catch (e) {
        console.log(e)
        res.status(500).send('something went wrong trying to create your game')
    }
}

const createGame = async (req, res)=>{
    const newGameInfo = req.body;
    const newGame = await Game.create(newGameInfo)

    if (newGame) {
        res.render('done', {game : newGame, message : 'Game created successfully'})
    } else {
        res.status(500).json({
            success : false,
            message : "something went wrong",
        })
    }
}

const deleteGame = async (req, res)=>{
    const deletedGame = await Game.findByIdAndDelete(req.params.id)
    if (!deletedGame) {
        res.status(404).json({
            success : false,
            message : 'the game was not found, try with another id'
        })
    }
    res.render('done', {game : deletedGame, message : 'Game deleted successfully'})
}

module.exports = {showAllGames, showEspecificGame, updateGame, createGame, deleteGame}