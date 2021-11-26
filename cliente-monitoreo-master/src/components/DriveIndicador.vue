<template>
    <h4>Recibiendo datos del Disco</h4>
    
    <div class="row mb-3">
        <div class="col s12 m3">
            <select @change="capturar_random()" v-model="equipo" class="form-select">
                <option value="" selected disabled>Seleccione equipo...</option>
                <option value="http://192.168.0.8:3000">Mi equipo</option>

            </select>
        </div>

    </div>
    
    <div class="row">
        

        <div class="col s12 m3">
            <div class="card text-white bg-warning">
                <div class="card-header text-center" ><b>{{descripcion_drive_used}}</b>
                </div>
                <div class="card-body text-center">
                    <h1>{{valor_drive_used}}</h1>
                </div>
                <div class="card-footer">
                    <h4>Valor en Gb</h4>
                </div>
            </div>
        </div>

        <div class="col s12 m3">
            <div class="card text-white bg-success">
                    <div class="card-header text-center"><b>{{descripcion_drive_free}}</b></div> 
                    <div class="card-body">
                        <h1>{{valor_drive_free}}</h1>
                    </div>
                    
                    <div class="card-footer">
                            
                        <h4>Valor en Gb</h4>

                    </div>
                    

            </div>    
        </div>

        <div class="col s12 m3">
            <div class="card text-white bg-info">
                    <div class="card-header text-center"><b>{{descripcion_drive_porcentaje}}</b></div> 
                    <div class="card-body">
                        <h1>{{valor_drive_porcentaje}}</h1>
                    </div>
                    
                    <div class="card-footer">
                            
                        <h4>Valor %</h4>

                    </div>
                    

            </div>    
        </div>

        <div class="col s12 m3">
            <div class="card text-white bg-danger">
                    <div class="card-header text-center"><b>{{descripcion_drive_total}}</b></div> 
                    <div class="card-body">
                        <h1>{{valor_drive_total}}</h1>
                    </div>
                    
                    <div class="card-footer">
                            
                        <h4>Valor en Gb</h4>

                    </div>
                    

            </div>    
        </div>
        

    </div>
    
</template>

<script>

import io from "socket.io-client";

export default {

    name:"DriveIndicador",
    
    data() {
        return{
            valor_recibido: null,
            estado: "",
            equipo:"",
            nombre: "",
            valor_drive_free:null,
            descripcion_drive_free:"",
            valor_drive_used:null,
            descripcion_drive_used:"",
            valor_drive_porcentaje:"",
            descripcion_drive_porcentaje:"",
            valor_drive_total:"",
            descripcion_drive_total:"",
            lista:[]


        };
    },

    methods: {
        capturar_random() {

            //Tenemos que vicular cliente con servidor
            const socket = io(this.equipo);
           
            
            socket.on("uso-drive", (objeto) => {
                this.valor_drive_used = objeto.datau;
                this.descripcion_drive_used = objeto.descripcion;
                

            });
            

            socket.on("free-drive", (objeto) => {
               
                this.valor_drive_free = objeto.dataf;
                this.descripcion_drive_free = objeto.descripcion;
                
            });

            socket.on("porcentaje-drive", (objeto) => {
                
                
                this.valor_drive_porcentaje = objeto.data;
                this.descripcion_drive_porcentaje = objeto.descripcion;
                
            });

            

            socket.on("total-drive", (objeto) => {
                
                
                
                this.valor_drive_total = objeto.datat;
                this.descripcion_drive_total = objeto.descripcion;

            });


           
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