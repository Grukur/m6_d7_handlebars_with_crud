const express = require("express");
const { create } = require("express-handlebars");
const { v4: uuid } = require('uuid');
const Usuario = require("./model/Usuario");

//instancia de express.
const app = express();

//crear instancia de handlebars
const hbs = create({
    partialsDir: ["views/partials/"],
});


//configuramos express-handlebars como motor de plantilla del proyecto para renderizar vistas
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//MIDDLEWARES

//acepta la info enviada por payload
app.use(express.json());

//establecemos el directorio public en modo público.
app.use(express.static("public"));

//publicamos carpeta dist de boostrap
app.use(
    "/bootstrap",
    express.static(__dirname + "/node_modules/bootstrap/dist/")
);

//indicamos el puerto por el cual nuestro servidor escuchará las peticiones
const PORT = 3000;
app.listen(
    PORT,
    console.log("Servidor escuchando en http://localhost:" + PORT)
);

//RUTAS

//Inicio
app.get(["/", "/home"], (req, res) => {
    res.render("home");
});

//Acerca
app.get("/about", (req, res) => {
    res.render("about");
});

//todos los usuarios
app.get("/users", async (req, res) => {
    let usuario = new Usuario();
    let respuesta = usuario.findAll()
    respuesta
        .then((data) => {
            res.render("users", {
                usuarios: data.usuarios,
            });
        })
        .catch((error) => {
            res.render('users', {
                error,
            });
        });
});

//Crear nuevo Usuario
app.post('/usuarios', async (req, res) => {
    try {
        let { nombre, apellido, email } = req.body;
        let id = uuid().slice(0, 6);
        let newUser = new Usuario(id, nombre, apellido, email, telefono)
        let reply = await newUser.save()
        res.status(201).send({ code: 201, message: reply })
    } catch (error) {
        res.status(500).send({ code: 500, message: 'Ocurrio un error' })
    }
})

//Actualizar usuario
app.get("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let usuario = new Usuario();
        let found = await usuario.findById(id);
        console.log("usuario:", found);
        res.render("update_user", {
            usuario: found,
        });
    } catch (error) {
        res.render("update_user", {
            error: true,
        });
    }
});

//Eliminar usuario

