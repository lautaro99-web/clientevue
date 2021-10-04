<template>
  <div class="row">
    <div class="col-4">
      <div class="mb-3">
        <label class="form-label">Tipo</label>
        <input
          v-model="tipo"
          type="text"
          class="form-control"
          placeholder="Ingrese tipo de producto"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Marca</label>
        <input
          v-model="marca"
          type="text"
          class="form-control"
          placeholder="Ingrese marca del producto"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Cantidad</label>
        <input
          v-model="cantidad"
          type="number"
          class="form-control"
          placeholder="Ingrese cantidad de productos"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Precio</label>
        <input
          v-model="precio"
          type="number"
          class="form-control"
          placeholder="Ingrese precio del producto"
        />
      </div>
      <div v-if="estado == 0">
        <button @click="guardarProducto()" class="btn btn-success">Guardar Producto</button>
      </div>
      <div v-if="estado == 1">
        <button @click="actualizarProducto()" class="btn btn-primary">Actualizar Producto</button> 
      </div>

    </div>

    <div class="col-8">
      <table class="table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody v-for="producto of lista" v-bind:key="producto.id_producto">
          <tr>
            <td>{{ producto.tipo }}</td>
            <td>{{ producto.marca }}</td>
            <td>{{ producto.cantidad }}</td>
            <td>{{ producto.precio }}</td>
            <td>
              <button @click="eliminarProducto(producto.id_producto)" class="btn btn-danger btn-sm" style="margin-right:4px">x</button>
              <button @click="editar(producto)" class="btn btn-primary btn-sm">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  
  
</template>
 

<script>
export default {
  name: "ProductoForm",
  data() {
    return {
      tipo: "",
      marca: "",
      cantidad: null,
      precio: null,
      id:null,
      lista: [],
      estado: 0
    };
  },
  methods: {
    vaciar() {
      this.tipo = "";
      this.marca = "";
      this.cantidad = null;
      this.precio = null;
    },
    guardarProducto() {
      const unProducto = {
        tipo: this.tipo,
        marca: this.marca,
        cantidad: this.cantidad,
        precio: this.precio,
      };
      this.axios.post("http://localhost:3000/productos", unProducto).then((result) => {
          alert(result.data);
          this.vaciar();
          this.listarProductos();
        });
    },
    listarProductos() {
      this.axios.get("http://localhost:3000/productos").then((result) => {
        this.lista = result.data;
      });
    },
    eliminarProducto(id) {
      this.axios.delete("http://localhost:3000/productos/" + id).then((result) => {
          alert(result.data);
          this.listarProductos();
        });
    },
    editar(unProducto){
      this.estado = 1;
      this.tipo = unProducto.tipo;
      this.marca = unProducto.marca;
      this.cantidad = unProducto.cantidad;
      this.precio = unProducto.precio;
      this.id = unProducto.id_producto;

    },
    actualizarProducto(){
      const productoModificado = {
        tipo:this.tipo,
        marca:this.marca,
        cantidad:this.cantidad,
        precio:this.precio
      }
      this.axios.put("http://localhost:3000/productos/"+this.id,productoModificado).then(result => {
        alert(result.data)
        this.listarProductos()
        this.vaciar()
        this.estado = 0;
      })
    }
  },
  mounted() {
    this.listarProductos();
  },
};
</script>