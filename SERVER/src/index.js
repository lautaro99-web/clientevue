const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const socketio = require('socket.io')
const os = require('node-os-utils')
const os1 = require('node-os-utils').os


//Accedemos a los recursos.

const cpu = os.cpu

const drive = os.drive

const mem = os.mem

const model = os.cpu

const count = os.cpu

const netstat = os.netstat

const oos = os.oos

const hostname = os.hostname

const arch = os.arch


//obtengo toda la funcionalidad de express
const server = express()

//Espicificamos el formato de datos que va a manipular nuestro servidor, es decir nuestra api.
server.use(express.json())

//Nos va a permitir comunicar el cliente con el servidor y viceversa.
server.use(cors())

//Nos va a notificar en la consola cada vez que se haga petición HTTP(get, put, delete, post)
server.use(morgan())

//seteamos  puerto disponible en el sistema
server.set('port', process.env.PORT || 3000)

//ponemos las rutas en funcionamiento.
server.use(require('./routes/cliente.route'))

//Mostramos por pantalla el puerto en el que corre el servidor
console.log(`Servidor corriendo en el puerto ${server.get('port')}`)

//Le damos arranque a nuestro servidor.
const servidor = server.listen(server.get('port'), () => {
    console.log('La conexion fue exitosa!')
});

//--------------------------------------------------------------------//

//le pasamos el servidor a socketio, para habilitar el canal websocket
const io = socketio(servidor)

//Establecemos la apertura del canal para emitir posteriormente los datos.
io.on('connection', (socket) => {


    //-------------------------CPU------------------------//

    setInterval(() => {
        cpu.usage()
            .then(cpuPercentage => {
                socket.emit('uso-cpu',
                    {
                        descripcion: 'CPU USAGE',
                        dato: cpuPercentage
                    }
                )
            });

    }, 1000)

    setInterval(() => {
        cpu.free()
            .then(info => {
                socket.emit('libre-cpu',
                    {
                        descripcion: 'CPU FREE',
                        data: info
                    }
                )
            });

    }, 1000)

    const info_model = cpu.model()
            
                socket.emit('model-cpu',
                {
                    descripcion:'CPU MODEL',
                    dataM:info_model
                })       
           
                       
    
    const info_count = cpu.count()

                socket.emit('count-cpu', 
                {
                    descripcion:'CPU COUNT',
                    dataC:info_count

                })


     //-------------------------DRIVE------------------------//   

    setInterval(() => {
        drive.info()
            .then(info => {
                socket.emit('uso-drive',
                {
                    descripcion: 'USED DRIVE',
                    datau:info.usedGb,
                    
                })
            });
    }, 1000)
    setInterval(() => {
        drive.info()
            .then(info => {
                socket.emit('free-drive',
                {
                    
                    
                    descripcion: 'FREE DRIVE',
                    dataf:info.freeGb,
                    
                })
            });
    }, 1000)
    setInterval(() => {
        drive.info()
            .then(info => {
                socket.emit('porcentaje-drive',
                {
                    
                    descripcion: 'PORCENTAJE LIBRE DRIVE',
                    data:info.freePercentage,
                   
                })
            });
    }, 1000)
    setInterval(() => {
        drive.info()
            .then(info => {
                socket.emit('total-drive',
                {
                    
                    descripcion: 'TOTAL DRIVE',
                    datat:info.totalGb,
                })
            });
    }, 1000)


    //-------------------------MEMORY------------------------//

    setInterval(() => {
        mem.info()
            .then(info => {
                socket.emit('total-memory',
                {
                    descripcion: 'TOTAL MEMORY',
                    dataT:info.totalMemMb,
                    
                })
            });
    }, 1000)

    setInterval(() => {
        mem.info()
            .then(info => {
                socket.emit('free-memory',
                {
                    
                    descripcion: 'FREE MEMORY',
                    dataF:info.freeMemMb,
                    
                })
            });
    }, 1000)

    setInterval(() => {
        mem.info()
            .then(info => {
                socket.emit('uso-memory',
                {
                    
                    descripcion: 'USED MEMORY',
                    data:info.usedMemMb,
                })
            });
    }, 1000)


    //----------------------NETSTAT------------------------//
    
   /* setInterval(() => {
        netstat.inOut()
            .then(info => {
                socket.emit('datos-out',
                {
                    desscripcion: 'INOUT',
                    dataO: info.eth0.inputMb
                })
            })
        
    }, 1000)*/
    

    setInterval(() => {
        netstat.stats()
            .then(info => {
                socket.emit('datos-net',
                {
                    desscripcion: 'Netstat',
                    data: info[0].outputBytes
                })
            });
    }, 1000)

    //-------------------------OS------------------------//
    os1.oos()
    .then(info => {
        socket.emit('dato-oos',
        {
            desscripcion: 'Nombre del sistema',
            dataS: info,
        })
    });
        
        
    
    const host = os1.hostname()

        socket.emit('dato-hostname',
        {
            descripcion:'NOMBRE DEL EQUIPO',
            dataH: host,
        });
        
    const arch = os1.arch()
        
        socket.emit('dato-arch',
        {
            descripcion:'ARQUITECTURA',
            dataA: arch,
        });      

});
