const { query } = require("./mysqlConnect");

async function getAll(id_user) {
    let res = await query(`SELECT * FROM categoria WHERE ativo = 1 AND id_user = ${id_user}`)
    return res;
}

async function get(id_categoria) {
    let res = await query(`SELECT * FROM categoria WHERE id_categoria = ${id_categoria}`);

    if (res.length > 0) 
        if (res[0].ativo == 1) 
            return res[0];
        else
            return { message: "Categoria inativa" }
    return res;
}

async function create(nome, id_user) {
    let res = await query(`SELECT * FROM categoria WHERE nome = '${nome}'`);

    if (res.length > 0) 
        if (res[0].ativo == 1)
            return { message: "Categoria já existe" }
    
    let resCreate = await query(`
        INSERT INTO categoria (
            nome, 
            ativo,
            id_user
            ) VALUES (
                '${nome}', 
                1,
                ${id_user}
            )
    `);
    return resCreate;
}

module.exports = { getAll, get, create };