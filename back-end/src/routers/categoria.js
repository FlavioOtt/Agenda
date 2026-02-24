const express = require('express');
const buscaController = require("../controller/categoriaController");
const categoriaRouter = express.Router(); 

categoriaRouter.get('/', async(req, res, next) => {
    busca = await buscaController.getAll();
    res.status(200).send(busca);
})

categoriaRouter.get('/:id', async(req, res, next) => {
    const id = req.params.id;
    busca = await buscaController.get(id);
    res.status(200).send(busca);
})

categoriaRouter.post('/', async(req, res, next) => {
    const { nome, id_user } = req.body;
    const busca = await buscaController.create(nome, id_user);
    res.status(200).send(busca);
})

categoriaRouter.put('/:id', async(req, res, next) => {
    const id = req.params.id;
    const { nome } = req.body;
    const busca = await buscaController.update(id, nome);
    res.status(200).send(busca);
})

categoriaRouter.delete('/:id', async(req, res, next) => {
    const id = req.params.id;
    const busca = await buscaController.delete(id);
    res.status(200).send(busca);
})

module.exports = categoriaRouter;
