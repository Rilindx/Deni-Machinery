function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }; 
}; // this is used for smooth scrolling

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        alert(`Thank you for reaching out, ${name}! We will get back to you at ${email}.`);
        contactForm.reset(); 
    });
}; // this is used for submitting the contact form

const heroText = document.querySelector('.hero h2');
let heroTextIndex = 0;
const heroTextContent = [
    "Your Trusted Source for Trucks and Excavators",
    "Reliable Machinery for Your Projects",
    "Top-notch Trucks and Excavators Available"
]; // this is used for changing the hero text

setInterval(() => {
    heroText.textContent = heroTextContent[heroTextIndex];
    heroTextIndex = (heroTextIndex + 1) % heroTextContent.length;
}, 3000); // this is used for changing the hero text

const h1 = document.querySelector('h1');
const text = h1.textContent;
h1.textContent = ''; // this is used for animating the h1 text

let i = 0;
const interval = setInterval(() => {
    if (i < text.length) {
        h1.textContent += text.charAt(i);
        i++;
    } else {
        clearInterval(interval); 
    }
}, 160); // this is used for animation speed

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim(); // Get the form values

    let isValid = true; // Assume the form is valid by default

    document.querySelectorAll(".error-msg").forEach(error => error.remove()); // Remove any existing error messages

    if (name === "") {
        showError("name", "Name is required.");
        isValid = false; // If the name is empty, show an error message and set isValid to false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        showError("email", "Email is required.");
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError("email", "Invalid email format.");
        isValid = false;
    }

    if (message === "") {
        showError("message", "Message is required.");
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
    }
}); // this is used for form validation

function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.createElement("div");
    errorElement.className = "error-msg";
    errorElement.textContent = message;
    inputElement.insertAdjacentElement("afterend", errorElement);
}; // this is used for showing error messages

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav ul li a"); // this is used for smooth scrolling in the nav-bar

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); 
            const targetId = this.getAttribute("href").substring(1); 
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, 
                    behavior: "smooth"
                });
            }
        });
    });
}); // also this is used for smooth scrolling in the nav-bar

// === PRODUCT DATA & RENDERING ===
const products = [
    {
        name: "Mercedes Benz Arocs",
        image: "/images/arocs.jpg",
        year: "2017",
        details: "Km: 294000",
        price: 63000
    },
    {
        name: "Mercedes Benz Actros",
        image: "/images/actros2014.jpg",
        year: "2014",
        details: "Km: 330000",
        price: 58000
    },
    {
        name: "Liebherr 556",
        image: "/images/liebherr556.jpg",
        year: "2011",
        details: "Weight: 21T",
        price: 48000
    },
    {
        name: "Caterpillar D6N XL",
        image: "/images/cartepillarbager.jpg",
        year: "2006",
        details: "Hours: 16000",
        price: 44000
    },
    {
        name: "Mercedes Benz Actros 2644",
        image: "/images/graymercedes.jpg",
        year: "2009",
        details: "Km: 523000",
        price: 55000
    },
    {
        name: "Komatsu PW180",
        image: "/images/komatsu.jpg",
        year: "2007",
        details: "Hours: 12000",
        price: 44000
    },
    {
        name: "MAN TGS 8x4",
        image: "/images/bluemantgs.jpg",
        year: "2009",
        details: "Km: 401000",
        price: 57000
    },
    {
        name: "Liebherr 576",
        image: "/images/ulta.jpg",
        year: "2012",
        details: "Hours: 10523",
        price: 67000
    },
    {
        name: "Volvo EC300E nl",
        image: "/images/volvobager.jpg",
        year: "2015",
        details: "Hours: 12000",
        price: 57000
    }
];

function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    products.forEach((product, idx) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='/img/placeholder.jpg'">
            <h3>${product.name}</h3>
            <div class="product-details">${product.year} &bull; ${product.details}</div>
            <div class="product-price">$${product.price.toLocaleString()}</div>
            <button class="add-to-cart-btn" onclick="addToCart('${product.name}', ${product.price})">Add To Cart</button>
        `;
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    // ... existing DOMContentLoaded code ...
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    const header = document.querySelector('header .container');
    header.insertBefore(menuToggle, header.querySelector('nav'));

    const nav = document.querySelector('header nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
});
