const express = require("express");
const { create } = require("express-handlebars");
const fs = require('fs');

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

//RUTAS DE VISTAS
app.get(["/", "/home"], (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/products", (req, res) => {
    res.render("products", {
        productos: ["Pera", "Manzana", "Sandia", "Naranja", "Melón"],
    });
});

app.get("/users", (req, res) => {
    res.render("users", {
        usuarios: ["Carlos", "Mauricio", "María", "Juana"],
    });
});

app.get("/users2", (req, res) => {
    res.render("usuarios", {
        user2: [
            {
                id: 1,
                nombre: "Carlos",
                apellido: "Perez",
                email: "aaa@aaa.com",
                telefono: "123456789"
            },
            {
                id: 2,
                nombre: "Darold",
                apellido: "Trench",
                email: "darold@aaa.com",
                telefono: "123456789"
            },
            {
                id: 3,
                nombre: "Kevin",
                apellido: "Smith",
                email: "Kevin@aaa.com",
                telefono: "123456789"
            },
            {
                id: 4,
                nombre: "Jazmin",
                apellido: "Smith",
                email: "Jaz@aaa.com",
                telefono: "123456789"
            },
            {
                id: 5,
                nombre: "Paloma",
                apellido: "Smith",
                email: "Paloma@aaa.com",
                telefono: "123456789"
            },
        ]
    });
});

let baseDato = fs.readFileSync(__dirname+"/bbdd/usuarios.json", "utf8")
let datos = JSON.parse(baseDato)


app.get("/users3", (req, res) => {
    res.render("usuarios", {
        user2: datos
    });
});

/* Crear una vista llamada usuarios:
Utilizar tablas para mostrar 5 usuarios con los siguientes datos:
Id, nombre, apellido, email y teléfono.
Utilizar helpers que muestren contenido dinámico dependiendo si existen 
o no usuarios para mostrar, iterar el array de usuarios.
Actividad: 20 MINUTOS EN SALAS VIRTUALES. */
