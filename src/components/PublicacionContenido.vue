<template>

    <div class="row">
        <div class="col-4">
             <div class="mb-3">
                <label class="form-label">Título</label>
                <input v-model="titulo" class="form-control" type="text">
            </div>
            <div class="mb-3">
                <label class="form-label">Noticia</label>
                <textarea v-model="cuerpo" class="form-control" rows="5"></textarea>
            </div>

            <button @click="mostrar()" class="btn btn-primary">Mostrar</button>
        </div>
        <div class="col-8">
            <ul class="list-group">
                <li v-for="p in publicaciones" v-bind:key="p.id" class="list-group-item">
                    {{p.title}}
                </li>
            
            </ul>
        </div>
    </div>
   
</template>

<script>
export default {
    nane:"PublicacionContenido",
    data(){
        return{
            cuerpo:"",
            titulo:"",
            publicaciones:[]
        }

    },
    methods:{
        mostrar(){
            console.log(`
            Noticias de hoy
            ${this.titulo}

            Desarrolo:
            ${this.cuerpo}
            
            `);
            this.listarPublicaciones()
            
        },
        async listarPublicaciones()
        {
            const lista = await fetch('https://jsonplaceholder.typicode.com/posts')
            this.publicaciones = await lista.json()
        }
    }
}
</script>