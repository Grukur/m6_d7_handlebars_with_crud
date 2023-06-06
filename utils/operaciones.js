
const fs = require('fs');

const leerArchivo = (archivo)=>{
    return new Promise((resolve, reject) => {
        fs.readFile(`./db/${archivo}`, 'utf8', (error, data) => {
            if (error) {
                reject ('Error al acceder al archivo')};
            resolve(JSON.parse(data));
        });
    });
};

const escribirArchivo = (archivo, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./db/${archivo}`, JSON.stringify(data, null, 4),'utf8', (error) => {
            if (error) {
                reject ('Error al escribir archivo')};
            resolve('Se guardo exitosamente el archivo');
        });
    });
};

module.exports = {
    leerArchivo,
    escribirArchivo,
}