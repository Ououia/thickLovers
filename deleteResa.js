getRoomReservation();

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
      $("#tableResa").empty(); // empty table before load it
      $("#tableResa").addClass(" table table-bordered mx-5 ");
      let tHead = `<thead>
                 <tr>
                     <th>#</th>
                     <th>Chambre N°</th>
                     <th>Type</th>
                     <th>Vue sur</th>
                     <th>Date entrée</th>
                     <th>Date sortie</th>
                     <th>Annuler une réservation</th>
                 </tr>
             </thead>`;

      $("#tableResa").append(tHead);
      $.each(response, function (key, value) {
        $("#tableResa").append(
          "<tbody><tr>" +
            "<td>" +
            value.id +
            "</td>" +
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
      alert("Votre réservation n°"+myIdResa+" a bien été supprimée !");
      getRoomReservation();
    },
    error: function (request, error) {
      console.log("ERROR:" + error);
    },
  });
}
