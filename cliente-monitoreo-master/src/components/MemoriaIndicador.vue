<template>
    <h4>Recibiendo datos de la Memoria</h4>
    
    <div class="row mb-3">
        <div class="col s12 m3">
            <select @change="capturar_random()" v-model="equipo" class="form-select">
                <option value="" selected disabled>Seleccione equipo...</option>
                <option v-for="cliente of lista_cliente" v-bind:key="cliente.id_cliente" :value="cliente.ip">Mi IP</option>
                
            </select>

        </div>

    </div>
    
    <div class="row">
    <div class="col s12 m4">
      <div class="card text-white bg-warning">
        <div class="card-header text-center">
          <b>{{ descripcion_memory_total }}</b>
        </div>
        <div class="card-body">
          <h1>{{ valor_memory_total }}</h1>
        </div>

        <div class="card-footer">
          <h4>Valor en Mb</h4>
        </div>
      </div>
    </div>

    <div class="col s12 m4">
      <div class="card text-white bg-success">
        <div class="card-header text-center">
          <b>{{ descripcion_memory_free }}</b>
        </div>
        <div class="card-body text-center">
          <h1>{{ valor_memory_free }}</h1>
        </div>
        <div class="card-footer">
          <h4>Valor en Mb</h4>
        </div>
      </div>
    </div>
    <div class="col s12 m4">
      <div class="card text-white bg-info">
        <div class="card-header text-center">
          <b>{{ descripcion_memory_used }}</b>
        </div>
        <div class="card-body text-center">
          <h1>{{ valor_memory_used }}</h1>
        </div>
        <div class="card-footer">
          <h4>Valor en Mb</h4>
        </div>
      </div>
    </div>
    
  </div>

    

</template>

<script>
import io from 'socket.io-client';

export default {
    name:'SocketIndicador',
    data() {
        return{
            valor_recibido:null,
            estado:'',
            equipo:"",
            nombre:"",
            valor_memory_free:null,
            descripcion_memory_free:"",
            valor_memory_used:null,
            descripcion_memory_used:"",
            valor_memory_total:null,
            descripcion_memory_total:"",
            lista:[]
            


        }
    },
    methods: {
        capturar_random()
        {
            //Tenemos que vicular cliente con servidor
           const socket = io(this.equipo)

            socket.on('total-memory', (objeto)=> {
               this.valor_memory_total = objeto.dataT.toFixed(2);
               this.descripcion_memory_total = objeto.descripcion;

           });
            socket.on('free-memory', (objeto)=> {
               this.valor_memory_free = objeto.dataF.toFixed(2);
               this.descripcion_memory_free = objeto.descripcion;

           });

           socket.on('uso-memory', (objeto)=> {
               this.valor_memory_used = objeto.data;
               this.descripcion_memory_used = objeto.descripcion;

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