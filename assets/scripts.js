$(document).ready(function() {
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

const gallerySrc = [
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
/*cible ma modale*/ 
/*const openModal = document.querySelector('.modal-open');

const previousImg = document.querySelector('.mg-prev');
const nextImg = document.querySelector('.mg-next');

openModal.addEventListener('shown.bs.modal', function () {
    previousImg.addEventListener('click', () => {
        const imgBox = document.querySelector('.lightboxImage')
        console.log(imgBox)
    })
})*/

// Selectionne le noeud dont les mutations seront observées
let targetNode = document.getElementById("body");

// Options de l'observateur (quelles sont les mutations à observer)
let config = { attributes: true, childList: false };

// Fonction callback à éxécuter quand une mutation est observée
let callback = function (mutationsList) {
  for (let mutation of mutationsList){
    if (mutation.type == "attributes" && mutation.attributeName == "class") {
      if (targetNode.classList.contains('modal-open')){
        console.log(targetNode.classList.value);
      }
    }
  }
};

// Créé une instance de l'observateur lié à la fonction de callback
let observer = new MutationObserver(callback);

// Commence à observer le noeud cible pour les mutations précédemment configurées
observer.observe(targetNode, config);

// L'observation peut être arrêtée par la suite












