<template>
  <div class="app">
    <LGPDWarning />
    <TheHeader />
    <main>
      <div class="hero">
        <div style="display: flex; justify-content: center; align-items: center; gap: 15px;">
          <h1>Gerador de Currículos</h1>
          <img src="../src/assets/cv.png" alt="logo" width="50px" height="50px">
        </div>
        <p class="subtitle">Crie seu currículo profissional de forma rápida e fácil.</p>
      </div>
      <div class="content">
        <FormularioCurriculo v-model:curriculo="curriculo" @salvar-curriculo="atualizarCurriculo" />
        <VisualizacaoCurriculo :curriculo="curriculo" />
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
import FormularioCurriculo from "@/components/FormularioCurriculo.vue";
import VisualizacaoCurriculo from "@/components/VisualizacaoCurriculo.vue";
import LGPDWarning from "@/components/LGPDWarning.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
    FormularioCurriculo,
    VisualizacaoCurriculo,
    LGPDWarning
  },
  data() {
    return {
      curriculo: {
        nome: "",
        email: "",
        telefone: "",
        endereco: "",
        experiencias: [],
        formacoes: [],
      },
    };
  },
  methods: {
    atualizarCurriculo(curriculo) {
      this.curriculo = curriculo;
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&family=Poppins:wght@400;600;700&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", Arial, sans-serif;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: #2b2b2b;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: rgb(61, 61, 61);
  color: #fff;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
  transition: all 0.3s;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.btn:hover {
  background-color: rgb(61, 61, 61);
  transform: translateY(-2px);
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
}

main {
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  text-align: center;
  padding: 30px 20px;
  background-color: rgb(61, 61, 61);
  color: #fff;
  border-radius: 10px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.hero .subtitle {
  font-size: 1.2rem;
  font-weight: 400;
  color: #e0e0e0;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .hero .subtitle {
    font-size: 1rem;
  }
}
</style>