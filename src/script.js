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
