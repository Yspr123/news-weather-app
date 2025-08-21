import React, { useState, useEffect } from "react";
import axios from "axios";

const News = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = search
          ? `https://newsapi.org/v2/top-headlines?q=${search}&language=en&category=${category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
          : `https://newsapi.org/v2/top-headlines?language=en&category=${category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
        const response = await axios.get(url);
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [search, category]);

  return (
    <div>
      <h2>
        {category === "general"
          ? "Global News"
          : category.charAt(0).toUpperCase() + category.slice(1) + " News"}
      </h2>
      <input
        type="text"
        placeholder="Search news..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {articles.slice(0, 10).map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
