// ==UserScript==
// @name        [Hiflow] Insert Link by Tchip
// @namespace   https://github.com/maurinbr/Asphalte
// @include     https://partenaire.expedicar.com/transfer/*
// @version     0.1
// Author       Tchip
// @description Ajouter des raccourcis pour chiffrer la mission
// @grant       none
// ==/UserScript==

window.addEventListener('load', function() {
    function InserLink() {
        var lastSpans = [];
        var partialSections = document.querySelectorAll('.partial-section');
        if (partialSections.length === 0) {
            // Si aucun élément n'est trouvé, réessayer dans 1 seconde
            setTimeout(InserLink, 1000);
            return;
        }
        partialSections.forEach(function(section) {
            var spans = section.querySelectorAll('span');
            if (spans.length > 0) {
                var lastSpan = spans[spans.length - 1];
                lastSpans.push(lastSpan);
            }
        });

        var lastSpansTexts = lastSpans.map(function(span) {
            return span.textContent;
        });

        var processedTexts = lastSpansTexts.map(function(text) {
            var secondCommaIndex = text.indexOf(',', text.indexOf(',') + 1);
            var extractedText = text.substring(0, secondCommaIndex);
            return extractedText.replace(/,/g, '');
        });

        var depart = encodeURIComponent(processedTexts[1]);
        var arrivee = encodeURIComponent(processedTexts[3]);
        var baseURL = "https://fr.mappy.com/itineraire#/voiture/";
        var finalURL = baseURL + depart + "/" + arrivee + "/car/5";

        // Sélectionnez le div où vous souhaitez insérer le lien
        var targetDiv = document.querySelector('.transfer-details-element-title');
        if (targetDiv) {
            // Créez un nouvel élément a (lien)
            var linkElement = document.createElement('a');
            linkElement.href = finalURL;
            linkElement.target = "_blank";

            // Créez et configurez l'élément img pour l'icône
            var iconElement = document.createElement('img');
            iconElement.src = 'https://cdn-icons-png.flaticon.com/256/888/888856.png'; // Remplacez par l'URL de votre icône
            iconElement.alt = 'Icône Mappy';
            iconElement.style.marginRight = '8px'; // Ajoutez un peu d'espace entre l'icône et le texte

            // Ajoutez l'icône et le texte au lien
            linkElement.appendChild(iconElement);
            linkElement.appendChild(document.createTextNode("Voir l'itinéraire"));

            // Vider le contenu actuel du div et ajouter le nouveau lien
            targetDiv.innerHTML = '';
            targetDiv.appendChild(linkElement);
        }
    };
        // Exécution initiale du script
        InserLink ;
});
