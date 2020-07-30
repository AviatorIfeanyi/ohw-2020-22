inputs = document.querySelectorAll("input");
fonts = [
  'Dancing Script',
  'Dosis',
  'Grenze Gotisch',
  'Josefin Sans',
  'Jura',
  'MuseoModerno',
  'Orbitron',
  'Playfair Display',
  'Quicksand',
  'Yannone Kaffeesatz',
  'Dancing Script',
  'Open Sans Condensed',
  'Ubuntu'
]
markup = ""
for (var i of fonts) {
  markup += "<p class=" + i + ">This is a boy</p>";
}
document.querySelector(".fontLists").innerHTML = markup;
function focused(x) {
  x.style.backgroundColor = "rgba(224,123,57,0.1)";
}
function blurred(x) {
  x.style.backgroundColor = "transparent";
}
open = false
document.getElementById('fontStye').addEventListener('click', openCloseList, false);

function openCloseList() {
  document.querySelector('.fontLists').style.display = open?"none":"flex";
  open = !open
}
  
