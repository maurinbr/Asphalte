// ==UserScript==
// @name        [Hiflow] Calendrier by Tchip
// @namespace   https://github.com/maurinbr/Asphalte
// @include	    https://partenaire.expedicar.com/journey/*
// @version     0.1
// Author       Tchip
// @description Filtrer les missions par date dans un calendrier.
// @grant       none
// ==/UserScript==

// Fonction pour extraire la version du contenu du fichier JavaScript
function getVersionFromContent(content) {
    // Chercher la ligne qui contient la version
    var lines = content.split('\n');
    var versionLine = lines.find(line => line.trim().startsWith('const version'));
    if (versionLine) {
      // Extraction du numéro de version
      const versionNumber = versionLine.match(/\d+\.\d+/)[0];
      return versionNumber;
    } else {
        return null; // Si la version n'a pas été trouvée
    }
}

// URL du fichier JavaScript
var jsFileUrl = 'https://raw.githubusercontent.com/maurinbr/Asphalte/main/scripts/Hiflow_FilterByDate.user.js';
// Version 
const version = 0.1;

// Utilisation de Fetch pour récupérer le contenu du fichier JavaScript
fetch(jsFileUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur de récupération du fichier JavaScript');
        }
        return response.text();
    })
    .then(data => {
        // Utilisation de la fonction pour extraire la version du contenu récupéré
        var version = getVersionFromContent(data);
        if (version == localversion) {

          } else {
            // Création de l'élément de bandeau
            const bar = document.createElement("div");
            bar.style.backgroundColor = "yellow";
            bar.style.padding = "10px";
            bar.style.textAlign = "center";

            // Création de l'élément de lien hypertexte
            const lien = document.createElement("a");
            lien.href = "https://maurinbr.github.io/Asphalte/";
            lien.textContent = "Asphalte : Mise à jour disponible, Télécharger ici !";
            

            // Insertion du lien dans l'élément bar
            bar.appendChild(lien);

            // Insertion du bandeau au début du corps
            document.body.insertBefore(bar, document.body.firstChild);


          }
 
    })
    .catch(error => {
        console.error('Erreur:', error);
    });


// Sélectionner la liste UL par son ID
let ul = document.getElementById('booking-tabs');

// Créer un nouvel élément LI pour le sélecteur de date
let li = document.createElement('li');
li.id = 'date-selector-tab'; // Donner un ID au nouvel onglet pour référence future

// Créer le sélecteur de date et le configurer
let datePicker = document.createElement('input');
datePicker.setAttribute('type', 'date');
datePicker.id = 'myDatePicker';

// Optionnel : Créer un lien (a) pour contenir le sélecteur de date, si vous voulez garder la cohérence avec les autres éléments de la liste
let link = document.createElement('h2');
link.appendChild(datePicker);

// Ajouter le lien contenant le sélecteur de date à l'élément de liste
li.appendChild(link);

// Ajouter le nouvel élément de liste à la liste UL
ul.appendChild(li);

// Ajouter un écouteur d'événements pour filtrer la table lorsque la date change
datePicker.addEventListener('change', function() {
    filterTableByDate(this.value); // 'this.value' contient la date sélectionnée au format aaaa-mm-jj
});


function convertDateToFormat(dateISO) {
    let parts = dateISO.split('-'); // Divise la date ISO en composantes
    return `${parts[2]}/${parts[1]}/${parts[0]}`; // Reassemble dans le format souhaité
}

function filterTableByDate(selectedDateISO) {
    let selectedDateFormatted = convertDateToFormat(selectedDateISO); // Convertir en format jj/mm/aaaa

    let rows = document.querySelectorAll('table tr');
    rows.forEach(row => {
        // Exemple basé sur l'hypothèse que la date est dans la première cellule
        let dateInRow = row.cells[4].textContent; // Ajustez selon votre structure de table

        if (!dateInRow.includes(selectedDateFormatted)) {
            row.style.display = 'none'; // Cache les lignes qui ne contiennent pas la date
        } else {
            row.style.display = ''; // Affiche les lignes qui contiennent la date
        }
    });
}

function applyFilterIfExists() {
    let storedDate = localStorage.getItem('selectedDate');
    if (storedDate) {
        filterTableByDate(storedDate);
    }
}



