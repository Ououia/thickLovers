getRoomReservation();
getActivityReservation();

// recupere les reservations de chambres et affiche dans le tableau '#tableResa'
function getRoomReservation() {
  $.ajax({
    url: "https://tst.quantiq.nc/devweb-cfa/api/index.php?service=gite&object=roomreservation&action=list",
    type: "GET",
    cache: false,
    async: false,

    success: function (response) {
      response = JSON.parse(response);
      console.log(response);
      $("#tableResaRoom").empty(); // empty table before load it
      $("#tableResaRoom").addClass(" table table-bordered mx-5 ");
      let tHead = `<thead>
                 <tr>
                     <th>Chambre N°</th>
                     <th>Type</th>
                     <th>Vue sur</th>
                     <th>Date entrée</th>
                     <th>Date sortie</th>
                     <th>Annuler une réservation</th>
                 </tr>
             </thead>`;

      $("#tableResaRoom").append(tHead);
      $.each(response, function (key, value) {
        $("#tableResaRoom").append(
          "<tbody><tr>" +
            "<td>" +
            value.number +
            "</td>" +
            "<td>" +
            value.type +
            "</td>" +
            "<td>" +
            value.landscape +
            "</td>" +
            "<td>" +
            value.dateEntree +
            "</td>" +
            "<td>" +
            value.dateSortie +
            "</td>" +
            `<td><a onclick="deleteRoomResa(` +
            value.id +
            `)" ><i class="fa-solid fa-times "></a></i></td>` +
            "</tr></tbody>"
        );
      });
    },
  });
}
//supprime une réservation de chambre
function deleteRoomResa(myIdResa) {
  $.ajax({
    type: "POST",
    url: "https://tst.quantiq.nc/devweb-cfa/api/index.php",
    data: {
      idRoomReservation: myIdResa,
      token: "D@lL@5Mùl!P@5S3",
      action: "cancel",
      object: "roomreservation",
      service: "gite",
    },
    async: false,
    
    success: function ($mockData) {
      alert("Votre réservation de chambre n°"+myIdResa+" a bien été supprimée !");
      getRoomReservation();
    },
    error: function (request, error) {
      console.log("ERROR:" + error);
    },
  });
}

// recupere les reservations des activités et affiche dans le tableau '#tableResaActivity'
function getActivityReservation() {
  $.ajax({
    url: "https://tst.quantiq.nc/devweb-cfa/api/index.php?service=gite&object=activityreservation&action=list",
    type: "GET",
    cache: false,
    async: false,

    success: function (response) {
      response = JSON.parse(response);
      $("#tableResaActivity").empty(); // empty table before load it
      $("#tableResaActivity").addClass(" table table-bordered mx-5 ");
      let tHead = `<thead>
                 <tr>
                     <th>Activité</th>
                     <th>Date</th>
                     <th>Heure Debut</th>
                     <th>Heure Fin</th>
                     <th>Annuler une réservation</th>
                 </tr>
             </thead>`;

      $("#tableResaActivity").append(tHead);
      $.each(response, function (key, value) {
        $("#tableResaActivity").append(
          "<tbody><tr>" +
            "<td>" +
            value.activite +
            "</td>" +
            "<td>" +
            value.date +
            "</td>" +
            "<td>" +
            value.heureDebut +
            "</td>" +
            "<td>" +
            value.heureFin +
            "</td>" +
          
            `<td><a onclick="deleteActivityResa(` +
            value.id +
            `)" ><i class="fa-solid fa-times "></a></i></td>` +
            "</tr></tbody>"
        );
      });
    },
  });
}
//supprime une réservation d'activité
function deleteActivityResa(myIdResaActivity) {
  console.log(myIdResaActivity)
  $.ajax({
    type: "POST",
    url: "https://tst.quantiq.nc/devweb-cfa/api/index.php",
    data: {
      idActivityReservation : myIdResaActivity,
      token: "D@lL@5Mùl!P@5S3",
      action: "cancel",
      object: "activityreservation",
      service: "gite",
    },
    async: false,
    
    success: function ($mockData) {
      alert("Votre activité réservée n°"+myIdResaActivity+"  a bien été supprimée !");
      getActivityReservation();
    },
    error: function (request, error) {
      console.log("ERROR:" + error);
    },
  });
}