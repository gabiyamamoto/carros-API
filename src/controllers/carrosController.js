import dados from "./../models/dados.js"
const { carros } = dados;

const getAllCarros = (req, res) => {
    let resultado = carros;

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

export { getAllCarros, getCarroById }