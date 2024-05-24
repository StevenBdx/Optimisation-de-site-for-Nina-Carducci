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

// Select the node whose mutations will be observed
let targetNode = document.getElementById("body");

// Observer options (what mutations to observe)
let config = { attributes: true, childList: false };

// Callback function to execute when a mutation is observed
let callback = function (mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type == "attributes" && mutation.attributeName == "class") {
      if (targetNode.classList.contains('modal-open')) {
        const iconeNext = document.querySelector('.mg-next');
        const iconePrev = document.querySelector('.mg-prev');

        let imageSourceModal = document.querySelector('.lightboxImage.img-fluid').src;
        let urlRelative = absoluVersRelatif(imageSourceModal);

        const actualIndice = galleryImages.indexOf(urlRelative);

        if (actualIndice === 0) {
          document.querySelector('.mg-prev').classList.add('hide');
          document.querySelector('.mg-next').classList.remove('hide');
        } else if (actualIndice + 1 === galleryImages.length) {
          document.querySelector('.mg-next').classList.add('hide');
          document.querySelector('.mg-prev').classList.remove('hide');
        } else {
          document.querySelector('.mg-next').classList.remove('hide');
          document.querySelector('.mg-prev').classList.remove('hide');
        }
      }
    }
  }
};

document.addEventListener('click', function (event) {

  if (event.target.classList.contains('mg-prev') || event.target.classList.contains('mg-next')) {
    const iconePrev = document.querySelector('.mg-prev');
    const iconeNext = document.querySelector('.mg-next');
    let imageSourceModal = document.querySelector('.lightboxImage.img-fluid').src;
    let urlRelative = absoluVersRelatif(imageSourceModal);
    const actualIndice = galleryImages.indexOf(urlRelative);
    let image = '';

    if (event.target.classList.contains('mg-next')) {
      image = galleryImages[actualIndice + 1]
      iconePrev.classList.remove('hide');
      if (actualIndice + 1 === galleryImages.length - 1) {
        iconeNext.classList.add('hide');
      }
    }
    if (event.target.classList.contains('mg-prev')) {
      image = galleryImages[actualIndice - 1]

      iconeNext.classList.remove('hide');

      if (actualIndice - 1 <= 0) {
        iconePrev.classList.add('hide');
      }
    }

    document.querySelector('.lightboxImage.img-fluid').src = image
  }
})

// Creates an instance of the observer linked to the callback function
let observer = new MutationObserver(callback);

// Starts observing the target node for previously configured mutations
observer.observe(targetNode, config);

function absoluVersRelatif(urlAbsolue) {
  // Get absolute URL of current page
  let urlPageActuelle = window.location.href;

  // Divide Urls into parts
  let partiesUrlAbsolue = urlAbsolue.split('/');
  let partiesUrlPageActuelle = urlPageActuelle.split('/');

  // Find the clue of the first different part
  let indiceDiff = 0;
  while (partiesUrlAbsolue[indiceDiff] === partiesUrlPageActuelle[indiceDiff]) {
    indiceDiff++;
  }

  // Construct the relative path
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