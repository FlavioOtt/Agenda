const categoriaModel = require("../model/categoriaModel");

exports.getAll = async (id_user) => {
    let res = await categoriaModel.getAll(id_user);
    return res;
}

exports.get = async (id_categoria) => {
    let res = await categoriaModel.get(id_categoria);
    return res;
}

exports.create = async (nome, id_user) => {
    let res = await categoriaModel.create(nome, id_user);
    return res;
}

exports.update = async (id, nome) => {
    let res = await categoriaModel.update(id, nome);
    return res;
}

exports.delete = async (id) => {
    let res = await categoriaModel.delete(id);
    return res;
}
