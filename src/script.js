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
  const containerGaleria = document.getElementById("gallery");
  containerGaleria.innerHTML = ""; // limpa o container antes

  // Para cada item do galleryData, cria um card com as informações e adiciona no container
  galleryData.forEach((item) => {
    const card = document.createElement("div");
    card.className = "w-100 h-[270px] bg-slate-200 rounded-2xl shadow-xl p-4 mb-4";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="w-full h-40 object-cover rounded-xl mb-2" />
      <h3 class="font-semibold text-lg mb-1">${item.title}</h3>
      <p class="text-sm text-gray-700 mb-1">${item.category}</p>
      <p class="text-xs text-gray-600">${item.description}</p>
      <p class="text-xs text-gray-500 mt-2">${item.date}</p>
    `;

    containerGaleria.appendChild(card);
  });
}

window.document.addEventListener('load', renderizarGaleria())