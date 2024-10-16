const quotes = [
    { text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae molestiae tenetur quos!", category: "Entertainment" },
    { text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae molestiae tenetur quos!", category: "Sports" },
    { text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae molestiae tenetur quos!", category: "Education"}
];


const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    let quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>text: "${randomQuote.text}" - category: "${randomQuote.category}"</p>`;
}

function createAddQuoteForm() {
    const form = document.createElement('form');
    form.id = 'quoteForm';
  
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.placeholder = 'Enter a new quote';
    textInput.id = 'newQuoteText';
    textInput.required = true;

    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
    categoryInput.id = 'quoteCategory';
    categoryInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Add Quote';
    submitButton.type = 'submit';

    form.appendChild(textInput);
    form.appendChild(categoryInput);
    form.appendChild(submitButton);

    document.body.appendChild(form);

    form.addEventListener('submit', function(e) {
        e.preventDefault();  // Prevent the page from refreshing
    
        const newQuoteText = document.getElementById('quoteText').value;
        const newQuoteCategory = document.getElementById('quoteCategory').value;
    
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
    
        textInput.value = '';
        categoryInput.value = '';
    
        //displayQuotes();

        showRandomQuote();
    
        alert('Quote added successfully!');
      });
}

function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes); 
    } else {
      
      quotes = [
        { text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae molestiae tenetur quos!", category: "Entertainment" },
        { text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae molestiae tenetur quos!", category: "Sports" },
        { text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae molestiae tenetur quos!", category: "Education" }
      ];
    }
  }

  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes)); 
  }

document.getElementById('newQuote').addEventListener('click', showRandomQuote);


document.addEventListener('DOMContentLoaded', function() {
    createAddQuoteForm();
    loadQuotes();
    showRandomQuote();  // Show a random quote on page load
  });
