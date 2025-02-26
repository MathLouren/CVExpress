<template>
    <div v-if="mostrarAviso" class="lgpd-aviso">
      <p>Respeitamos sua privacidade! Não armazenamos cookies nem seus dados pessoais, em conformidade com a LGPD.</p>
      <button @click="fecharAviso">Entendi</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        mostrarAviso: true, 
      };
    },
    methods: {
      fecharAviso() {
        this.mostrarAviso = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .lgpd-aviso {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  button {
    background: #ff9800;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    color: #fff;
    border-radius: 3px;
  }
  </style>
  