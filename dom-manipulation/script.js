const quotes = [
    { text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae molestiae tenetur quos!", category: "Entertainment" },
    { text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae molestiae tenetur quos!", category: "Sports" },
    { text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae molestiae tenetur quos!", category: "Education"}
];

let quoteDisplay = document.getElementById('quoteDisplay');

const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `text: "${randomQuote.text}" - category: "${randomQuote.category}"`;
}


const addQuote = () => {

}

quoteDisplay.addEventListener('click', showRandomQuote);