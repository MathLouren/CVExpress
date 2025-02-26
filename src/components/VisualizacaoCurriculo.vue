<template>
  <div>
    <div id="curriculo" class="curriculo-container">
      <h1 class="curriculo-nome">{{ curriculo.nome }}</h1>
      <div class="curriculo-info">
        <p><strong>Email:</strong> {{ curriculo.email }}</p>
        <p><strong>Telefone:</strong> {{ curriculo.telefone }}</p>
        <p>
          <strong>Endereço:</strong>
          {{ curriculo.endereco }}
          <span v-if="curriculo.endereco && curriculo.numeroResidencia">, </span>
          {{ curriculo.numeroResidencia }}
          <span v-if="curriculo.numeroResidencia && curriculo.cidade"> - </span>
          {{ curriculo.cidade }}
        </p>
      </div>

      <div>
        <h2 class="curriculo-section-title">Experiência Profissional</h2>
        <ul class="curriculo-list">
          <li v-for="(experiencia, index) in curriculo.experiencias" :key="index" class="curriculo-item">
            <span class="curriculo-cargo">{{ experiencia.cargo }} </span>
            <span v-if="experiencia.cargo && experiencia.empresa"> - </span>
            <span class="curriculo-empresa"> {{ experiencia.empresa }}</span>
          </li>
        </ul>
      </div>

      <h2 class="curriculo-section-title">Formação Acadêmica</h2>
      <ul class="curriculo-list">
        <li v-for="(formacao, index) in curriculo.formacoes" :key="index" class="curriculo-item">
          <span class="curriculo-curso uppercase">GRADUAÇÃO EM {{ formacao.curso }}</span>
          <span v-if="formacao.curso && formacao.instituicao" class="uppercase">, </span>
          <span class="curriculo-instituicao uppercase">{{ formacao.instituicao }}</span>
          <span v-if="formacao.instituicao && formacao.periodo" class="uppercase"> - </span>
          <span class="curriculo-periodo uppercase">{{ getPeriodoFormatado(formacao.periodo) }}</span>
        </li>
      </ul>
    </div>

    <div class="form-group">
      <button @click="salvarPDF" class="btn-submit">Salvar PDF</button>
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default {
  props: {
    curriculo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getPeriodoFormatado(periodo) {
      if (periodo === "formado") {
        return "FORMADO";
      } else if (periodo >= 1 && periodo <= 16) {
        return periodo + "º PERÍODO";
      }
    },

    async salvarPDF() {
      const curriculo = document.getElementById("curriculo");

      html2canvas(curriculo, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 190;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 10;

        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("curriculo.pdf");
      });
    },
  },
};
</script>

<style scoped>
/* Estilos do currículo */
.uppercase {
  text-transform: uppercase;
}

.curriculo-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #333;
}

.curriculo-nome {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #202020;
}

.curriculo-info {
  margin-bottom: 20px;
}

.curriculo-info p {
  margin: 5px 0;
  font-size: 1rem;
  color: #555;
}

.curriculo-section-title {
  font-size: 1.8rem;
  margin-top: 20px;
  margin-bottom: 10px;
  color: rgb(61, 61, 61);
  border-bottom: 2px solid rgb(61, 61, 61);
  padding-bottom: 5px;
}

.curriculo-list {
  list-style-type: none;
  padding: 0;
}

.curriculo-item {
  background-color: #f9f9f9;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid rgb(61, 61, 61);
  transition: background-color 0.3s ease;
}

.curriculo-item:hover {
  background-color: #e9f5ff;
}

.curriculo-cargo,
.curriculo-curso {
  font-weight: bold;
  color: rgb(61, 61, 61);
}

.curriculo-empresa,
.curriculo-instituicao {
  color: light dark;
}

.curriculo-periodo {
  font-size: 0.9rem;
  color: light dark;
  margin-top: 5px;
}

.btn-submit {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #0056b3;
}
</style>
