//functions to be called by the router, so it needs to have all the query logic here, also, it needs to render the ejs page and pass the info
const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path')

const Game = require('../models/games')

const showAllGames = async (req, res)=> {
    try {
        const genre = req.query.genre
        const filtered = {}

        if (genre) {
            filtered.genre = genre
        }
        let allGames = await Game.find(filtered).sort({rating : -1})
        if(allGames.length === 0) {
            return res.status(404).json({
                success: false,
                message : "No games were found"
            })
        }
        return res.status(200).json({
            success: true,
            allGames
        })
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
        const updateGame = {
            ...req.body
        }
        if (req.file) {
            updateGame.image = '/uploads/' + req.file.filename
        }
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
    //req.file to acccess the image info
    const {title, owner, year, rating, genre, about} = req.body;
    const newGame = await Game.create({
        ...req.body,
        image: req.file ? "/uploads/" + req.file.filename : null
    })

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
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.id)
        if (!deletedGame) {
            return res.status(404).json({
                success : false,
                message : 'the game was not found, try with another id'
            })
        }
        if(deletedGame.image) {
            const filePath = path.join(__dirname, 'public', '..', deletedGame.image)
            try {
                await fs.promises.unlink('./public' + deletedGame.image)
            } catch (error) {
                console.log(error)
            }
        }
        res.render('done', {game : deletedGame, message : 'Game deleted successfully'})

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'something went wrong when trying to delete the game'
        })
    }
    
}

module.exports = {showAllGames, showEspecificGame, updateGame, createGame, deleteGame}