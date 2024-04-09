// ==UserScript==
// @name         [DriiveMe] Block remover by Tchip
// @namespace    https://github.com/maurinbr/Asphalte
// @version      1.0
// @description  - Insérer les raccourci Blablacar, GoogleMap et Mappy dans l"affichage des missions
// @author       Tchip
// @include        https://www.driiveme.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
  
  	// Fonction de converstion de date pour construire l'url de blablacar
  	function convertDate(dateStr) {
    
    // Diviser la date originale
    const parts = dateStr.split('/');

    // Vérifier si la date est dans le format attendu
    if (parts.length === 3) {
        // Réarranger les parties pour le nouveau format
        const newDateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
        return newDateStr;
    } else {
        throw new Error('Format de date invalide.');
    }
}

    // Fonction pour insérer les liens
    function insertBlaBlaCarLinks() {
        // Trouver tous les blocks "block-trajet"
        var trajetBlocks = document.querySelectorAll('.block-trajet ');
      	
        // Sélectionner l'élément input par son nom
        var inputElement = document.querySelector('input[name="desiredDate"]');
      
        // Vérifier si l'élément existe pour éviter des erreurs
        if (inputElement) {
          // Lire la valeur
          var date = inputElement.value;
          console.log(date) ;
          

          // Afficher la valeur dans la console ou l'utiliser selon vos besoins
          // Obtenir la date d'aujourd'hui si 'date' est une chaîne vide
          if (date == "") {
              var today = new Date();
              var day = today.getDate().toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
              var month = (today.getMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0
              var year = today.getFullYear();
              date = `${year}-${month}-${day}`; // Format aaaa-mm-jj
            	console.log(date) ;
          }  else {
                date = convertDate(date); // Convertir la date avec la fonction définie ;
            }
        } 
      
        trajetBlocks.forEach(block => {
            // Pour chaque block, trouver les éléments "strong blueDark" à l'intérieur
            var elements = block.querySelectorAll('.strong.blueDark');
       
         
          
            if (elements.length < 2) {
                console.log("Pas assez d'éléments trouvés pour construire le lien dans ce block.");
                return;
            }

            // Extraire les valeurs de 'title' pour depart et livraison
            var depart = elements[0].getAttribute('data-original-title');
            var livraison = elements[1].getAttribute('data-original-title');
						var home = "Lyon"
            
            
            // Construire l'URL
            
            var baseBlaBlaCarURL = 'https://www.blablacar.fr/search';
						var googleMapsBaseURL = 'https://www.google.com/maps/dir/';
						var mappyBaseURL = 'https://fr.mappy.com/itineraire#/voiture/';
            
            var datePart = date ? `&db=${encodeURIComponent(date)}` : '';

            var urla = `${baseBlaBlaCarURL}?fn=${encodeURIComponent(home)}&tn=${encodeURIComponent(depart)}${datePart}`;
            var urlb = `${baseBlaBlaCarURL}?fn=${encodeURIComponent(livraison)}&tn=${encodeURIComponent(home)}${datePart}`;
            var urlc = `${googleMapsBaseURL}${encodeURIComponent(depart)}/${encodeURIComponent(livraison)}/`;
            var urld = `${mappyBaseURL}${encodeURIComponent(depart)}/${encodeURIComponent(livraison)}/car/28/`;


            // Créer et insérer le lien
          // Fonction pour créer et insérer un lien avec icône et texte
          function creerEtInsererLien(url, altText, iconURL, texte, destination) {
            // Créer l'élément lien (a) et configurer ses propriétés
            var link = document.createElement('a');
            link.href = url;
            link.target = "_blank";
            link.style.display = 'flex';
            link.style.alignItems = 'center';
            link.style.marginTop = '20px';
            link.style.color = '#007bff';
            link.style.textDecoration = 'none';

            // Créer l'élément image (img) pour l'icône et le configurer
            var icon = document.createElement('img');
            icon.src = iconURL;
            icon.alt = altText;
            icon.style.marginRight = '8px';

            // Ajouter l'icône et le texte au lien
            link.appendChild(icon);
            link.appendChild(document.createTextNode(texte));

            // Insérer le lien dans l'élément de destination
            destination.appendChild(link);
          }

            creerEtInsererLien(urla, 'Icône blablacar', 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://blablacar.com&size=16', 'Aller', block);
            creerEtInsererLien(urlb, 'Icône blablacar', 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://blablacar.com&size=16', 'Retour', block);
            creerEtInsererLien(urlc, 'Icône GoogleMaps', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_(2020).svg/16px-Google_Maps_icon_(2020).svg.png', 'Trajet', block);
            creerEtInsererLien(urld, 'Icône Mappy', 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://mappy.com&size=16', 'Trajet', block);

          
        });
    }

    // Exécuter la fonction après le chargement de la page
    window.addEventListener('load', insertBlaBlaCarLinks);
})();
