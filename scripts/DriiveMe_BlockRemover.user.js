// ==UserScript==
// @name         [DriiveMe] Block remover by Tchip
// @namespace    https://github.com/maurinbr/Asphalte
// @version      1.0
// @description  - Masque les éléments avec la classe "block-trajet reserved" sur driiveme.com
//               - Trier les missions par ordre de rémunération décroissantes    
// @author       Tchip
// @match        https://www.driiveme.com/*
// @grant        none
// ==/UserScript==


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
