<template>
  <div class="container-fluid p-5">
    <div class="row g-3 justify-content-center">
      <div class="form-group mb-3">
        <label for="filtro">Nome:</label>
        <input type="text" v-model="filtro" class="form-control" id="filtro">
      </div>
      <button type="button" @click="buscar" class="btn btn-primary w-100">Buscar</button>
    </div>
    <div v-if="produtoSelecionado" class="alert alert-info mt-4">
        <button @click="esconderDetalhes()">Close</button>
      <h4>{{ produtoSelecionado.title }}</h4>
      <p><strong>Preço:</strong> {{ produtoSelecionado.price}}</p>
      <p><strong>Descrição:</strong> {{ produtoSelecionado.description }}</p>
      <img :src="produtoSelecionado.images[0]" class="produto-imagem" />
    </div>
    <div class="mt-2">
      <h1>Produtos</h1>
    </div>
    <div class="container my-5">
      <table class="table table-striped table-bordered shadow-lg">
        <thead class="table-dark">
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in produtosFiltrado" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.price | currency }}</td>
            <td>
              <button @click="mostrarDetalhes(item)">Saiba Mais</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
    return {
      showModal: false,
      fitro:'',
      produtos: [],
      produtosFiltrado: [],
      produtoSelecionado: null,
    }
    },
    methods:{
        buscar(){
            if(this.filtro === undefined){
                this.produtosFiltrado = this.produtos;
            }
            else{
                this.produtosFiltrado = this.produtos.filter(item => 
                    item.title.toLowerCase().includes(this.filtro.toLowerCase())
                );
            }
        },
        mostrarDetalhes(produto) {
            this.produtoSelecionado = produto;
        },
        esconderDetalhes() {
            this.produtoSelecionado = null;
        }
    },
    mounted() {
        axios.get('https://dummyjson.com/products?limit=100')
            .then(response => {
                this.produtos = response.data.products; 
                this.produtosFiltrado = response.data.products; 
                console.log(this.produtosFiltrado)
            })
            .catch(error => {
            console.error('Erro ao buscar os produtos:', error)
            })
    }
}
</script>

<style scoped>
.produto-imagem {
  max-width: 300px; 
  max-height: 200px; 
  width: auto; 
  height: auto; 
}
</style>
