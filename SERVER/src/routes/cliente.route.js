const express = require('express');

const enrutador = express.Router();

const db = require('../database')

enrutador.get('/cliente', (req, res) => {

    //vamos a realizar una consulta a la base de datos.
    db.query('select * from cliente', (err, rows) => {

        if (!err) {
            res.json(rows);

        } else {

            //Entregamos como respuesta los datos de la tabla en formato JSON
            res.json('Error al traer los datos de la tabla cliente');

        }

    })



});

enrutador.delete('/cliente/:codigo',async (req, res) => {
    var id = req.params.codigo;
    db.query('delete from cliente where id_cliente = ?', [id]);

    res.json('El cliente fue eliminado');

});

enrutador.post('/cliente', async (req, res) => {

    const unCliente = req.body;
    await db.query('insert into cliente set ?', [unCliente], (err,result) => {
        if(err){
            return console.log('Algo ocurrió!!')

        }else{
            res.json('El cliente se insertó correctamente')

        }
    })

    
});

enrutador.put('/cliente/:codigo', (req, res) => {
    const id = req.params.codigo;
    const clienteModificado = req.body;
    db.query('update cliente set ? where id_cliente = ?', [clienteModificado, id],(err,result) => {
        
   
        if(err){
            return console.log('Algo ocurrió!!')

        }else{
            res.json('El cliente se actualizó correctamente');

        }
    })
});
module.exports = enrutador;
