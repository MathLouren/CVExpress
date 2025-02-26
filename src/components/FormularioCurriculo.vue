<template>
  <div class="form-container">
    <h2>Informações Pessoais</h2>
    <form @submit.prevent="salvarDados">
      <!-- Nome -->
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input
          type="text"
          v-model="localCurriculo.nome"
          id="nome"
          required
          class="form-input"
          @input="validarNome"
          placeholder="Nome Completo"
        />
        <span v-if="erros.nome" class="erro">{{ erros.nome }}</span>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          v-model="localCurriculo.email"
          id="email"
          required
          class="form-input"
          @input="validarEmail"
          placeholder="E-mail"
        />
        <span v-if="erros.email" class="erro">{{ erros.email }}</span>
      </div>

      <!-- Telefone -->
      <div class="form-group">
        <label for="telefone">Telefone:</label>
        <input
          type="tel"
          v-model="localCurriculo.telefone"
          id="telefone"
          class="form-input"
          @input="formatarTelefone"
          placeholder="Telefone"
        />
        <span v-if="erros.telefone" class="erro">{{ erros.telefone }}</span>
      </div>

      <!-- Endereço: Opção CEP ou Manual -->
      <div class="form-group">
        <label>Escolha como deseja preencher o endereço:</label>
        <div style="display: flex; gap: 20px; align-items: center;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="radio" id="cep" v-model="enderecoEscolha" value="cep" />
            <label for="cep">Usar CEP</label>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="radio" id="manual" v-model="enderecoEscolha" value="manual" />
            <label for="manual">Escrever Endereço Manualmente</label>
          </div>
        </div>
      </div>

      <!-- CEP -->
      <div v-if="enderecoEscolha === 'cep'" class="form-group">
        <label for="cep">CEP:</label>
        <input
          type="text"
          v-model="cep"
          id="cep"
          class="form-input"
          @blur="buscarEndereco"
          placeholder="CEP"
        />
        <span v-if="erros.cep" class="erro">{{ erros.cep }}</span>
      </div>

      <!-- Endereço Manual -->
      <div v-if="enderecoEscolha === 'manual'" class="form-group">
        <label for="endereco">Endereço:</label>
        <input
          type="text"
          v-model="localCurriculo.endereco"
          id="endereco"
          class="form-input"
          @input="validarEndereco"
          placeholder="Endereço"
        />
      </div>

      <div class="form-group">
        <label for="numeroResidencia">Número da Residência:</label>
        <input
          type="text"
          v-model="localCurriculo.numeroResidencia"
          id="numeroResidencia"
          class="form-input"
          @input="validarNumeroResidencia"
          placeholder="Número da Residência"
        />
        <span v-if="erros.numeroResidencia" class="erro">{{ erros.numeroResidencia }}</span>
      </div>

      <div class="form-group">
        <label for="cidade">Cidade:</label>
        <input
          type="text"
          v-model="localCurriculo.cidade"
          id="cidade"
          class="form-input"
          @input="validarEndereco"
          placeholder="Cidade"
        />
      </div>

      <!-- Outras seções do formulário -->
      <h2>Experiência Profissional</h2>
      <div v-for="(experiencia, index) in localCurriculo.experiencias" :key="index" class="form-group">
        <!-- Experiência Profissional -->
        <label :for="'empresa' + index">Empresa:</label>
        <input
          type="text"
          v-model="experiencia.empresa"
          :id="'empresa' + index"
          required
          class="form-input"
          @input="validarExperiencia(index)"
        />
        <span v-if="erros.experiencias[index]?.empresa" class="erro">{{ erros.experiencias[index].empresa }}</span>

        <!-- Cargo -->
        <label :for="'cargo' + index">Cargo:</label>
        <input
          type="text"
          v-model="experiencia.cargo"
          :id="'cargo' + index"
          required
          class="form-input"
          @input="validarExperiencia(index)"
        />
        <span v-if="erros.experiencias[index]?.cargo" class="erro">{{ erros.experiencias[index].cargo }}</span>

        <button type="button" @click="removerExperiencia(index)" class="btn-remove">Remover</button>
      </div>
      <button type="button" @click="adicionarExperiencia" class="btn-add">Adicionar Experiência</button>

      <!-- Formação Acadêmica -->
      <h2>Formação Acadêmica</h2>
      <div v-for="(formacao, index) in localCurriculo.formacoes" :key="index" class="form-group">
        <label :for="'instituicao' + index">Instituição:</label>
        <input
          type="text"
          v-model="formacao.instituicao"
          :id="'instituicao' + index"
          required
          class="form-input"
          @input="validarFormacao(index)"
        />
        <span v-if="erros.formacoes[index]?.instituicao" class="erro">{{ erros.formacoes[index].instituicao }}</span>

        <label :for="'curso' + index">Curso:</label>
        <input
          type="text"
          v-model="formacao.curso"
          :id="'curso' + index"
          required
          class="form-input"
          @input="validarFormacao(index)"
        />
        <span v-if="erros.formacoes[index]?.curso" class="erro">{{ erros.formacoes[index].curso }}</span>

        <label :for="'periodo' + index">Período:</label>
        <select
          v-model="formacao.periodo"
          :id="'periodo' + index"
          required
          class="form-input"
          @change="validarFormacao(index)"
        >
          <option disabled value="">Selecione</option>
          <option v-for="n in 8" :key="n" :value="n">{{ getPeriodoNome(n) }}</option>
          <option value="formado">Formado</option>
        </select>

        <span v-if="erros.formacoes[index]?.periodo" class="erro">{{ erros.formacoes[index].periodo }}</span>


        <button type="button" @click="removerFormacao(index)" class="btn-remove">Remover</button>
      </div>
      <button type="button" @click="adicionarFormacao" class="btn-add">Adicionar Formação</button>
      
      <!-- <h2>Observações e Informações Personalizadas</h2>
    <div class="form-group">
      <label for="titulo">Título:</label>
      <input
        type="text"
        v-model="localCurriculo.titulo"
        id="titulo"
        class="form-input"
        placeholder="Exemplo: Objetivos ou Resumo Profissional"
      />
    </div>

    <div class="form-group">
      <label for="descricao">Texto Descritivo:</label>
      <textarea
        v-model="localCurriculo.descricao"
        id="descricao"
        class="form-input"
        rows="4"
        placeholder="Escreva um texto sobre você, objetivos, etc."
      ></textarea>
    </div>

    <div class="form-group">
      <label for="lista">Lista de Habilidades:</label>
      <textarea
        v-model="localCurriculo.lista"
        id="lista"
        class="form-input"
        rows="4"
        placeholder="Exemplo: Python, JavaScript, Comunicação"
      ></textarea>
      <span v-if="erros.lista" class="erro">{{ erros.lista }}</span>
    </div>

    <div class="form-group">
      <button type="button" @click="adicionarLista" class="btn-add">Adicionar à Lista</button>
    </div> -->

    <!-- Salvar -->
    </form>
  </div>
</template>
<script>
export default {
  props: {
    curriculo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localCurriculo: {
        titulo: "",
        descricao: "",
        lista: [],
        ...this.curriculo, // Garante que `localCurriculo` tenha todas as propriedades de `curriculo`
      },
      cep: "",
      enderecoEscolha: "cep",
      novaLista: "",
      erros: {
        nome: "",
        numeroResidencia: "",
        email: "",
        telefone: "",
        endereco: "",
        cidade: "",
        cep: "",
        experiencias: [],
        formacoes: [],
        lista: "",
      },
    };
  },
  watch: {
    curriculo: {
      handler(newVal) {
        this.localCurriculo = {
          titulo: "",
          descricao: "",
          lista: [],
          ...newVal, // Garante que novas propriedades do curriculo sejam preservadas
        };
      },
      deep: true,
    },
  },
  methods: {
    async buscarEndereco() {
      const cep = this.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
          if (!data.erro) {
            this.localCurriculo.endereco = data.logradouro;
            this.localCurriculo.cidade = data.localidade;
            this.erros.cep = "";
          } else {
            this.erros.cep = "CEP não encontrado.";
          }
        } catch (error) {
          this.erros.cep = "Erro ao buscar o CEP.";
        }
      } else {
        this.erros.cep = "CEP inválido.";
      }
    },

    validarNumeroResidencia() {
      const numero = this.localCurriculo.numeroResidencia?.trim() || "";
      if (!numero) {
        this.erros.numeroResidencia = "O número da residência é obrigatório.";
      } else if (!/^\d+([a-zA-Z]?)$/.test(numero)) {
        this.erros.numeroResidencia = "O número da residência deve ser um número válido.";
      } else {
        this.erros.numeroResidencia = "";
      }
      this.emitirAtualizacao();
    },

    adicionarExperiencia() {
      this.localCurriculo.experiencias.push({ empresa: "", cargo: "", periodo: "" });
      this.erros.experiencias.push({ empresa: "", cargo: "", periodo: "" });
      this.emitirAtualizacao();
    },

    removerExperiencia(index) {
      this.localCurriculo.experiencias.splice(index, 1);
      this.erros.experiencias.splice(index, 1);
      this.emitirAtualizacao();
    },

    adicionarLista() {
      if (typeof this.localCurriculo.lista === "string" && this.localCurriculo.lista.trim()) {
        this.localCurriculo.lista = this.localCurriculo.lista.split(",").map((item) => item.trim());
        this.erros.lista = "";
        this.emitirAtualizacao();
        this.localCurriculo.titulo = ""
        this.localCurriculo.descricao = ""
        this.localCurriculo.lista = ""
      } else {
        this.erros.lista = "A lista de habilidades não pode estar vazia.";
      }
    },

    adicionarFormacao() {
      this.localCurriculo.formacoes.push({ instituicao: "", curso: "", periodo: "" });
      this.erros.formacoes.push({ instituicao: "", curso: "", periodo: "" });
      this.emitirAtualizacao();
    },

    removerFormacao(index) {
      this.localCurriculo.formacoes.splice(index, 1);
      this.erros.formacoes.splice(index, 1);
      this.emitirAtualizacao();
    },

    validarNome() {
      const nome = this.localCurriculo.nome?.trim() || "";
      if (!nome) {
        this.erros.nome = "O nome é obrigatório.";
      } else if (!/^[a-zA-Z\s]+$/.test(nome)) {
        this.erros.nome = "O nome deve conter apenas letras.";
      } else {
        this.erros.nome = "";
      }
      this.emitirAtualizacao();
    },

    validarEmail() {
      const email = this.localCurriculo.email?.trim() || "";
      if (!email) {
        this.erros.email = "O email é obrigatório.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        this.erros.email = "Insira um email válido.";
      } else {
        this.erros.email = "";
      }
      this.emitirAtualizacao();
    },

    formatarTelefone() {
      let telefone = this.localCurriculo.telefone?.replace(/\D/g, "") || "";
      if (telefone.length > 11) telefone = telefone.slice(0, 11);

      if (telefone.length > 10) {
        telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      } else if (telefone.length > 6) {
        telefone = telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
      } else if (telefone.length > 2) {
        telefone = telefone.replace(/^(\d{2})(\d{0,4})$/, "($1) $2");
      } else if (telefone.length > 0) {
        telefone = telefone.replace(/^(\d{0,2})$/, "($1");
      }

      this.localCurriculo.telefone = telefone;
      this.emitirAtualizacao();
    },

    validarEndereco() {
      const endereco = this.localCurriculo.endereco?.trim() || "";
      this.erros.endereco = endereco ? "" : "O endereço é obrigatório.";
      this.emitirAtualizacao();
    },

    validarExperiencia(index) {
      const experiencia = this.localCurriculo.experiencias[index] || {};
      this.erros.experiencias[index] = {
        empresa: !experiencia.empresa?.trim() ? "A empresa é obrigatória." : "",
        cargo: !experiencia.cargo?.trim() ? "O cargo é obrigatório." : "",
        periodo: !experiencia.periodo?.trim() ? "O período é obrigatório." : "",
      };
      this.emitirAtualizacao();
    },

    getPeriodoNome(periodo) {
      return periodo === "formado" ? "FORMADO" : periodo >= 1 && periodo <= 16 ? `${periodo}º PERÍODO` : "";
    },

    validarFormacao(index) {
      const periodo = this.localCurriculo.formacoes[index]?.periodo;
      this.erros.formacoes[index] = {
        ...this.erros.formacoes[index],
        periodo: periodo !== "formado" && (periodo < 1 || periodo > 8)
          ? 'O período deve ser entre 1 e 8 ou "Formado".'
          : "",
      };
    },

    emitirAtualizacao() {
      this.$emit("update:curriculo", this.localCurriculo);
    },

    salvarDados() {
      if (this.validarFormulario()) {
        this.emitirAtualizacao();
        this.$emit("salvar-curriculo", this.localCurriculo);
      }
    },

    validarFormulario() {
      this.validarNome();
      this.validarEmail();
      this.validarEndereco();
      this.localCurriculo.experiencias.forEach((_, index) => this.validarExperiencia(index));
      this.localCurriculo.formacoes.forEach((_, index) => this.validarFormacao(index));

      return (
        !this.erros.nome &&
        !this.erros.email &&
        !this.erros.endereco &&
        this.erros.experiencias.every((e) => !e.empresa && !e.cargo && !e.periodo) &&
        this.erros.formacoes.every((f) => !f.instituicao && !f.curso && !f.periodo)
      );
    },
  },
};
</script>


  
<style scoped>
.form-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  border-color: #007BFF;
  outline: none;
}

.btn-add, .btn-remove, .btn-submit {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-add {
  background-color: #007BFF;
  color: white;
  margin-bottom: 15px;
}

.btn-add:hover {
  background-color: #0056b3;
}

.btn-remove {
  background-color: #dc3545;
  color: white;
  margin-top: 10px;
}

.btn-remove:hover {
  background-color: #c82333;
}

.btn-submit {
  background-color: #28a745;
  color: white;
  margin-top: 20px;
  display: block;
}

.btn-submit:hover {
  background-color: #218838;
}

h2 {
  margin-top: 20px;
  margin-bottom: 10px;
  color: #333;
}

.erro {
  color: red;
  font-size: 0.875rem;
  margin-top: 5px;
  display: block;
}
</style>