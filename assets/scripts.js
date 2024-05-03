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
    "./assets/images/gallery/entreprise/ali-morshedlou.jpg"
];

const previousImg = document.querySelector('.mg-prev');
const nextImg = document.querySelector('.mg-next');

previousImg.addEventListener('click', () => {
    const imgBox = document.querySelector('.lightboxImage')
    console.log(imgBox)
})


