const click = document.querySelector(".cont");

const formClick = click.addEventListener("click", async (event) => {
  event.preventDefault();
  const search = document.querySelector("#search").value;
  const unsplashSearch = await { search };
  Search(unsplashSearch); 
});

const Search = async (name) => {
  axios
    .post("http://localhost:8080/search", name, { headers: headers})
    .then((response) => {
      response.data; 
      if (response.status == "200") {
        if ( typeof(response.data.error) == "undefined") {
          console.log(response.data.output)
          // const preview = document.querySelector(".prevbox");
          // let image_img = document.createElement('img');
          // image_img.classList.add('image_img');
          // image_img.src = response.data.picture;
          // image_img.alt = response.data.name;
          // preview.appendChild(image_img);

        } else { 
          show("Unable to search.", "error");
        }
      } else {
        show("Enter a correct word.", "error");
      }
    })

  .catch((error) => console.error(error.message));
};
