"use strict"
import { Router } from "express";
import conexion from "../mysql_conector.js";
const router = Router();
//responder a los endpoint. Representa una accion de la api
router.get("/login", async (req, res) => {//argumentos de peticion y respuesta
    const result = await conexion.query("Select 1+1 as Result");
    // res.send("Respuesta servidor con express en la ruta login"); //Mensaje de respuesta
    res.json(result[0])//para que devuelva solo el primer elemento
  });

  export default router;//lo exportamos.