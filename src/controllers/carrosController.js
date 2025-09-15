import dados from "./../models/dados.js"
const { carros } = dados;

const getAllCarros = (req, res) => {
    const { modelo } = req.query;
    let resultado = carros;

    if (modelo) {
        resultado = resultado.filter(c => c.modelo.toLocaleLowerCase().includes(modelo.toLocaleLowerCase()));
    }


    
    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
};

const getCarroById = (req, res) => {
    const id = parseInt(req.params.id);
    const carro = carros.find(c => c.id === id);

    if (!carro) {
        return res.status(404).json({
            success: false,
            message: `Carro com o id ${id} não existe!`
        });
    }

    res.status(200).json({
        total: carro.length,
        data: carro
    });
};

const createCarro = (req, res) => {
    const { nome, modelo, ano, cor, qtdeVitorias, equipe, velocidadeMaxima } = req.body;
    
    if (!nome || !ano || !qtdeVitorias) {
        return res.status(400).json({
            success: false,
            message: "Nome, cor e quantidade de vitórias são obrigatórios!"
        });
    }

    const novoCarro = {
        id: carros.length + 1,
        nome: nome,
        modelo: modelo,
        ano: ano,
        cor: cor,
        qtdeVitorias: parseInt(qtdeVitorias),
        equipe: equipe,
        velocidadeMaxima: parseInt(velocidadeMaxima)
    }

    carros.push(novoCarro);

    res.status(201).json({
        success: true,
        message: "Novo carro cadastrado com sucesso!",
        data: novoCarro
    });
}

const updateCarro = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, modelo, ano, cor, qtdeVitorias } = req.body;

    const idParaEditar = id;

    if (isNaN(idParaEditar)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser um número válido!"
        });
    }

    const carroExiste = carros.find(carro => carro.id === idParaEditar);

    if (!carroExiste) {
        return res.status(404).json({
            success: false,
            message: `O carro com o id ${id} não existe`
        });
    }

    const carrosAtualizados = carros.map(carro => carro.id === id ? {
        ...carro,
        ...(nome && {nome}),
        ...(modelo && {modelo}),
        ...(ano && {ano}),
        ...(cor && {cor}),
        ...(qtdeVitorias && {qtdeVitorias})
    }
        : carro
    );

    carros.splice(0, carros.length, ...carrosAtualizados);

    const carroEditado = carros.find(c => c.id === idParaEditar);
    res.status(200).json({
        success: true,
        message: "Dados do carro atualizados com sucesso",
        carro: carroExiste
    });
}

const deleteCarro = (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido!"
        });
    }

    const carroParaRemover = carros.find(c => c.id === id);

    if (!carroParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Carro com o id ${id} não existe!`
        });
    }

    const carrosFiltrados = carros.filter(carro => carro.id !== id);

    carros.splice(0, carros.length, ...carrosFiltrados);

    res.status(200).json({
        sucess: true,
        message: `O carro com o id ${id} foi removido`
    });
}

export { getAllCarros, getCarroById, createCarro, updateCarro, deleteCarro }