<template>


  <div class="row">
    <div class="col s12 m12">
      <div class="mb-3">
        <label class="form-label">Razón Social</label>
        <input
          v-model="razon_social"
          type="text"
          class="form-control"
          placeholder="Ingrese razón social"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Teléfono de contacto</label>
        <input
          v-model="telefono_contacto"
          type="number"
          class="form-control"
          placeholder="Ingrese teléfono"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Correo electrónico</label>
        <input
          v-model="correo_electronico"
          type="text"
          class="form-control"
          placeholder="Ingrese correo"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Dirección</label>
        <input
          v-model="direccion"
          type="text"
          class="form-control"
          placeholder="Ingrese dirección"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Localidad</label>
        <input
          v-model="localidad"
          type="text"
          class="form-control"
          placeholder="Ingrese localidad"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Descripción</label>
        <input
          v-model="equipo_descripcion"
          type="text"
          class="form-control"
          placeholder="Ingrese descripción"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Dirección IP</label>
        <input
          v-model="ip"
          type="text"
          class="form-control"
          placeholder="Ingrese número de IP"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Sistema Operativo</label>
        <input
          v-model="sistema_operativo"
          type="text"
          class="form-control"
          placeholder="Ingrese Sistema Operativo"
        />
      </div>

      <div v-if="estado == 0">
        <button @click="guardarCliente()" class="btn btn-success">Guardar Cliente</button>
      </div>
      <div v-if="estado == 1">
        <button @click="actualizarCliente()" class="btn btn-primary">Actualizar Cliente</button>
      </div>
    </div>

    <div class="col s12 m12">
      <table class="table">
        <thead>
          <tr>
            <th>Razon Social</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Localidad</th>
            <th>Descripción</th>
            <th>IP</th>
            <th>S.O.</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody v-for="cliente of lista" v-bind:key="cliente.id_cliente">
          <tr>
            <td>{{ cliente.razon_social }}</td>
            <td>{{ cliente.telefono_contacto }}</td>
            <td>{{ cliente.correo_electronico }}</td>
            <td>{{ cliente.direccion }}</td>
            <td>{{ cliente.localidad }}</td>
            <td>{{ cliente-equipo_descripcion }}</td>
            <td>{{ cliente.ip }}</td>
            <td>{{ cliente.sistema_operativo }}</td>

            <td>
              <button
                @click="eliminarCliente(cliente.id_cliente)"
                class="btn btn-danger btn-sm"
                style="margin-right: 4px"
              >
                x
              </button>
              <button @click="editar(cliente)" class="btn btn-primary btn-sm">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
 

<script>
//import io from "socket.io-client"

export default {
  name: "ClienteCrud",
  data() {
    return {
      razon_social: "",
      telefono_contacto: "",
      correo_electronico: "",
      direccion: "",
      localidad: "",
      equipo_descripcion: "",
      ip: "",
      sistema_operativo: "",
      id: null,
      lista: [],
      estado: 0
    };
  },
  methods: {

    vaciar() {
      this.razon_social = "";
      this.telefono_contacto = null;
      this.correo_electronico = "";
      this.direccion = null;
      this.localidad = "";
      this.equipo_descripcion = "";
      this.ip = null;
      this.sistema_operativo = "";
    },
    guardarCliente() {
      const unCliente = {
        razon_social: this.razon_social,
        telefono_contacto: this.telefono_contacto,
        correo_electronico: this.correo_electronico,
        direccion: this.direccion,
        localidad: this.localidad,
        equipo_descripcion: this.equipo_descripcion,
        ip: this.ip,
        sistema_operativo: this.sistema_operativo,
      };
      this.axios.post("http://localhost:3000/cliente", unCliente).then((result) => {
          alert(result.data);
          this.vaciar();
          this.listarClientes();
      });
    },
    listarClientes() {
      this.axios.get("http://localhost:3000/cliente").then((result) => {
        this.lista = result.data;
      });
    },
    eliminarCliente(id) {
      this.axios.delete("http://localhost:3000/cliente/" + id).then((result) => {
          alert(result.data);
          this.listarClientes();
        });
    },
    editar(unCliente) {
      this.estado = 1;
      this.razon_social = unCliente.razon_social;
      this.telefono_contacto = unCliente.telefono_contacto;
      this.correo_electronico = unCliente.correo_electronico;
      this.direccion = unCliente.direccion;
      this.localidad = unCliente.localidad;
      this.equipo_descripcion = unCliente.equipo_descripcion;
      this.ip = unCliente.ip;
      this.sistema_operativo = unCliente.sistema_operativo;
      this.id = unCliente.id_cliente;
    },
    actualizarCliente() {
      const clienteModificado = {
        razon_social: this.razon_social,
        telefono_contacto: this.telefono_contacto,
        correo_electronico: this.correo_electronico,
        direccion: this.direccion,
        localidad: this.localidad,
        equipo_descripcion: this.equipo_descripcion,
        ip: this.ip,
        sistema_operativo: this.sistema_operativo,
      };
      this.axios.put("http://localhost:3000/cliente/" + this.id, clienteModificado).then((result) => {
          alert(result.data);
          this.listarClientes();
          this.vaciar();
          this.estado = 0;
        });
    },
  },
  mounted() {
    this.listarClientes();
  },
};
</script>


