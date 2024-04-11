// ==UserScript==
// @name        [Hiflow] Insert Link by Tchip
// @namespace   https://github.com/maurinbr/Asphalte
// @include     https://partenaire.expedicar.com/transfer/*
// @version     0.1
// Author       Tchip
// @description Ajouter des raccourcis pour chiffrer la mission
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
var jsFileUrl = 'https://raw.githubusercontent.com/maurinbr/Asphalte/main/scripts/Hiflow_InserLink.user.js';
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
