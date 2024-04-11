// ==UserScript==
// @name         [Otoqi] GoogleMaps Trajet by Tchip
// @namespace   https://github.com/maurinbr/Asphalte
// @version      0.1
// @description  Générer un lien Google Maps pour un trajet entre deux points
// @author       Tchip
// @match        https://drivers.otoqi.com/a/missions  
// @grant        none
// ==/UserScript==

// Exemple de fonction pour extraire la version sans utiliser de regex

const localversion = 0.1;

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
var jsFileUrl = 'https://raw.githubusercontent.com/maurinbr/Asphalte/main/scripts/Otoqi_InserLink.js';

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

    // Fonction pour extraire les adresses des éléments strong dans chaque mission-text-container
    function extractAddresses() {
        var missions = document.querySelectorAll('.mission-text-container');
        if (missions.length === 0) {
            // Si aucun élément n'est trouvé, réessayer dans 1 seconde
            setTimeout(extractAddresses, 1000);
            return;
        }

        missions.forEach(function(mission) {
            var strongElements = mission.querySelectorAll('strong');
            if (strongElements.length >= 2) {
                var start = strongElements[0].textContent.trim();
                var end = strongElements[1].textContent.trim();
                var googleMapsURL = buildGoogleMapsURL(start, end);
                addGoogleMapsLink(mission, googleMapsURL);
            } else {
                console.error("Il n'y a pas suffisamment d'adresses pour construire le trajet dans cette mission.");
            }
        });
    }

    // Fonction pour construire l'URL Google Maps
    function buildGoogleMapsURL(start, end) {
        var baseURL = "https://www.google.com/maps/dir/";
        return baseURL + encodeURIComponent(start) + "/" + encodeURIComponent(end);
    }

    // Fonction pour ajouter un lien Google Maps dans le bloc mission-text-container
    function addGoogleMapsLink(container, url) {
        var iconURL = "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://maps.google.com&size=16";
        
        var link = document.createElement('a');
        link.href = url;
      	link.target = "_blank";
        
        var icon = document.createElement('img');
        icon.src = iconURL;
        icon.alt = "Google Maps";
        
        // Empêcher la propagation de l'événement de clic sur les éléments parents ou précédents
        link.addEventListener('click', function(event) {
            event.stopPropagation();
        });
        
        link.appendChild(icon);
        container.appendChild(link);
    }

    // Exécution initiale du script
    extractAddresses();

})();
