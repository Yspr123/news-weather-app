import React, { useState, useEffect } from "react";
import axios from "axios";
import "./News.css";

const REACT_APP_NEWS_API_KEY = "pub_54b01337678e4331a3605ef64c648e2b";

const News = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Construct the URL based on search and category
        const url = search
          ? `https://newsdata.io/api/1/news?apikey=${REACT_APP_NEWS_API_KEY}&q=${search}&language=en`
          : `https://newsdata.io/api/1/news?apikey=${REACT_APP_NEWS_API_KEY}&category=${category}&language=en`;

        const response = await axios.get(url);

        // NewsData.io returns articles in response.data.results
        setArticles(response.data.results || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [search, category]);

  // Helper to get a short description (max 30 words)
  const shortDescription = (desc) => {
    if (!desc) return "";
    const words = desc.split(" ");
    return words.length > 30 ? words.slice(0, 30).join(" ") + "..." : desc;
  };

  return (
    <div>
      <h2 style={{ color: "#61dafb", marginBottom: "18px" }}>
        {category === "general"
          ? "Global News"
          : category.charAt(0).toUpperCase() + category.slice(1) + " News"}
      </h2>
      <input
        type="text"
        placeholder="Search news..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "24px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          background: "#23263a",
          color: "#eaeaea",
          padding: "10px 16px",
          fontSize: "1rem",
        }}
      />
      <div className="news-list">
        {articles.slice(0, 12).map((article, index) => (
          <div
            className="news-card"
            key={index}
            tabIndex={0}
            style={{ animation: `fadeIn 0.5s ease ${index * 0.07}s both` }}
          >
            <div className="news-image-wrapper">
               <img
              src={
                article.image_url ||
                "https://via.placeholder.com/340x160?text=No+Image"
              }
              alt={article.title}
              className="news-image"
            />
            </div>
            <div className="news-content">
              <div className="news-title">{article.title}</div>
              <div className="news-description">
                {shortDescription(article.description)}
              </div>
              <div
                className="news-category"
                style={{ fontStyle: "italic", color: "#888" }}
              >
                {article.category ? article.category.join(", ") : "General"}
              </div>
              <a
                href={article.link}
                className="news-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;

