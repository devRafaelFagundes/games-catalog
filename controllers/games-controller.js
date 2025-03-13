//functions to be called by the router, so it needs to have all the query logic here, also, it needs to render the ejs page and pass the info
const express = require('express')
const mongoose = require('mongoose')
const Game = require('../models/games')

const showAllGames = async (req, res)=> {
    try {
        const allGames = await Game.find()
        if (allGames?.length > 0) {
            res.render('home', {data : allGames})
        } else {
            res.status(404).json({
                message : 'no games found'
            })
        }
        
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
        res.status(200).json({
            success : true,
            data : gameById
        })
    } catch (e) {
        console.log(e)
        res.status(500).send('error trying to load specific game, try again later')
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
        res.status(200).json({
            success : true,
            message : 'game updated successfully',
            data : updatedGame
        })
    } catch (e) {
        console.log(e)
        res.status(500).send('something went wrong trying to create your game')
    }
}

const createGame = async (req, res)=>{
    const newGameInfo = req.body;
    const newGame = await Game.create(newGameInfo)

    if (newGame) {
        res.status(200).json({
            success : true,
            message : 'game created in the database'
        })
    } else {
        res.status(500).json({
            success : false,
            message : "something went wrong",
            data : newGame
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
    res.status(200).json({
        success : true,
        message : 'game deleted successfully',
        data : deletedGame
    })
}

module.exports = {showAllGames, showEspecificGame, updateGame, createGame, deleteGame}