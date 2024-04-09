// ==UserScript==
// @name        [Hiflow] Calendrier by Tchip
// @namespace   https://github.com/maurinbr/Asphalte
// @include	    https://partenaire.expedicar.com/journey/*
// @version     0.1
// Author       Tchip
// @description Filtrer les missions par date dans un calendrier.
// @grant       none
// ==/UserScript==

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



