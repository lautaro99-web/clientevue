<template>
  <h4>Recibiendo datos del Sistema</h4>

  <div class="row mb-3">
    <div class="col-4">
      <select @change="capturar_random()" v-model="equipo" class="form-select">
        <option value="" selected disabled>Seleccione equipo...</option>
        <option  value="http://192.168.0.8:3000">Mi equipo</option>
      </select>
    </div>
  </div>

  <div class="row">
    <div class="col s12 m4">
      <div class="card text-white bg-warning">
        <div class="card-header text-center">
          <b>{{ descripcion_os_oos }}</b>
        </div>
        <div class="card-body text-center">
          <h1>{{ valor_os_oos }}</h1>
        </div>
        <div class="card-footer">
          <h4></h4>
        </div>
      </div>
    </div>
    <div class="col s12 m4">
      <div class="card text-white bg-info">
        <div class="card-header text-center">
          <b>{{ descripcion_os_hostname }}</b>
        </div>
        <div class="card-body text-center">
          <h1>{{ valor_os_hostname }}</h1>
        </div>
        <div class="card-footer">
          <h4></h4>
        </div>
      </div>
    </div>
    <div class="col s12 m4">
      <div class="card text-white bg-danger">
        <div class="card-header text-center">
          <b>{{ descripcion_os_arch }}</b>
        </div>
        <div class="card-body text-center">
          <h1>{{ valor_os_arch }}</h1>
        </div>
        <div class="card-footer">
          <h4></h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "SocketIndicador",
  data() {
    return {
      valor_recibido: null,
      estado: "",
      equipo: "",
      valor_os_oos: null,
      descripcion_os_oos: "",
      valor_os_hostname: null,
      descripcion_os_hostname: "",
      valor_os_arch: null,
      descripcion_os_arch: "",
      lista:[]
    };
  },
  methods: {
    capturar_random() {
      //Tenemos que vicular cliente con servidor
      const socket = io(this.equipo);

      

      socket.on("dato-oos", (objeto) => {
        this.valor_os_oos = objeto.dataS;
        this.descripcion_os_oos = objeto.descripcion;
      });

      socket.on("dato-hostname", (objeto) => {
        this.valor_os_hostname = objeto.dataH;
        this.descripcion_os_hostname = objeto.descripcion;
      });

      socket.on("dato-arch", (objeto) => {
        this.valor_os_arch = objeto.dataA;
        this.descripcion_os_arch = objeto.descripcion;
      });


    },
    listarClientes() {
         this.axios.get("http://localhost:3000/cliente").then((result) => {
         this.lista = result.data;
        });
    }
  },

  mounted() {
    this.capturar_random();
    listarClientes();
  },
};
</script>