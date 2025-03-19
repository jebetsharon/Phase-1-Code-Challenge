document.addEventListener('DOMContentLoaded', () => {
    const flashcardsContainer = document.getElementById('flashcardsContainer');
    const addFlashcardButton = document.getElementById('addFlashcard');
    
    let flashcards = [];
  
    fetch('http://localhost:5000/flashcards')
      .then(response => response.json())
      .then(data => {
        flashcards = data;  
        renderFlashcards();  
      })
      .catch(error => console.error('Error fetching flashcards:', error));
  
    function renderFlashcards() {
      flashcardsContainer.innerHTML = '';  
      flashcards.forEach(flashcard => {
        const flashcardElement = document.createElement('div');
        flashcardElement.classList.add('flashcard');
  
        const questionElement = document.createElement('p');
        questionElement.textContent = flashcard.question;
  
        const answerElement = document.createElement('p');
        answerElement.textContent = flashcard.answer;
        answerElement.classList.add('hidden');  
  
        const flipButton = document.createElement('button');
        flipButton.textContent = 'Flip';
        flipButton.classList.add('btn');
        flipButton.addEventListener('click', () => {
          answerElement.classList.toggle('hidden');  
        });
  
        flashcardElement.appendChild(questionElement);
        flashcardElement.appendChild(answerElement);
        flashcardElement.appendChild(flipButton);
        
        flashcardsContainer.appendChild(flashcardElement);  
      });
    }
  
    addFlashcardButton.addEventListener('click', () => {
      const newQuestion = document.getElementById('newQuestion').value;
      const newAnswer = document.getElementById('newAnswer').value;
  
      if (newQuestion && newAnswer) {
        const newFlashcard = {
          question: newQuestion,
          answer: newAnswer
        };
  
        fetch('http://localhost:5000/flashcards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newFlashcard)
        })
          .then(response => response.json())  
          .then(data => {
            flashcards.push(data);  
            renderFlashcards();     
          })
          .catch(error => console.error('Error adding flashcard:', error));
      } else {
        alert('Please fill in both the question and answer.');
      }
  
      document.getElementById('newQuestion').value = '';
      document.getElementById('newAnswer').value = '';
    });
  });
  