// ==UserScript==
// @name         [DriiveMe] Block remover by Tchip
// @namespace    https://github.com/maurinbr/Asphalte
// @version      0.1
// @description  - Masque les éléments avec la classe "block-trajet reserved" sur driiveme.com
//               - Trier les missions par ordre de rémunération décroissantes    
// @author       Tchip
// @match        https://www.driiveme.com/*
// @grant        none
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
var jsFileUrl = 'https://raw.githubusercontent.com/maurinbr/Asphalte/main/scripts/DriiveMe_BlockRemover.user.js';
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


(function() {
    'use strict';

    // Sélectionnez tous les éléments avec la classe "block-trajet reserved"
    var elements = document.querySelectorAll('.block-trajet.reserved');

    // Parcourez chaque élément et masquez-le
    elements.forEach(function(element) {
        element.style.display = 'none';
    });
})();

(function() {
    'use strict';

    // Sélectionnez tous les blocs div avec la classe "block-trajet"
    var blocks = document.querySelectorAll('.block-trajet');

    // Convertissez les blocs en un tableau pour pouvoir les trier
    var blocksArray = Array.prototype.slice.call(blocks);

    // Triez les blocs en fonction de la valeur de la classe "price" décroissante
    blocksArray.sort(function(a, b) {
        var priceA = getPrice(a);
        var priceB = getPrice(b);
        return priceB - priceA;
    });

    // Réinsérez les blocs triés dans le document
    blocksArray.forEach(function(block) {
        block.parentNode.appendChild(block);
    });

    // Fonction pour extraire la valeur de la classe "price"
    function getPrice(block) {
        var priceElement = block.querySelector('.price');
        if (priceElement) {
            var priceText = priceElement.innerText.trim();
            // Supprimez le symbole € et convertissez en nombre
            return parseFloat(priceText.replace('€', ''));
        }
        // Si la classe "price" n'est pas trouvée, retournez une valeur par défaut
        return 0;
    }
})();
