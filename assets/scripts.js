$(document).ready(function () {
  $('.gallery').mauGallery({
    columns: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 3
    },
    lightBox: true,
    lightboxId: 'myAwesomeLightbox',
    showTags: true,
    tagsPosition: 'top'
  });
});

let galleryImages = [
  "./assets/images/gallery/concerts/aaron-paul-concert.jpg",
  "./assets/images/gallery/entreprise/ali-morshedlou.jpg",
  "./assets/images/gallery/entreprise/jason-goodman.jpg",
  "./assets/images/gallery/mariage/hannah-busing.jpg",
  "./assets/images/gallery/portraits/ade-tunji.jpg",
  "./assets/images/gallery/mariage/jakob-owens.jpg",
  "./assets/images/gallery/portraits/nino-van-prattenburg.jpg",
  "./assets/images/gallery/concerts/austin-neill-concert.jpg",
  "./assets/images/gallery/entreprise/mateus-campos-felipe.jpg"
];

// Selectionne le noeud dont les mutations seront observées
let targetNode = document.getElementById("body");

// Options de l'observateur (quelles sont les mutations à observer)
let config = { attributes: true, childList: false };

// Fonction callback à éxécuter quand une mutation est observée
let callback = function (mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type == "attributes" && mutation.attributeName == "class") {
      if (targetNode.classList.contains('modal-open')) {
        const iconeNext = document.querySelector('.mg-next')
        const iconePrev = document.querySelector('.mg-prev')

        let imageSourceModal = document.querySelector('.lightboxImage.img-fluid').src
        let urlRelative = absoluVersRelatif(imageSourceModal);

        const actualIndice = galleryImages.indexOf(urlRelative)

        if (actualIndice === 0) {
          document.querySelector('.mg-prev').classList.add('hide')
          document.querySelector('.mg-next').classList.remove('hide')
        } else if (actualIndice + 1 === galleryImages.length) {
          document.querySelector('.mg-next').classList.add('hide')
          document.querySelector('.mg-prev').classList.remove('hide')
        } else {
          document.querySelector('.mg-next').classList.remove('hide')
          document.querySelector('.mg-prev').classList.remove('hide')
        }


       
      }
    }
  }
};

/**
 * A SAUVEGARDER
 */
document.addEventListener('click', function (event) {

  if (event.target.classList.contains('mg-prev') || event.target.classList.contains('mg-next')) {
    const iconePrev = document.querySelector('.mg-prev')
    const iconeNext = document.querySelector('.mg-next')
    let imageSourceModal = document.querySelector('.lightboxImage.img-fluid').src
    let urlRelative = absoluVersRelatif(imageSourceModal);
    const actualIndice = galleryImages.indexOf(urlRelative)
    let image = '';

    if (event.target.classList.contains('mg-next')) {
      image = galleryImages[actualIndice + 1]

      iconePrev.classList.remove('hide')
      if (actualIndice + 1 === galleryImages.length - 1) {
        iconeNext.classList.add('hide')
      }
    }

    if (event.target.classList.contains('mg-prev')) {
      image = galleryImages[actualIndice - 1]

      iconeNext.classList.remove('hide')

      if (actualIndice - 1 <= 0) {
        iconePrev.classList.add('hide')
      }
    }

    document.querySelector('.lightboxImage.img-fluid').src = image

  }
})
/**
 * FIN de A SAUVEGARDER
 */





// Créé une instance de l'observateur lié à la fonction de callback
let observer = new MutationObserver(callback);

// Commence à observer le noeud cible pour les mutations précédemment configurées
observer.observe(targetNode, config);



function absoluVersRelatif(urlAbsolue) {
  // Obtenir l'URL absolue de la page actuelle
  let urlPageActuelle = window.location.href;

  // Diviser les URLs en parties
  let partiesUrlAbsolue = urlAbsolue.split('/');
  let partiesUrlPageActuelle = urlPageActuelle.split('/');

  // Trouver l'indice de la première partie différente
  let indiceDiff = 0;
  while (partiesUrlAbsolue[indiceDiff] === partiesUrlPageActuelle[indiceDiff]) {
    indiceDiff++;
  }

  // Construire le chemin relatif
  let cheminRelatif = '';
  for (let i = indiceDiff; i < partiesUrlPageActuelle.length - 1; i++) {
    cheminRelatif += '../';
  }

  for (let j = indiceDiff; j < partiesUrlAbsolue.length; j++) {
    cheminRelatif += partiesUrlAbsolue[j];
    if (j < partiesUrlAbsolue.length - 1) {
      cheminRelatif += '/';
    }
  }
  return './' + cheminRelatif;
}