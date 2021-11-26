<template>
  

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

    <div class="container-fluid">
      <a class="navbar-brand" href="#">Monitoreo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor02">

        <ul class="navbar-nav me-auto">
          <li class="nav-item">
              <router-link class="nav-link" to="/cliente">CLIENTES</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cpu">CPU</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/drive">DRIVE</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/memoria">MEMORY</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/netstat">NETSTAT</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/os">OS</router-link>
            </li>
         
        </ul>
        
      </div>

    </div>
  </nav>
  <div class="container mt-3">
    <router-view/>
  </div>


</template>

<style>

</style>
