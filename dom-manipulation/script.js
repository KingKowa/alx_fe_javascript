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


function createAddQuoteForm(){
    
}

quoteDisplay.addEventListener('click', showRandomQuote);