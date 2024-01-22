import conexion from "../mysql_conector.js";

export const getClientes = async (req, res) => {
  //argumentos de peticion y respuesta
  try {
    const [result] = await conexion.query("Select * from clientes"); //se pone result entre corchetes [] para que devuelva el primer elemento
    console.log(result);
    res.status(200).json(result); //se manda el valor
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

export const getCliente = async (req, res) => {
  //argumentos de peticion y respuesta

  try {
    // console.log(req.params);
    // const [result] = await conexion.query("Select * from clientes where id =?",[req.params.id]); //asi se pasa el parametro id de la consulta

    //otra forma:
    const { id } = req.params; //para extraer el atributo id de params
    const [result] = await conexion.query(
      "Select * from clientes where id =?",
      [id]
    ); //asi se pasa el parametro id de la consulta
    console.log(result);
    // res.status(200).json(result) //se manda el valor y lo devuelve en forma de array
    res.status(200).json(result[0]); //se manda el valor. Solo devuelve un objeto
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

export const delCliente = async (req, res) => {
  try {
    const { id } = req.params; //obtenemos el atributo id de params
    const [result] = await conexion.query("Delete from clientes where id =?", [
      id,
    ]);
    if (result.affectedRows == 0) {
      //se comprueba si se ha afectado alguna fila. si no, status 400(fallo), si si, status 200(todo ok)
      return res.status(400).json({
        message: "No existe",
      });
    } else {
      return res.status(200).json({
        message: "Cliente borrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

export const addCliente = async (req, res) => {
  try {
    console.log(req.body);
    const { nameCliente, emailCliente, tlfnoCliente, empresaCliente } =
      req.body;
    const [result] = await conexion.query(
      "insert into clientes (nameCliente, emailCliente, tlfnoCliente,empresaCliente) values(?,?,?,?)",
      [nameCliente, emailCliente, tlfnoCliente, empresaCliente]
    );
    console.log(result);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

export const updateCliente = async (req, res) => {
  try {
    console.log(req.body);
    const { nameCliente, emailCliente, tlfnoCliente, empresaCliente } =
      req.body;
    const { id } = req.params;
    const [result] = await conexion.query(
      "update clientes set nameCliente =?, emailCliente = ?, tlfnoCliente = ?, empresaCliente = ? where id = ?",
      [nameCliente, emailCliente, tlfnoCliente, empresaCliente, id]
    );
    console.log(result);
    //verificamos si ha ido bien.
    if (result.affectedRows == 0) {
      return res.status(400).json({
        message: "No existe",
      });
    } else {
      return res.status(200).json({
        message: "Cliente actualizado",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};
export const updateClientePatch = async (req, res) => {
  try {
    console.log(req.body);
    const { nameCliente, emailCliente, tlfnoCliente, empresaCliente } =
      req.body;
    const { id } = req.params;
    const [result] = await conexion.query(
      "update clientes set nameCliente =ifnull(?,nameCliente), emailCliente = ifnull(?,emailCliente), tlfnoCliente = ifnull(?,tlfnoCliente), empresaCliente = ifnull(?,empresaCliente) where id = ?",
      [nameCliente, emailCliente, tlfnoCliente, empresaCliente, id]
    );
    console.log(result);
    //verificamos si ha ido bien.
    if (result.affectedRows == 0) {
      return res.status(400).json({
        message: "No existe",
      });
    } else {
      return res.status(200).json({
        message: "Cliente actualizado",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};
