// ==UserScript==
// @name         [Otoqi] GoogleMaps Trajet by Tchip
// @namespace   https://github.com/maurinbr/Asphalte
// @version      0.2
// @description  Générer un lien Google Maps pour un trajet entre deux points
// @author       Tchip
// @match        https://drivers.otoqi.com/a/missions  
// @grant        none
// ==/UserScript==

var version 0.2

function getVersionFromContent(content) {
    // Logique pour extraire la version du contenu
    var versionRegex = /version = "(\d+\.\d+)";/;
    var match = content.match(versionRegex);
    if (match && match[1]) {
        return match[1];
    } else {
        return null; // Si la version n'a pas été trouvée
    }
}
var localVersion = "0.2"; // Version locale


fetch('https://github.com/maurinbr/Asphalte/blob/main/scripts/Otoqi_InserLink.js')
  .then(response => response.text())
  .then(data => {
    var remoteVersion = getVersionFromContent(data); // Version récupérée du fichier JS distant
    if (remoteVersion && remoteVersion !== localVersion) {
        console.log("Une nouvelle version est disponible :", remoteVersion);
        // Déclencher ici le processus de mise à jour si nécessaire
    } else {
        console.log("La version est à jour.");
    }
    console.log(data);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération du fichier JS :', error);
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
