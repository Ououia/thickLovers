fetch(
  "https://tst.quantiq.nc/devweb-cfa/api/index.php?service=gite&object=room&action=list"
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      var select = document.getElementById("typeofroom");
      const newOption = document.createElement("option");
      newOption.setAttribute("value", element.number);
      const optionText = document.createTextNode(element.number);
      // set option text
      newOption.appendChild(optionText);

      select.appendChild(newOption);
    });
  });

let dateEntree;
let dateSortie;
let output;

function sendReservation() {
  selectElement = document.getElementById("typeofroom");
  output = selectElement.value;

  dateEntree = document.getElementById("dateEntree").value;

  dateSortie = document.getElementById("dateSortie").value;
  console.log(output, dateEntree, dateSortie);

  const http = new XMLHttpRequest();

  var url =
    "https://tst.quantiq.nc/devweb-cfa/api/index.php?service=gite&object=roomreservation&action=create";

  http.open("POST", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      console.log(this.responseText);
      parsedResponse = JSON.parse(http.responseText);
      console.log(parsedResponse.data);
    }
  };

  http.send(
    "token=" +
      "D@lL@5Mùl!P@5S3" +
      "&" +
      "idRoom=" +
      output +
      "&" +
      "dateEntree =" +
      dateEntree +
      "&" +
      "dateSortie=" +
      dateSortie
  );
}

let mybutton = document.getElementById("back-to-top");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
