import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const leerDatos = () => {
  try {
    const datos = fs.readFileSync("./db.json"); // Nombre del archivo cambiado a autos.json
    return JSON.parse(datos);
  } catch (error) {
    console.log(error);
  }
};

const escribirDatos = (datos) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(datos)); // Nombre del archivo cambiado a autos.json
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi API de alquiler de autos!");
});

app.get("/autos", (req, res) => {
  const datos = leerDatos();
  res.json(datos.autos); // "libros" cambiado a "autos"
});

app.get("/autos/:id", (req, res) => {
  const datos = leerDatos();
  const id = parseInt(req.params.id);
  const auto = datos.autos.find((auto) => auto.id === id); // "libro" cambiado a "auto"
  res.json(auto);
});

app.post("/autos", (req, res) => {
  const datos = leerDatos();
  const cuerpo = req.body;
  const nuevoAuto = {
    id: datos.autos.length + 1, // "libros" cambiado a "autos"
    ...cuerpo,
  };
  datos.autos.push(nuevoAuto); // "libros" cambiado a "autos"
  escribirDatos(datos);
  res.json(nuevoAuto);
});

app.put("/autos/:id", (req, res) => {
  const datos = leerDatos();
  const cuerpo = req.body;
  const id = parseInt(req.params.id);
  const indiceAuto = datos.autos.findIndex((auto) => auto.id === id); // "libro" cambiado a "auto"
  datos.autos[indiceAuto] = {
    ...datos.autos[indiceAuto],
    ...cuerpo,
  };
  escribirDatos(datos);
  res.json({ mensaje: "Alquiler de auto actualizado exitosamente" }); // Mensaje actualizado
});

app.delete("/autos/:id", (req, res) => {
  const datos = leerDatos();
  const id = parseInt(req.params.id);
  const indiceAuto = datos.autos.findIndex((auto) => auto.id === id); // "libro" cambiado a "auto"
  datos.autos.splice(indiceAuto, 1);
  escribirDatos(datos);
  res.json({ mensaje: "Alquiler de auto eliminado exitosamente" }); // Mensaje actualizado
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
