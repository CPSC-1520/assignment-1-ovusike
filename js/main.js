
// Please refer to the "Required Tasks in the assignments PDF"

// html for the add cheep create function
/*
  <div class="col">
    <div class="card shadow-sm">
      <img class="bd-placeholder-img card-img-top" src="ALBUM IMAGE SELECTION HERE"/>
      <div class="card-body">
        <h5 class="card-title">ALBUM DESCRIPTION HERE</h5>
        <p class="card-text">ALBUM TITLE HERE</p>
      </div>
    </div>
  </div>
*/


const form = document.getElementById('albumForm');
const albumContainer = document.getElementById('albumContainer');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form elements
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;
    const albumArt = event.target.elements.albumArt.files[0];

    // Validate form inputs
    const isValid = validateForm(title, description, albumArt);

    if (isValid) {
        // Add album card
        addAlbumCard(title, description, URL.createObjectURL(albumArt));

        // Reset form
        form.reset();
        event.target.elements.title.focus();
    }
});

// Validation functions
function validateForm(title, description, albumArt) {
    let isValid = true;

    // Validate title
    if (!validateTitle(title)) {
        showError('titleError', 'Title must be between 1 and 60 characters.');
        isValid = false;
    } else {
        clearError('titleError');
    }

    // Validate description
    if (!validateDescription(description)) {
        showError('descriptionError', 'Description must be between 1 and 255 characters.');
        isValid = false;
    } else {
        clearError('descriptionError');
    }

    // Validate album art
    if (!validateAlbumArt(albumArt)) {
        showError('albumArtError', 'Please select a valid .gif file.');
        isValid = false;
    } else {
        clearError('albumArtError');
    }

    return isValid;
}

function validateTitle(title) {
    return title.length > 0 && title.length <= 60;
}

function validateDescription(description) {
    return description.length > 0 && description.length <= 255;
}

function validateAlbumArt(albumArt) {
    return albumArt && albumArt.type === 'image/gif';
}

// Helper functions to show and clear errors
function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
    document.getElementById(elementId).previousElementSibling.classList.add('is-invalid');
}

function clearError(elementId) {
    document.getElementById(elementId).textContent = '';
    document.getElementById(elementId).previousElementSibling.classList.remove('is-invalid');
}

// Function to add album card
function addAlbumCard(title, description, albumArtUrl) {
    const albumCard = document.createElement('div');
    albumCard.classList.add('album-card');

    albumCard.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <img src="${albumArtUrl}" alt="${title}" width="100">
    `;

    // Add the new album card to the top left
    albumContainer.prepend(albumCard);
}


