// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!


document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  const likeGlyphs = document.querySelectorAll('.like-glyph');

  // Add the .hidden class to the error modal initially
  modal.classList.add('hidden');

  // Add event listeners to all like glyphs
  likeGlyphs.forEach(likeGlyph => {
      likeGlyph.addEventListener('click', function() {
          if (likeGlyph.classList.contains('activated')) {
              // If heart is full, make it empty
              likeGlyph.textContent = EMPTY_HEART;
              likeGlyph.classList.remove('activated-heart');
              likeGlyph.classList.remove('activated');
          } else {
              // If heart is empty, attempt to like
              mimicServerCall()
                  .then(() => {
                      // If successful, make the heart full
                      likeGlyph.textContent = FULL_HEART;
                      likeGlyph.classList.add('activated-heart');
                      likeGlyph.classList.add('activated');
                  })
                  .catch(error => {
                      // If there's an error, display the error message in the modal
                      modalMessage.textContent = error;
                      modal.classList.remove('hidden');
                      // Hide the modal after 3 seconds
                      setTimeout(() => {
                          modal.classList.add('hidden');
                      }, 3000);
                  });
          }
      });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
