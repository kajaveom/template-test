
const quoteText = document.getElementById('quote');
const authText = document.getElementById('author');
const quoteContainer = document.getElementById('quote-container');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading

function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getNewQuote() 
{
    loading();
    var url="https://type.fit/api/quotes";    

    const response=await fetch(url);
    console.log(typeof response);

    const allQuotes = await response.json();

    const indx = Math.floor(Math.random()*allQuotes.length);
    const quote=allQuotes[indx].text;
    
    const auth=allQuotes[indx].author;

    if(auth==null)
    {
        author = "Anonymous";
    }

    if(quote.length > 50){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
     
    quoteText.innerHTML = quote;
    authText.innerHTML = auth;

    complete();
 
}

// Tweet Quote

function tweetQuote() {
    const quote = quoteText.innerHTML;
    const author = authText.innerHTML;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', getNewQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On Load
getNewQuote();
