function GetElementID(id) {
  return document.getElementById(id);
}

const imageInput = GetElementID("imageInput");
const image = GetElementID("picture");
const imageText = `
  <div class="flex flex-col">
    <span><i class='text-black/40 text-4xl bx bx-folder'></i></span>
    <span class="text-black/40">Upload your image</span>
  </div>
`;
image.innerHTML = imageText;

const form = document.querySelector("form");
const imageData = [];
const inputs = {
  imageName: GetElementID("imageName"),
  imageCategory: GetElementID("imageCategory"),
  imageDescription: GetElementID("imageDescription"),
};

let currentImageSrc = "";

imageInput.addEventListener("change", function (e) {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      currentImageSrc = e.target.result;

      const img = document.createElement("img");
      img.src = currentImageSrc;
      img.classList.add("w-180", "h-110", "rounded");

      image.innerHTML = "";
      image.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    currentImageSrc = "";
    image.innerHTML = imageText;
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!currentImageSrc) {
    alert("Please upload an image before submitting.");
    return;
  }

  const data = {
    title: inputs.imageName.value,
    category: inputs.imageCategory.value,
    description: inputs.imageDescription.value,
    image: currentImageSrc,
    date: new Date().toLocaleDateString("pt-BR"),
  };

  const existing = JSON.parse(localStorage.getItem("galleryData")) || [];
  existing.push(data);
  localStorage.setItem("galleryData", JSON.stringify(existing));

  alert("Imagem enviada com sucesso!");
  limparFormulario();
  window.location.href = "../index.html";
});

function limparFormulario() {
  inputs.imageName.value = "";
  inputs.imageCategory.value = "";
  inputs.imageDescription.value = "";
  imageInput.value = "";
  currentImageSrc = "";
  image.innerHTML = imageText;
}

function renderizarGaleria() {
  // Pega o array do localStorage (ou um array vazio se não tiver nada)
  const galleryData = JSON.parse(localStorage.getItem("galleryData")) || [];

  // Seleciona o container onde vai renderizar os cards da galeria
  const containerGaleria = GetElementID('gallery');
  containerGaleria.innerHTML = ""; // limpa o container antes

  // Para cada item do galleryData, cria um card com as informações e adiciona no container
  galleryData.forEach((item) => {
    const card = document.createElement("div");
    card.className = "group w-100 h-[270px] bg-slate-200 rounded-2xl shadow-xl transform transition duration-200 hover:shadow-2xl";

    card.innerHTML = `
      <div class="relative w-100 h-[195px] bg-black/10 rounded-2xl rounded-b-none overflow-hidden">
          <div class="absolute top-2 left-2 z-20">
              <h1 class="px-3 py-1 font-semibold text-[12px] bg-slate-100 rounded-full transition duration-200 hover:bg-slate-200">${item.category}</h1>
          </div>
          <div class="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition duration-300 z-10">
              <button class="w-10 h-10 p-1 bg-white text-black text-sm rounded-4xl shadow hover:bg-gray-100 transition"><i class='bx  bx-image'  ></i> </button>
              <button class="w-10 h-10 p-1 bg-white text-black text-sm rounded-4xl shadow hover:bg-gray-100 transition"><i class="bx bx-download"></i></button>
          </div>
          <img class="rounded-t-2xl w-full h-full object-cover" src="${item.image}" alt="${item.title}">
      </div>
      <div class="w-100 h-[75px] bg-white rounded-b-2xl">
          <div class="p-3">
              <h1 class="font-bold text-lg">${item.title}</h1>
              <p class="text-black/70"><i class="bx bx-calendar-alt"></i> ${item.date}</p>
          </div>
      </div>
    `;


    containerGaleria.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderizarGaleria);