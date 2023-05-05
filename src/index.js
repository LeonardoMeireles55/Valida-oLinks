#!/usr/bin/env node

import fs from 'fs'
import chalk from "chalk";



function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({ [captura[1]]: captura[2] }))
    return resultados.length !== 0 ? resultados : 'Não foram encontrados links no arquivo.'
}


const trataErro = (erro) => {
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório!.'));

}

//async/await:

async function pegaArquivo(caminho) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminho, encoding)
        // console.log(texto) 
        return extraiLinks(texto);
    }
    catch (erro) {
        trataErro(erro)
    } finally {
        console.log(chalk.yellow('Finalizado!'));
    }
}

export default pegaArquivo;



//promises com then()
// const pegaArquivo = (caminho) => {
//     const encoding = 'utf-8';
//     fs.promises.readFile(caminho, encoding)
//     .then((texto) => console.log(chalk.green(texto)))
//     .catch(trataErro)
// }


//beta :
// const pegaArquivo = (caminho) => {
//     const encoding = 'utf-8';
//     fs.readFile(caminho, encoding, (erro, texto) => {
//         if(erro) {
//             trataErro(erro)
//         }
//         console.log(chalk.green(texto));
//     })
// }



// REGEX:  \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)