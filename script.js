const apiKey="2412d028447643179443fed96e73c7b3";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews("India"));

async function fetchNews(query)
{
    //fetch library that returns a promise
    const res=await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data=await res.json();//.json also returns a promise
    // console.log(data)
    bindData(data.articles);
}

function bindData(articles)
{
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardsContainer.innerHTML="";//each time we load we want to empty the cards container
    articles.forEach((article) => {
        if(!article.urlToImage)return;
        const cardClone=newsCardTemplate.content.cloneNode(true);//true to make internal elements clone also[deep cloning]
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article)
{
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

function Click(key)
{
    fetchNews(key);
}

const searchButton=document.getElementById('search-button');
const searchText= document.getElementById('search-text');
searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
})