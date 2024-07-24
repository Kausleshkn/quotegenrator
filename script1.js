document.addEventListener("DOMContentLoaded", function () {
    const quoteElement = document.getElementById('quote');
    const generateButton = document.querySelector('.feature .reload button img');
    const authorElement = document.getElementById('auth');
    const bodyElement = document.body;

    const oldQuote = quoteElement.innerText;
    const oldAuthor = authorElement.innerText;

    async function fetchRandomQuote() {
        try {
            const response = await fetch("https://api.quotable.io/quotes/random");
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch the quote", error);
            return null;
        }
    }

    function generateHexColor() {
        const hexChars = "abcdef";
        const randomHex = () => hexChars[Math.floor(Math.random() * hexChars.length)];
        return `#${randomHex()}${randomHex()}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${randomHex()}${randomHex()}`;
    }

    generateButton.addEventListener('click', async () => {
        const response = await fetchRandomQuote();

        // console.log(response);

        if (response && response[0].content.length > 20) {
            quoteElement.innerHTML = `<q>${response[0].content}</q>`;
            authorElement.innerHTML = `<p>&#9866; By ${response[0].author}</p>`;
        } else {
            quoteElement.innerText = oldQuote;
            authorElement.innerText = oldAuthor;
        }

        bodyElement.style.background = `linear-gradient(90deg, ${generateHexColor()}, ${generateHexColor()})`;
    });

    const socialButtons = {
        twitter: "http://twitter.com/intent/tweet?&text=",
        reddit: "http://www.reddit.com/submit?&title=",
        linkedin: "https://www.linkedin.com/sharing/share-offsite/?&title=",
        facebook: "https://www.facebook.com/share.php?u=",
        insta: "https://api.whatsapp.com/send?text=",
        telegram: "https://telegram.me/share/url?url="
    };

    const socialElements = {
        twitter: document.getElementById('twitter'),
        reddit: document.getElementById('reddit'),
        linkedin: document.getElementById('linkdn'),
        facebook: document.getElementById('fb'),
        insta: document.getElementById('insta')
    };

    for (const [key, url] of Object.entries(socialButtons)) {
        if (socialElements[key]) {
            socialElements[key].onclick = function () {
                const message = encodeURIComponent(quoteElement.innerText);
                const author = encodeURIComponent(authorElement.innerText);
                const link = encodeURIComponent(window.location.href);

                if (key === 'facebook') {
                    window.open(`${url}${link}`);
                } else if (key === 'insta') {
                    window.open(`${url}${message} ${author}: ${link}` || `${socialButtons.telegram}${link}&text=${message} ${author}`);
                } else {
                    window.open(`${url}${message} ${author}`);
                }
            };
        }
    }
});
