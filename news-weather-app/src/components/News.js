import React, { useState, useEffect } from "react";
import axios from "axios";
import "./News.css";

const REACT_APP_NEWS_API_KEY = "14f2b7c459f946a6ae0b91bb80faf434";

const News = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = search
          ? `https://newsapi.org/v2/top-headlines?q=${search}&language=en&category=${category}&apiKey=${REACT_APP_NEWS_API_KEY}`
          : `https://newsapi.org/v2/top-headlines?language=en&category=${category}&apiKey=${REACT_APP_NEWS_API_KEY}`;
        const response = await axios.get(url);
        setArticles(response.data.articles);
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
            <img
              src={
                article.urlToImage ||
                "https://via.placeholder.com/340x160?text=No+Image"
              }
              alt={article.title}
              className="news-image"
            />
            <div className="news-content">
              <div className="news-title">{article.title}</div>
              <div className="news-description">
                {shortDescription(article.description)}
              </div>
              <a
                href={article.url}
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
