const quotes = [
    { category: "Entertainment", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae molestiae tenetur quos!"},
    { category: "Sports", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae molestiae tenetur quos!"},
    { category: "Education", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae molestiae tenetur quos!"}
];


const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
}


const addQuote = () => {
    
}
