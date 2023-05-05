import chalk from "chalk";

function extraiLinks(arrLinks) {
   return arrLinks.map((objetoLink) => Object.values(objetoLink).join())
}

function manejaErros(erro) {
    if(erro.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado';
    } else {
        'Ocorreu algum erro em :' + erro.cause.hostname
    }
}

async function checaStatus(listaURLs) {
    const arrStatus = await Promise.all(
        listaURLs.map(async(url) => {
            try {
                const response = await fetch(url, { method: 'HEAD' });
                return `${response.status} - ${response.statusText}`;
            } catch (erro) {
                return manejaErros(erro)
            }
        }) 
    )
    return arrStatus
}


export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);
    // return status;

    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}

// const res = await fetch('https://nodejs.org/api/documentation.json');
// if(res.ok) {
//     const data = await res.json();
//     console.log(data)
// }

