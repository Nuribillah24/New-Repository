// RSS ফিডগুলির লিস্ট
const rssFeeds = [
  "http://rss.cnn.com/rss/edition.rss",
  "http://feeds.reuters.com/reuters/topNews",
  "http://feeds.bbci.co.uk/news/world/rss.xml",
  "https://rss.nytimes.com/services/xml/rss/nyt/World.xml", 
  "https://www.aljazeera.com/xml/rss/all.xml", 
  "https://www.theguardian.com/world/rss",
  "https://feeds.foxnews.com/foxnews/world", 
  "https://www.nbcnews.com/id/3032091/device/rss/rss.xml",
  "https://abcnews.go.com/abcnews/topstories", 
  "https://feeds.skynews.com/feeds/rss/home.xml",
  "http://rssfeeds.usatoday.com/usatoday-NewsTopStories"
];
  // ফিড থেকে RSS ডেটা আনতে একটি async ফাংশন তৈরি করা
async function fetchRSSFeed(url) {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`);
    const data = await response.json();
    return data.items; // RSS ফিড থেকে আইটেমসমূহ ফেরত দেয়া হচ্ছে
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
}

// ওয়েবসাইটে নিউজ লোড করতে ফাংশন
async function loadNews() {
  const newsFeedContainer = document.getElementById("news-feed");
  newsFeedContainer.innerHTML = ""; // পুরানো কনটেন্ট পরিষ্কার করা

  // প্রত্যেকটি ফিড থেকে নিউজ আনতে লুপ
  for (const feed of rssFeeds) {
    const newsItems = await fetchRSSFeed(feed); // RSS ফিড থেকে নিউজ ডেটা আনা
    newsItems.forEach(item => {
      // প্রতিটি নিউজের জন্য একটি HTML এলিমেন্ট তৈরি করা
      const newsElement = document.createElement("div");
      newsElement.innerHTML = `<h3><a href="${item.link}" target="_blank">${item.title}</a></h3><p>${item.description}</p>`;
      newsFeedContainer.appendChild(newsElement); // ওয়েবসাইটে নিউজ যোগ করা
    });
  }
}

// পৃষ্ঠাটি লোড হলে নিউজ লোড করা
window.onload = loadNews;
