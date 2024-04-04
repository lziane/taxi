function saveNumber() {
  var numberToSave = document.getElementById("numericInput").value.trim(); // Trim pour supprimer les espaces blancs inutiles
  if (numberToSave === "") {
      alert("Veuillez saisir un nombre avant d'enregistrer.");
      return; // Arrête la fonction si aucun nombre n'est saisi
  }
  var savedNumbers = JSON.parse(localStorage.getItem("savedNumbers")) || [];
  var entry = {
      number: numberToSave,
      date: getDateWithoutTime(new Date()) // Obtenir la date actuelle sans l'heure
  };
  savedNumbers.push(entry);
  localStorage.setItem("savedNumbers", JSON.stringify(savedNumbers));
  alert("recette enregistré localement !");
  displaySavedNumbers();
}

function getDateWithoutTime(date) {
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ajouter un zéro devant si nécessaire
  var day = date.getDate().toString().padStart(2, '0'); // Ajouter un zéro devant si nécessaire
  return year + '-' + month + '-' + day;
}

function displaySavedNumbers() {
  var savedNumbers = JSON.parse(localStorage.getItem("savedNumbers")) || [];
  var displayDiv = document.getElementById("savedNumbersDisplay");
  displayDiv.innerHTML = "<h2>Historique des recettes enregistrées :</h2>";
  if (savedNumbers.length === 0) {
      displayDiv.innerHTML += "<p>Aucune recette enregistrée trouvée.</p>";
  } else {
      savedNumbers.forEach(function(entry, index) {
          displayDiv.innerHTML += "<p><strong>Recette " + (index + 1) + " :</strong><br>Nombre: " + entry.number + " €<br>Date: " + entry.date + "</p>";
      });
  }
}


function confirmReset() {
  var confirmReset = confirm("Êtes-vous sûr de vouloir réinitialiser tous les enregistrements ?");
  if (confirmReset) {
      resetNumbers();
  }
}

function resetNumbers() {
  localStorage.removeItem("savedNumbers");
  displaySavedNumbers();
}

function isNumber(evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      alert("Veuillez saisir uniquement des chiffres.");
      return false;
  }
  return true;
}

// Appel à la fonction pour afficher les nombres enregistrés lors du chargement de la page
window.onload = function() {
  displaySavedNumbers();
};
