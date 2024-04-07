document.addEventListener('DOMContentLoaded', function() {
  // Initial Popup Display
  document.getElementById('popup-container').style.display = 'flex';
  setTimeout(() => {
    document.getElementById('popup-container').classList.add('show');
  }, 50);

  // Close Popup
  document.getElementById('close-popup').onclick = function() {
    document.getElementById('popup-container').style.display = 'none';
  };

  // Mouseover Events for Language Selection
  const selectLanguageElement = document.getElementById('select-language');
  document.getElementById('en-flag').addEventListener('mouseover', () => {
    selectLanguageElement.textContent = "Select Language";
  });
  document.getElementById('pt-flag').addEventListener('mouseover', () => {
    selectLanguageElement.textContent = "Seleciona o idioma";
  });
  document.getElementById('es-flag').addEventListener('mouseover', () => {
    selectLanguageElement.textContent = "Seleccione el idioma";
  });
  
  // Function to Change Language
function changeLanguage(lang) {
  // Update images using data- attributes
  const imagesToChange = document.querySelectorAll('img[data-en], img[data-pt], img[data-es]');
  imagesToChange.forEach(img => {
    const newSrc = img.getAttribute(`data-${lang}`);
    if (newSrc) {
      img.src = newSrc;
    }
  });

  // Update text content using data- attributes
  const textElementsToChange = document.querySelectorAll('[data-en], [data-pt], [data-es]');
  textElementsToChange.forEach(element => {
    const newText = element.getAttribute(`data-${lang.toLowerCase()}`);
    if (newText) {
      element.textContent = newText;
    }
  });

  // Hide all dropdown links
  const allDropdownLinks = document.querySelectorAll('.dropdown-menu a');
  allDropdownLinks.forEach(link => {
    link.style.display = 'none';
  });

  // Show only the links that match the selected language
  const relevantDropdownLinks = document.querySelectorAll(`.dropdown-menu a[data-${lang.toLowerCase()}]`);
  relevantDropdownLinks.forEach(link => {
    link.style.display = 'block';
  });

  console.log("Language changed to: " + lang);
  document.getElementById('popup-container').style.display = 'none';
}

// Attach Click Event Listeners to Flag Images for Language Change
document.getElementById('en-flag').addEventListener('click', () => changeLanguage('EN'));
document.getElementById('pt-flag').addEventListener('click', () => changeLanguage('PT'));
document.getElementById('es-flag').addEventListener('click', () => changeLanguage('ES'));
});

document.addEventListener('DOMContentLoaded', function() {
  const cardContainers = document.querySelectorAll('.card-container');

  cardContainers.forEach(container => {
    container.addEventListener('click', function(event) {
        // Exclude clicks on elements within a .button-link or on the .button-link itself
        if (event.target.closest('.button-link') || event.target.classList.contains('button-link')) {
            // Allow default action, such as navigation, to proceed
            return;
        }
        
        const url = container.dataset.href;
        if (url && !event.target.closest('.button-link')) {
            window.location.href = url;
        }
          container.classList.add('click-animation');
          setTimeout(() => container.classList.remove('click-animation'), 300); // Animation duration
      });
      container.style.cursor = 'pointer';
  });

    cardContainers.forEach((container, index) => {
        const glowEffect = document.createElement('div');
        glowEffect.classList.add('glow-effect', index === 0 ? 'blue-glow' : 'purple-glow');
        glowEffect.style.position = 'absolute';
        glowEffect.style.width = '400px';
        glowEffect.style.height = '400px';
        glowEffect.style.borderRadius = '50%';
        glowEffect.style.transform = 'translate(-50%, -50%)';
        glowEffect.style.opacity = '0'; // Start invisible
        container.appendChild(glowEffect);
    });

    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 1024) {
            cardContainers.forEach(container => {
                const glowEffect = container.querySelector('.glow-effect');
                const rect = container.getBoundingClientRect();
                const mousePosX = e.clientX;
                const mousePosY = e.clientY;

                const overCard = mousePosX >= rect.left && mousePosX <= rect.right && mousePosY >= rect.top && mousePosY <= rect.bottom;

                // Adjust these values to change the glow's opacity when over the card and the fade effect
                const maxOpacityOverCard = 0.4; // Max opacity when cursor is directly over the card
                const maxOpacityNearCard = 0.4; // Max opacity when cursor is near the card but not directly over it
                const fadeDistance = 150; // Distance from the card where the glow effect starts to fade

                if (overCard) {
                    glowEffect.style.opacity = maxOpacityOverCard.toString();
                } else {
                    const distance = Math.min(
                        Math.abs(rect.left - mousePosX),
                        Math.abs(rect.right - mousePosX),
                        Math.abs(rect.top - mousePosY),
                        Math.abs(rect.bottom - mousePosY)
                    );

                    let opacity = distance <= fadeDistance ? Math.max(0, 1 - (distance / fadeDistance)) * maxOpacityNearCard : 0;
                    glowEffect.style.opacity = opacity.toString();
                }

                glowEffect.style.left = `${mousePosX - rect.left}px`;
                glowEffect.style.top = `${mousePosY - rect.top}px`;
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Assuming your clickable element has a class or ID you can target
    var clickableElement = document.querySelector('[data-href]'); // Adjust selector as needed

    clickableElement.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior
        var targetId = this.getAttribute('data-href');
        var targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// esta parte do código é para ajustes no carossel
var TrandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: -100,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 1,
    scale: 0.8,
  },
  speed: 800, // Ajuste a velocidade da transição para 800ms (0.8 segundos)
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      spaceBetween: -200,
      coverflowEffect: {
        scale: 0.7
      },
    },
    768: {
      spaceBetween: -450,
      coverflowEffect: {
        scale: 0.8
      },
    },
    1024: {
      spaceBetween: -1220,
      coverflowEffect: {
        scale: 0.01,
      }
    }
  },
  on: {
    slideChangeTransitionStart: function() {
      let secondarySlider = document.querySelector('.tranding-slider-secondary');
      if (secondarySlider) {
        secondarySlider.style.opacity = 0.5; // Diminui a opacidade do slider secundário durante a transição
        secondarySlider.style.zIndex = -1; // Garante que o slider secundário esteja sempre atrás do principal
      }
    },
    slideChangeTransitionEnd: function() {
      let secondarySlider = document.querySelector('.tranding-slider-secondary');
      if (secondarySlider) {
        secondarySlider.style.opacity = 1; // Restaura a opacidade do slider secundário
        secondarySlider.style.zIndex = 0; // Garante que o slider secundário esteja na posição correta
      }
    },
    slideChange: function () {
      let swiper = this;
      swiper.slides.forEach((slide, index) => {
        const img = slide.querySelector('.tranding-slide-img img');
        let distance = Math.abs(swiper.activeIndex - index);
        let scale = Math.max(1 - (0.1 * distance), 1);//faz os sliders irem ajustando o tamanho
        img.style.transform = `scale(${scale})`;
      });
    }
    
  }
});

// Esta parte do código é para ajustar a posição onde ao clicar nos cartões a página vai 
  document.addEventListener('DOMContentLoaded', function() {
    const patreonCard = document.querySelector('.patreon'); // Use the actual class of your Patreon card
  
    patreonCard.addEventListener('click', function(event) {
  
      const targetSection = document.getElementById('patreonContinuation'); // Ensure 'patreonContinuation' is the correct ID
      const targetPosition = targetSection.offsetTop; // Get the top position of the target section
      let offset; // Declare the offset variable
  
      // Check viewport width and adjust the offset accordingly
      if (window.innerWidth < 340) {
        offset = window.innerHeight * -0.25; // Smaller screens, smaller offset
      } else if (window.innerWidth < 768) {
        offset = window.innerHeight * -0.27; // Medium screens, medium offset
      } else if (window.innerWidth < 1024) {
        offset = window.innerHeight * -0.22; // Larger screens, larger offset
      } else {
        offset = window.innerHeight * 0.2; // Default for screens larger than 1024px
      }
  
      const scrollToPosition = targetPosition + offset; // Add the offset to the target section's top position
  
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth' // Smoothly scroll to the new position
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Find all elements with a data-href attribute
    const dataHrefElements = document.querySelectorAll('[data-href]');
  
    dataHrefElements.forEach(element => {
      element.addEventListener('click', function() {
        const targetId = this.getAttribute('data-href').substring(1); // Remove the '#' from the ID
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
  
// FAQ's
document.addEventListener('DOMContentLoaded', () => {
// Grab all FAQ sections
const faqs = document.querySelectorAll('.faq');
// Grab all dropdown toggle elements (question text and burger icon)
const dropdownToggles = document.querySelectorAll('.faq .question, .faq .faqBurger');

// Initially hide all FAQs except the first one and ensure the first answer is visible
faqs.forEach((faq, index) => {
if (index === 0) {
  faq.style.display = 'block'; // Show the first FAQ
  const answerDiv = faq.querySelector('.answer');
  answerDiv.style.maxHeight = '1000px'; // Ensure the answer is visible
  answerDiv.style.opacity = 1;
  answerDiv.style.visibility = 'visible';
} else {
  faq.style.display = 'none'; // Hide other FAQs
}
});

// Function to update the displayed FAQ question and answer
const updateDisplay = (faqId, questionText, answerText) => {
  // Loop through all FAQs to find and update the specified one
  faqs.forEach((faq, index) => {
    if (index + 1 == faqId) { // Match based on FAQ ID
      faq.querySelector('.question h3').textContent = questionText; // Update question text
      faq.querySelector('.answer p').textContent = answerText; // Update answer text
      faq.style.display = 'block'; // Make sure the FAQ is visible
    } else {
      faq.style.display = 'none'; // Hide other FAQs
    }
  });
};

// Add click event listeners to each dropdown toggle to show/hide its menu
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click from propagating to the document
    const dropdownMenu = this.closest('.faq').querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block'; // Toggle display
  });
});

// Add click event listeners to dropdown items for selection
document.querySelectorAll('.dropdown-menu a').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    const faqId = this.dataset.question; // Get the FAQ ID
    const questionText = this.dataset.newQuestion; // Get the new question text
    const newAnswerText = this.dataset.newAnswer; // Get the new answer text
    updateDisplay(faqId, questionText, newAnswerText); // Update the display with the new question and answer
    this.closest('.dropdown-menu').style.display = 'none'; // Close the dropdown menu
  });

  // Hover event to preview questions without clicking
  link.addEventListener('mouseover', function() {
    const faqId = this.dataset.question; // Get the FAQ ID
    const questionText = this.dataset.newQuestion; // Get the hovered question text
    const newAnswerText = this.dataset.newAnswer; // Get the hovered answer text
    updateDisplay(faqId, questionText, newAnswerText); // Update the display with the hovered question and answer
  });
});

// Close all dropdowns if the user clicks anywhere outside the dropdowns
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.style.display = 'none'; // Hide the menu
  });
});

// Prevent closing the dropdown when clicking inside it
document.querySelectorAll('.dropdown-menu').forEach(menu => {
  menu.addEventListener('click', (event) => {
    event.stopPropagation(); // Stop the click from reaching the document
  });
});
});

//Chat
document.addEventListener('DOMContentLoaded', function() {
const chatIcon = document.getElementById('chatIconContainer');
const chatbox = document.getElementById('chatboxContainer');
const closeChat = document.getElementById('closeChat');
const sendMsg = document.getElementById('sendMsg');
const chatInput = document.getElementById('chatInput');
const notificationBubble = document.createElement('span');

chatIcon.appendChild(notificationBubble);
setupNotificationBubble(notificationBubble);
handleChatIconClick(chatIcon, chatbox, notificationBubble);
handleCloseChatClick(closeChat, chatbox);
handleSendMessage(sendMsg, chatInput);

displayInitialMessageAfterDelay(15000, notificationBubble);
});

function setupNotificationBubble(bubble) {
  bubble.style.cssText = 'position: absolute; top: -5px; right: -5px; background-color: red; border-radius: 50%; display: none; justify-content: center; align-items: center; color: white; font-weight: bold;';

  // Apply different sizes based on screen width
  if (window.innerWidth <= 340) {
      bubble.style.width = '20px';
      bubble.style.height = '20px';
      bubble.style.fontSize = '12px';
  } else if (window.innerWidth <= 728) {
      bubble.style.width = '30px';
      bubble.style.height = '30px';
      bubble.style.fontSize = '12px';
  } else if (window.innerWidth <= 1024) {
      bubble.style.width = '40px';
      bubble.style.height = '40px';
      bubble.style.fontSize = '24px';
  } else {
      bubble.style.width = '25px'; // Default size for larger screens
      bubble.style.height = '25px';
      bubble.style.fontSize = '22px';
  }
  bubble.innerText = '!';
}

// Call the function when the window loads
window.onload = function() {
  var bubble = document.getElementById('yourNotificationBubbleId');
  setupNotificationBubble(bubble);
}

const bubbleForSize340 = document.getElementById('bubble-size-340');
setupNotificationBubble(bubbleForSize340, 30); // Size for 340px

const bubbleForSize728 = document.getElementById('bubble-size-728');
setupNotificationBubble(bubbleForSize728, 40); // Size for 728px

const bubbleForSize1024 = document.getElementById('bubble-size-1024');
setupNotificationBubble(bubbleForSize1024, 50); // Size for 1024px

function handleChatIconClick(icon, chatbox, bubble) {
icon.addEventListener('click', function() {
    chatbox.style.display = 'block';
    bubble.style.display = 'none';
});
}

function handleCloseChatClick(button, chatbox) {
button.addEventListener('click', function() {
    chatbox.style.display = 'none';
});
}

function handleSendMessage(sendButton, inputField) {
sendButton.addEventListener('click', function() { sendMessage(inputField); });
inputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage(inputField);
    }
});
}

function sendMessage(inputField) {
const userInput = inputField.value.trim();
if (userInput !== '') {
    appendMessage(userInput, 'user-message');
    inputField.value = '';
}
}

function appendMessage(text, className) {
const messageContainer = document.getElementById('chatMessages');
const message = document.createElement('div');
message.textContent = text;
message.className = className;
messageContainer.appendChild(message);
}

function displayInitialMessageAfterDelay(delay, bubble) {
  setTimeout(function() {
    bubble.style.display = 'flex';
    // Get the current language from the selectLanguageElement's text content
    var currentLanguage = document.getElementById('select-language').textContent;
    var message;
    
    // Determine the message to send based on the current language
    if (currentLanguage.includes("Select Language")) {
      message = "Do you have any questions? We are here to help!";
    } else if (currentLanguage.includes("Seleciona o idioma")) {
      message = "Você tem alguma pergunta? Estamos aqui para ajudar!";
    } else if (currentLanguage.includes("Seleccione el idioma")) {
      message = "¿Tienes alguna pregunta? ¡Estamos aquí para ayudar!";
    } else {
      message = "Do you have any questions? We are here to help!"; // Default to English
    }
    
    appendMessage(message, 'bot-message');
  }, delay);
}
