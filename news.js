// একাধিক RSS ফিড URL একটি অ্যারেতে সংরক্ষণ করা
const rssFeedUrls = [
    'https://feeds.bbci.co.uk/news/world/rss.xml',
    'http://rss.cnn.com/rss/edition.rss'
];

// সকল RSS ফিড থেকে খবর ফেচ করার জন্য ফাংশন
const fetchNews = (rssFeedUrl) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS Proxy URL
    const rssToJsonApi = `https://api.rss2json.com/v1/api.json?rss_url=${proxyUrl}${rssFeedUrl}`;

    // Fetch RSS ফিড
    fetch(rssToJsonApi)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            const newsItems = data.items;

            // ফিড থেকে খবর দেখানো
            newsItems.forEach(item => {
                const newsElement = document.createElement('div');
                newsElement.innerHTML = `
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <a href="${item.link}" target="_blank">Read more</a>
                `;
                newsContainer.appendChild(newsElement);
            });
        })
        .catch(error => console.error('Error fetching the RSS feed:', error));
};

// সব ফিড ফেচ করার জন্য
rssFeedUrls.forEach(fetchNews);
