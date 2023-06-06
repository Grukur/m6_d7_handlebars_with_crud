const {leerArchivo, escribirArchivo, leerArchivo} = require('../utils/operaciones.js');

class Usuario {
    constructor(id, nombre, apellido, email, telefono) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
    }
    async findAll(){
        return await leerArchivo('usuarios.json')
        /* leer().then(usuarios =>{
            return JSON.parse(usuarios)
        }).catch(error =>{
            throw new Error(error)
        }) */
    }
    async findById (id) {
        let data = await leerArchivo("personas.json");
        let found = data.usuarios.find((usuario) => usuario.id == id);
        return found;
    }
    findByEmail (email) {
        console.log('busca por email');
    }
    async save() {
        let data = await leerArchivo('usuarios.json');
        let usuario = {
            id: this.id, 
            nombre:this.nombre, 
            apellido:this.apellido, 
            emial: this.email, 
            telefono: this.telefono
        };
        data.usuarios.push(usuario)
        return await escribirArchivo('usuarios.json', data);
    }
    async update(usuario) {
        console.log('Guardando usuario.');
    }
    async delete(id) {
        console.log('Guardando usuario.');
    }    
}

module.exports = Usuario;