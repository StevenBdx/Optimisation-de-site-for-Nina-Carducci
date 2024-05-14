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

        if(actualIndice === 0)
          document.querySelector('.mg-prev').classList.add('hide')
        else if (actualIndice + 1 === galleryImages.length)
          document.querySelector('.mg-next').classList.add('hide')
        /*let galleryUrlLenght = galleryImages.lenght;

        let currentIndex = 0;
        for (let i = 1; i < galleryUrlLenght; i++) {
          let indexTosearch = i - 1;
          if (urlRelative === galleryUrlLenght.indexTosearch) {
            currentIndex = indexTosearch;
            // affichage des fleches
            if (indexTosearch === 0) {
              // je doit cacher ma fleche prev
            } else if (indexTosearch === 8) {
              // je doit cacher ma fleche next
            } else {
              // je doit faire appraitre mes deux fleches
            }
          }

          // source
          // j'ecoute le click prev
          // je change la source en utilisant l'index prev
          //new src = tableUrl.currentIndex - 1

          // j'ecoute le click next
          // je change la source en utilisant l'index next
          //new src = tableUrl.currentIndex + 1
        }*/







        iconeNext.addEventListener('click', () => {
          document.querySelector('.mg-prev').classList.remove('hide')
          let imageSourceModal = document.querySelector('.lightboxImage.img-fluid').src
          let urlRelative = absoluVersRelatif(imageSourceModal);
          const actualIndice = galleryImages.indexOf(urlRelative)
          const nextImage = galleryImages[actualIndice + 1]
          if (nextImage !== undefined) {
            document.querySelector('.lightboxImage.img-fluid').src = nextImage
            if (actualIndice + 2 === galleryImages.length)
              document.querySelector('.mg-next').classList.add('hide')
            
          }

        })
        iconePrev.addEventListener('click', () => {
          document.querySelector('.mg-next').classList.remove('hide')
          let imageSourceModal = document.querySelector('.lightboxImage.img-fluid').src
          let urlRelative = absoluVersRelatif(imageSourceModal);
          const actualIndice = galleryImages.indexOf(urlRelative)
          const nextImage = galleryImages[actualIndice - 1]
          if (nextImage !== undefined) {
            document.querySelector('.lightboxImage.img-fluid').src = nextImage
            if (actualIndice - 1 === 0 )
              document.querySelector('.mg-prev').classList.add('hide')
          }
        })

      }
    }
  }
};

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












