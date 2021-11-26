<template>
    <h4>Recibiendo datos de la Red</h4>
    
    <div class="row mb-3">
        <div class="col s12 m3">
            <select @change="capturar_random()" v-model="equipo" class="form-select">
                <option value="" selected disabled>Seleccione equipo...</option>
                <option value="http://192.168.0.8:3000">Mi equipo</option>

            </select>

        </div>
    </div>

    <div class="row">
            
            <div class="col s12 m12">
                <div class="card text-white bg-danger">
                    <div class="card-header text-center" ><b>{{descripcion_stat_interface}}</b></div>
                    <div class="card-body text-center">
                        <h1>{{valor_stat_interface}}</h1>
                    </div>
                    <div class="card-footer">
                        <h4>Valores en Bytes</h4>
                    </div>
                </div>
            </div>

    </div>

    
</template>

<script>
import io from 'socket.io-client';


export default {
    name:'NetstatIndicador',
    data() {
        return{
            valor_recibido:null,
            estado:'',
            equipo:"",
            valor_net_inOut:null,
            descripcion_net_inOut:"",
            valor_stat_interface:null,
            descripcion_stat_interface:"",
            lista:[]


        }
    },
    methods: {
        capturar_random()
        {
            //Tenemos que vicular cliente con servidor
           const socket = io(this.equipo)

           socket.on('datos-out', (objeto)=> {
               this.valor_net_inOut = objeto.dataO;
               this.descripcion_net_inOut = objeto.descripcion;

           });
           
           socket.on('datos-net', (objeto)=> {
               this.valor_stat_interface = objeto.data;
               this.descripcion_stat_interface = objeto.descripcion;
               

           })
            


        },
        listarClientes() {
         this.axios.get("http://localhost:3000/cliente").then((result) => {
         this.lista = result.data;
        });
        }
        
    },

    mounted()
    {
    
        this.capturar_random();
        listarClientes();
    }
}
</script>