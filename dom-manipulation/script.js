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

  function exportQuotes() {
    // Create a Blob object from the quotes array
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create a temporary link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';  // Name of the downloaded file
    a.click();  // Programmatically click the link to start the download
  
    // Revoke the object URL after the download
    URL.revokeObjectURL(url);
  }

  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

  function populateCategories() {
    const categoryDropdown = document.getElementById('filterCategory');
  
    // Extract unique categories from quotes
    const categories = [...new Set(quotes.map(quote => quote.category))];
  
    // Clear existing options, keeping "All Categories" as the default
    categoryDropdown.innerHTML = `<option value="all">All Categories</option>`;
  
    // Add new unique categories to the dropdown
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryDropdown.appendChild(option);
    });
  }

  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
  
    // Filter the quotes based on the selected category
    if (selectedCategory === 'all') {
      displayQuotes(quotes); // Show all quotes if 'All Categories' is selected
    } else {
      const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
      displayQuotes(filteredQuotes); // Show only the filtered quotes
    }
  }

  const apiBaseUrl = "https://jsonplaceholder.typicode.com/posts";

  async function fetchQuotesFromServer() {
    try {
      const response = await fetch(apiBaseUrl);
      const data = await response.json();
  
      // Map the fetched data to quote objects (simulating with title and body)
      quotes = data.slice(0, 10).map(quote => ({
        text: quote.title,  // Simulate quote text
        category: "General"  // Assign a default category for now
      }));
  
      displayQuotes(quotes);  // Display fetched quotes
      populateCategories();   // Populate categories dropdown
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  }

  async function syncQuotes(newQuote) {
    try {
      const response = await fetch(apiBaseUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuote)
      });
  
      if (!response.ok) {
        throw new Error('Error posting quote');
      }
  
      const postedQuote = await response.json();
  
      // Add the posted quote to the local quotes array
      quotes.push({
        text: postedQuote.title,
        category: newQuote.category
      });

      displayQuotes(quotes);  // Update DOM
    saveQuotes();           // Save to local storage (simulated)

    console.log('Quote successfully posted:', postedQuote);
  } catch (error) {
    console.error("Error posting quote:", error);
  }
}


  document.getElementById('exportQuotes').addEventListener('click', exportQuotes);

  document.getElementById('newQuote').addEventListener('click', showRandomQuote);

  document.getElementById('filterButton').addEventListener('click', filterQuotes);


document.addEventListener('DOMContentLoaded', function() {
    createAddQuoteForm();
    loadQuotes();
    showRandomQuote();  // Show a random quote on page load
  });
