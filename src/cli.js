import pegaArquivo from './index.js';
import fs from 'fs'
import listaValidada from './http-validacao.js';
import chalk from 'chalk';

const caminho = process.argv;

async function imprimeLista(valida, resultados, identificador = '') {
    if(valida) {
        console.log(
            chalk.blue('Lista validada:'),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultados));
    } else {
        console.log(
        chalk.blue('Lista de links:'),
        chalk.black.bgGreen(identificador),
        resultados)
    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2]
    const valida = argumentos[3] === '--valida';

    try {
        fs.lstatSync(caminho)
    } catch (erro) {
        if(erro.code === 'ENOENT') {
            console.log(chalk.red('Erro : Arquivo ou diretório não existe.'));
            return
        }
    }
    
    if(fs.lstatSync(caminho).isFile()) {
        const resultados = await pegaArquivo(argumentos[2])
        imprimeLista(valida, resultados)

    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeDoArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`)
            imprimeLista(valida, lista, nomeDoArquivo)
        })
        
    }
}

processaTexto(caminho)