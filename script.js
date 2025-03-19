document.addEventListener('DOMContentLoaded', () => {
    const flashcardsContainer = document.getElementById('flashcardsContainer');
    const addFlashcardButton = document.getElementById('addFlashcard');
    
    let flashcards = [];
  
    // Fetch flashcards from JSON Server
    fetch('http://localhost:5000/flashcards')
      .then(response => response.json())
      .then(data => {
        flashcards = data;  // Store the flashcards fetched from the server
        renderFlashcards();  // Render them on the page
      })
      .catch(error => console.error('Error fetching flashcards:', error));
  
    // Render flashcards to the DOM
    function renderFlashcards() {
      flashcardsContainer.innerHTML = '';  // Clear the container before re-rendering
      flashcards.forEach(flashcard => {
        const flashcardElement = document.createElement('div');
        flashcardElement.classList.add('flashcard');
  
        const questionElement = document.createElement('p');
        questionElement.textContent = flashcard.question;
  
        const answerElement = document.createElement('p');
        answerElement.textContent = flashcard.answer;
        answerElement.classList.add('hidden');  // Hide the answer initially
  
        const flipButton = document.createElement('button');
        flipButton.textContent = 'Flip';
        flipButton.classList.add('btn');
        flipButton.addEventListener('click', () => {
          answerElement.classList.toggle('hidden');  // Toggle the visibility of the answer
        });
  
        flashcardElement.appendChild(questionElement);
        flashcardElement.appendChild(answerElement);
        flashcardElement.appendChild(flipButton);
        
        flashcardsContainer.appendChild(flashcardElement);  // Add the flashcard to the container
      });
    }
  
    // Add a new flashcard (POST request to the server)
    addFlashcardButton.addEventListener('click', () => {
      const newQuestion = document.getElementById('newQuestion').value;
      const newAnswer = document.getElementById('newAnswer').value;
  
      // Check if the inputs are not empty
      if (newQuestion && newAnswer) {
        const newFlashcard = {
          question: newQuestion,
          answer: newAnswer
        };
  
        // Send POST request to add a new flashcard
        fetch('http://localhost:5000/flashcards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newFlashcard)
        })
          .then(response => response.json())  // Parse the JSON response from the server
          .then(data => {
            flashcards.push(data);  // Add the newly created flashcard to the array
            renderFlashcards();     // Re-render the flashcards list
          })
          .catch(error => console.error('Error adding flashcard:', error));
      } else {
        alert('Please fill in both the question and answer.');
      }
  
      // Clear the input fields after adding the flashcard
      document.getElementById('newQuestion').value = '';
      document.getElementById('newAnswer').value = '';
    });
  });
  