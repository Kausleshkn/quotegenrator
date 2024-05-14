
let ele = document.getElementById('quote');
let genrate = document.getElementById('load');
let auth = document.getElementById('auth');
let bg = document.getElementsByTagName('body');


let oldQuote = ele.innerText;
let oldAuth = auth.innerText;

async function randomQuote() {
    let response = await fetch("https://api.quotable.io/quotes/random");
    return response.json();
}

let genrateHexCol = (numA, numB) => {

    let hexnum = "abcdefebf"
    let a = Math.floor(Math.random() * numA);
    let sl = hexnum.slice(a, a + 1)
    let c = Math.floor(Math.random() * numB);
    let sl1 = hexnum.slice(c, c + 1)

    let hexcol = `#${sl}${sl1}${c}${a}${sl1}${sl}`
    return hexcol;
}

genrate.addEventListener('click', async () => {

    let res = await randomQuote();

    if (res[0].content.length > 20) {
        ele.innerHTML = ` <q>${res[0].content}</q>`;
        auth.innerHTML = `<p> &#9866; By ${res[0].author} </p>`;
    } else {
        ele.innerText = oldQuote;
        auth.innerText = oldAuth;
    }
    bg[0].style = ` background: linear-gradient(90deg, ${genrateHexCol(6, 10)},${genrateHexCol(10, 6)});`;
});


// social link sharing funtionallity;

let insta = document.getElementById('insta');
let fb = document.getElementById('fb');
let linkdn = document.getElementById('linkdn');
let twitter = document.getElementById('twitter');
let reddit = document.getElementById('reddit');

twitter.onclick = function () {
    const msg = encodeURIComponent(ele.innerText);
    const author = encodeURIComponent(auth.innerText);
    window.open(`http://twitter.com/intent/tweet?&text=${msg} ${author} &hashtags=quotes,todayGreet`);
}

reddit.onclick = function () {
    const msg = encodeURIComponent(ele.innerText);
    const author = encodeURIComponent(auth.innerText);
    window.open(`http://www.reddit.com/submit?&title=${msg} ${author}`);
}

linkdn.onclick = function () {
    const msg = encodeURIComponent(ele.innerText);
    const author = encodeURIComponent(auth.innerText);
    const link = encodeURI(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?&title=${msg} ${author}`);
}

fb.onclick = function () {
    const msg = encodeURIComponent(ele.innerText);
    const author = encodeURIComponent(auth.innerText);
    const link = encodeURI(window.location.href);
    window.open(`https://www.facebook.com/share.php?u=${link}`);
}

insta.onclick = function () {
    const msg = encodeURIComponent(ele.innerText);
    const author = encodeURIComponent(auth.innerText);
    const link = encodeURI(window.location.href);
    
    window.open(`https://api.whatsapp.com/send?text=${msg} ${author}: ${link}` || `https://telegram.me/share/url?url=${link}&text=${msg} ${author}`);
}







