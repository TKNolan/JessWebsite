import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl') });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const textureLoader = new THREE.TextureLoader();
const mossTexture = textureLoader.load('Moss.png');
const normalMap = textureLoader.load('moss-normal.png');

mossTexture.wrapS = mossTexture.wrapT = THREE.RepeatWrapping;
normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
mossTexture.repeat.set(4, 4);
normalMap.repeat.set(4, 4);

const mossMaterial = new THREE.MeshStandardMaterial({
  map: mossTexture,
  normalMap: normalMap
});

const geometry = new THREE.PlaneGeometry(50, 50, 200, 200);
const plane = new THREE.Mesh(geometry, mossMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

camera.position.set(0, 10, 0);
camera.lookAt(0, 0, 0);

let mouse = new THREE.Vector2(0, 0);
let targetZ = new Float32Array(geometry.attributes.position.count).fill(0);

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  addRipple(mouse.x, mouse.y);
});

function addRipple(xNorm, yNorm) {
  const radius = 2;
  const strength = 0.2;
  const pos = geometry.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const dist = Math.sqrt(Math.pow((x / 25 - xNorm), 2) + Math.pow((y / 25 - yNorm), 2));

    if (dist < radius) {
      const z = Math.sin((radius - dist) * 3) * strength;
      targetZ[i] = z;
    }
  }
}

function animate() {
  requestAnimationFrame(animate);

  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const currentZ = pos.getZ(i);
    const newZ = THREE.MathUtils.lerp(currentZ, targetZ[i], 0.05);
    pos.setZ(i, newZ);
    targetZ[i] *= 0.95;
  }

  pos.needsUpdate = true;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


//Language 

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.massages": "Massages",
    "nav.contact": "Booking",

    "hero.title": "Full Bloom Massage",
    "content.intro": "Discover the ancient art of tuina.",

    "hero.title_about": "Every massage I perform is unique, because every body is unique.",
    "content.intro_about": "My name is Jessica, I am the passionate person behind Full Bloom Massage.",

    // Massage descriptions
    "massage.tuina_text": "A traditional Chinese massage that uses rhythmic pressure techniques to balance energy and relieve tension.",
    "massage.tuina_text2": "Good for: Neck pain, fatigue, low energy, stress, back pain, poor mobility, headaches, menstrual pain, digestive symptoms, sports injuries",
    "massage.cupping_text": "An ancient Chinese practice that involves applying a plastic, glass, or bamboo cup to the skin to suck out the surface muscle layer and hold it within the cup.",
    "massage.cupping_text2": "Good for: Fatigue, stress, neck pain, headaches, digestive symptoms, insomnia. Promotes general health and well-being.",

    // About page full
    "about.sectionTitle": "My Background",
    "about.paragraph1": "I'm originally from England, but life's path and my heart led me to Switzerland. I tried Tuina for the first time through a new friend and fell in love right then and there. After that one treatment, I was enchanted. I decided to train as a Tuina massage therapist in York, UK. This launched me on a new inner and outer journey of love and self-discovery. Later, I trained as a yoga teacher with Meghan Currie in Bali.",
    "about.paragraph2": "Why “Full Bloom”? In TCM (Traditional Chinese Medicine), it is understood that the human body is a part of nature. While studying the meridian channels of Chinese medicine, I came across a chapter describing TCM's view of the Heart Meridian;",
    "about.paragraph3": "Belonging to the fire element, the heart meridian is associated with warmth, laughter, and enthusiasm. Just as the summer season, associated with the fire element, brings flowering and ripening—the blossoming of all the seeds planted in spring, love is the blossoming of the human being. Indeed, this is who we are, in full 'bloom.' This love is felt nowhere more deeply than in the heart. Love is the current that connects us to one another, reaching the farthest corners of the body/mind/spirit with every heartbeat.",
    "about.paragraph4": "My work is much more than a massage; for me, it's an extension of my heart. I hope to bring people back to themselves by bringing their bodies back to harmony and healing."
  },

  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.massages": "Massages",
    "nav.contact": "Réservation",

    "hero.title": "Full Bloom Massage",
    "content.intro": "Découvrez l'art ancien du tuina.",
    "hero.title_about": "Chaque massage que je pratique est unique, car chaque corps est unique.",
    "content.intro_about": "Je suis Jessica, la passionnée derrière le Full Bloom Massage.",

    // Massage descriptions
    "massage.tuina_text": "Un massage chinois traditionnel qui utilise des techniques de pression rythmique pour équilibrer l’énergie et soulager les tensions.",
    "massage.tuina_text2": "Bon pour : douleur au cou, fatigue, faible énergie, stress, douleur au dos, mauvaise mobilité, maux de tête, douleurs menstruelles, symptômes digestifs, blessures sportives",
    "massage.cupping_text": "Une pratique chinoise ancienne qui consiste à appliquer une ventouse en plastique, en verre ou en bambou sur la peau pour aspirer la couche musculaire superficielle.",
    "massage.cupping_text2": "Bon pour : fatigue, stress, douleurs cervicales, maux de tête, troubles digestifs, insomnie. Favorise la santé générale et le bien-être.",

    // About page full
    "about.sectionTitle": "Mon Parcours",
    "about.paragraph1": "Je suis originaire d’Angleterre, mais le chemin de la vie et mon cœur m’ont conduite en Suisse. J’ai découvert le Tuina grâce à un nouvel ami, et je suis tombée amoureuse dès le premier massage. Après ce premier soin, j’étais enchantée. J’ai décidé de me former en tant que thérapeute en Tuina à York, au Royaume-Uni. Cela m’a lancée dans un voyage intérieur et extérieur d’amour et de découverte de soi. Plus tard, je me suis formée en tant que professeure de yoga avec Meghan Currie à Bali.",
    "about.paragraph2": "Pourquoi « Full Bloom » ? En MTC (Médecine Traditionnelle Chinoise), on considère que le corps humain fait partie intégrante de la nature. En étudiant les méridiens de la MTC, j’ai découvert un chapitre décrivant la vision de la MTC sur le méridien du Cœur :",
    "about.paragraph3": "Appartenant à l’élément feu, le méridien du cœur est associé à la chaleur, au rire et à l’enthousiasme. Tout comme l’été – saison liée à l’élément feu – apporte floraison et maturation, l’amour est la floraison de l’être humain. C’est en cela que nous sommes pleinement épanouis. Cet amour se ressent plus profondément dans le cœur. L’amour est le courant qui nous relie les uns aux autres, atteignant les moindres recoins du corps, de l’esprit et de l’âme à chaque battement.",
    "about.paragraph4": "Mon travail va bien au-delà du simple massage ; pour moi, c’est une extension de mon cœur. J’espère ramener les gens à eux-mêmes en réharmonisant leur corps vers la guérison."
  }
};


// 🌐 Translation function
function switchLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

// 📦 Load saved language or default to English
const savedLang = localStorage.getItem("lang") || "en";
switchLanguage(savedLang);

// 🔁 Event listeners + saving preference
document.getElementById("lang-en").addEventListener("click", e => {
  e.preventDefault();
  localStorage.setItem("lang", "en");
  switchLanguage("en");
});

document.getElementById("lang-fr").addEventListener("click", e => {
  e.preventDefault();
  localStorage.setItem("lang", "fr");
  switchLanguage("fr");
});


document.getElementById("lang-fr").addEventListener("click", e => {
  e.preventDefault();
  localStorage.setItem("lang", "fr");
  switchLanguage("fr");
});



//Slides for about 

const slides = document.querySelectorAll('.massage-slideshow .slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

document.getElementById('prevSlide').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

document.getElementById('nextSlide').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});
