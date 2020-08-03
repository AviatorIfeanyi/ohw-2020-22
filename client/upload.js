const uploadInput = document.querySelector("#upload");

const formEvent = uploadInput.addEventListener("change", async (event) => {
  event.preventDefault();
  upload(); 
});

const popUp = document.querySelector(".first");

const show = (message, className) => {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".form");
  container.insertBefore(div, popUp); 

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 15000);
};

const headers = {
  'Content-Type': 'application/json',
  'withCredentials': true,
}

const upload = async () => {
  axios
    .post("https://pen-image.herokuapp.com/upload", new FormData(formElem), { headers: headers})
    .then((response) => {
      response.data; 
      if (response.status == "200") {
        if ( typeof(response.data) == "object") {
          const preview = document.querySelector(".prevbox");
          let image_img = document.createElement('img');
          image_img.classList.add('image_img');
          image_img.src = response.data.picture;
          image_img.alt = response.data.name;
          preview.appendChild(image_img);

        } else { 
          show(response.data, "error");
        }
      } else {
        show("Unable to upload image.", "error");
      }
    })

  .catch((error) => console.error(error.message));
};
