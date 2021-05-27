const container = document.querySelector(".content");

async function getResponse(params, response) {
  const request = await fetch(
    `/${params}`
  );
  const json = await request.json();
  response(json);
}

getResponse("images", renderImages);

function renderImages(data) {
  data.map((images) => {
    const { path } = images;
    const image = document.createElement("img");
    image.alt = "profile";
    image.src = path;
    image.classList.add("image");
    container.appendChild(image);
    console.log(images);
  });
}
