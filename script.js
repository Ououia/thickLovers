// recupere les types de chambre
fetch(
  "https://tst.quantiq.nc/devweb-cfa/api/index.php?service=gite&object=roomtype&action=list"
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      var select = document.getElementById("typeofroom");
      const newOption = document.createElement("option");
      newOption.setAttribute("value", element);
      const optionText = document.createTextNode(element);
      // set option text
      newOption.appendChild(optionText);

      select.appendChild(newOption);
    });
  });

// Recupere les numero de chambre
fetch(
  "https://tst.quantiq.nc/devweb-cfa/api/index.php?service=gite&object=roomlandscape&action=list"
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      var select = document.getElementById("roomlandscape");
      const newOption = document.createElement("option");
      newOption.setAttribute("value", element);
      const optionText = document.createTextNode(element);
      // set option text
      newOption.appendChild(optionText);

      select.appendChild(newOption);
    });
  });

// FAIRE UNE RESERVATION DE CHAMBRE
function sendReservation() {
  dateEntree = document.getElementById("dateEntree").value;
  selectElement = document.getElementById("typeofroom");
  typeRoom = selectElement.value;
  selectElement = document.getElementById("roomlandscape");
  roomLandscape = selectElement.value;
  dateSortie = document.getElementById("dateSortie").value;

  if (dateEntree == "" || dateSortie == "") {
    alert("Il manque une saisie de date");
  } else {
    var html = new XMLHttpRequest();
    html.onreadystatechange = function () {
      if (html.readyState == XMLHttpRequest.DONE) {
        parsedResponse = JSON.parse(html.responseText);
        idRoom = parsedResponse[0].id;
        postData(idRoom);
      }
    };
    html.open(
      "GET",
      "https://tst.quantiq.nc/devweb-cfa/api/index.php?service=gite&object=room&action=list&type=" +
        typeRoom +
        "&landscape=" +
        roomLandscape,
      true
    );
    html.send(null);
  }
}

function postData(idRoom) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://tst.quantiq.nc/devweb-cfa/api/index.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = () => {
    console.log(xhr.readyState, xhr.status);
    if (xhr.readyState == 4 && xhr.status == 200) {
      alert("Votre R??servation a ??t?? enregistrer avec Success");
    } else {
      alert("Il y a eu une erreur lors de votre reservation");
    }
  };

  xhr.send(
    "service=" +
      "gite" +
      "&object=" +
      "roomreservation" +
      "&action=" +
      "create" +
      "&token=" +
      "D@lL@5M??l!P@5S3" +
      "&idRoom=" +
      idRoom +
      "&dateEntree=" +
      dateEntree +
      "&dateSortie=" +
      dateSortie
  );
}

// recupere les type d activit??s
fetch(
  "https://tst.quantiq.nc/devweb-cfa/api/index.php?service=gite&object=activity&action=list"
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      var select = document.getElementById("typeofactivity");
      const newOption = document.createElement("option");
      newOption.setAttribute("value", element);
      const optionText = document.createTextNode(element);
      // set option text
      newOption.appendChild(optionText);

      select.appendChild(newOption);
    });
  });

function postActivity() {
  selectElement = document.getElementById("typeofactivity");
  typeActivity = selectElement.value;
  dateEntree = document.getElementById("dateentreeactivity").value;
  heureEntree = document.getElementById("heureentree").value;
  heureSortie = document.getElementById("datesortieactivity").value;
  if (dateEntree == "" || heureEntree == "" || heureSortie == "") {
    alert("Il manque une saisie");
  } else {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://tst.quantiq.nc/devweb-cfa/api/index.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = () => {
      console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText));
        alert("Votre R??servation a ??t?? enregistrer avec Success");
      } else {
        alert("Il y a eu une erreur lors de votre reservation");
      }
    };

    xhr.send(
      "service=" +
        "gite" +
        "&object=" +
        "activityreservation" +
        "&action=" +
        "create" +
        "&token=" +
        "D@lL@5M??l!P@5S3" +
        "&activite=" +
        typeActivity +
        "&date=" +
        dateEntree +
        "&heureDebut=" +
        heureEntree +
        "&heureFin=" +
        heureSortie
    );
  }
}

// BUTTON ARROW UP

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

function activityReservation() {
  selectElement = document.getElementById("typeofactivity");
  output = selectElement.value;

  dateEntree = document.getElementById("dateentreeactivity").value;

  heureEntree = document.getElementById("heureentree").value;

  dateSortie = document.getElementById("datesortieactivity").value;
  console.log(output, dateEntree, dateSortie, heureEntree);
}
