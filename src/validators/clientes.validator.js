import {check, validationResult} from 'express-validator';
export const validacion=[
    //validar nombre del cliente
    check("nameCliente").exists().notEmpty().isLength({min:5, max:40}).withMessage("El nombre del cliente no debe estar vacío, debe tener entre 5 y 40 caracteres"),
    check("emailCliente").exists().notEmpty().isEmail().withMessage("El email del cliente no debe estar vacío, debe tener formato email"),
    check("tlfnoCliente").exists().notEmpty().isLength({min:9,max:9}).isNumeric().withMessage("El telefono del cliente no debe estar vacío, debe tener 9 caracteres"),
    check("empresaCliente").exists().notEmpty().isLength({min:5, max:50}).matches(/^[A-Z][a-zñA-ZÑ0-9\s]{4,49}$/).withMessage("La empresa del cliente no debe estar vacío, debe tener entre 5 y 40 caracteres"),
    (req,res,next)=>{
        const errors = validationResult(req);//array tantas filas como campos valide
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors:errors.array()//devolver el mensaje
            })
        }else{ //todo correcto
            next();//sigue la ejecución del siguiente middleware
        }
    }

]