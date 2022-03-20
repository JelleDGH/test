let articles = document.querySelector('.latest_news_article_preview');
let readMoreBtn = document.querySelector('.readmorebtn');
let titleArticle = document.querySelector('.ln-t_bg');

function articlePreview(){
    if(articles.style.display === "block"){
        titleArticle.style.background = "#2c2c2c";
        titleArticle.style.color = "white";
        readMoreBtn.innerHTML = "More <i class='ri-arrow-right-s-line'></i>";
        articles.style.display = "none";
    }else {
        titleArticle.style.background = "#808080";
        titleArticle.style.color = "#121212";
        readMoreBtn.innerHTML = "Less <i class='ri-arrow-down-s-line'></i>";
        articles.style.display = "block";
    }
}
