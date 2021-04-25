import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { getVaccineData } from '../api/Vaccine';
import getFormattedDate from '../util/Utility';
import ErrorMessage from '../components/core/Error';
import { LandingHeaderText } from '../components/core/Text';
import {
  TableElement,
  TableHead,
  TableBody,
  TableRowElement,
  TableHeadElement,
  TableDataElement,
} from '../components/core/Table';
import { getLatestCovidArticles } from '../api/NYTData';

const ArticleContainer = styled.div`
  display: flex;
  margin: 1rem auto;
  width: 600px;
  height: 225px;
  border-radius: 1rem;
  background: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &:hover {
    cursor: pointer;
  }
`;

const ImageContainer = styled.div`
  flex: 2;
  padding: 1rem;
  position: relative;
`;

const Image = styled.img`
  width: 200px;
  max-height: 133px;
  object-fit: cover;
  border-radius: 0.25rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DescriptionContainer = styled.div`
  flex: 3;
  padding: 1rem;
  text-align: left;
`;

const ArticleTitle = styled.p`
  font-weight: 700;
  font-size: 28px;
  margin: 0.25rem 0 0 0;
`;

const ArticlePublishDate = styled.p`
  font-style: italic;
  margin: 0.5rem 0 0 0;
`;

const ArticleSnippet = styled.p`
  margin: 0.5rem 0 0 0;
`;

const ArticleAuthor = styled.p`
  font-style: italic;
  margin: 1rem 0 0 0;
`;

const Grid = styled.div`
margin-top: 20px;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
grid-gap: 2rem;
`

const Wall = styled.div`
position: relative; 
height: 100vh;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
background-image: url('https://www.cdc.gov/media/dpk/diseases-and-conditions/coronavirus/images/outbreak-coronavirus-world-1024x506px.jpg');
background-size: cover;

&:before {
  content: "";
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgba(0,0,0,0.70);
}
`

function LandingPage() {

  // Hold the vaccine data.
  const [vaccineData, setVaccineData] = useState();

  // The latest articles from NYT.
  const [latestArticles, setLatestArticles] = useState();

  // Hold loading boolean.
  const [loading, setLoading] = useState(false);
  
  // Hold error text.
  const [error, setError] = useState('');

  // Get the vaccine data.
  useEffect(() => {
    setLoading(true);
    getVaccineData().then((res) => {
      setVaccineData(res);
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, [setVaccineData]);

  useEffect(() => {
    setLoading(true);
    getLatestCovidArticles().then((res) => {
      addLatestArticles(res);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, [setLatestArticles]);

  // Helper method to organize the latest COVID article information.
  const addLatestArticles = (res) => {
    let articleList = [];

    let newArticle = {};
    res.docs.forEach((article) => {
      console.log(article);
      newArticle.title = article.headline.main;
      newArticle.snippet = article.snippet;
      newArticle.publishDate = new Date(article.pub_date);

      // Handle no author provided.
      if (article.byline.person.length === 0) {
        newArticle.author = 'An Unknown Author';
      } else {
        newArticle.author = `${article.byline.person[0].firstname} ${article.byline.person[0].lastname}`;
      }

      newArticle.link = article.web_url;

      // Handle no multimedia provided.
      if (article.multimedia.length === 0) {
        newArticle.image = 'https://i.stack.imgur.com/y9DpT.jpg';
      } else {
        newArticle.image = `https://static01.nyt.com/${article.multimedia[0].url}`;
      }

      articleList.push(newArticle);
      newArticle = {};
    });

    setLatestArticles(articleList);
  };

  return (
    <>
      <LandingHeaderText>
        Welcome to the CIS 450 Final Project from Group 36!
      </LandingHeaderText>
      <Wall>
        <h1 style={{color: 'white', display: 'block', position: 'relative'}}>Analyzing Socioeconomic Impacts on COVID19</h1>
      </Wall>
      <h2 style={{marginTop: 50}}>Latest News</h2>
      <Grid>
      { latestArticles !== undefined ?
        latestArticles.map((article, index) => {
          return (
            <div className = "card" style={{textDecoration: 'none', padding: '10px'}} key={article.title} onClick={() => window.open(article.link)}>
              <div style={{width: '100%', height: '12rem'}}>
                <img style={{width: '100%', height: '12rem', objectFit: 'cover' } }src={article.image} alt="Image for article" />
              </div>
              <ArticleTitle>{article.title.length > 30 ? `${article.title.substring(0, 30)}...` : article.title}</ArticleTitle>
              <p style={{color: 'gray', fontSize: '18px'}}>{getFormattedDate(article.publishDate)} | {article.author}</p>
              <p>{article.snippet.length > 60 ? `${article.snippet.substring(0, 60)}...` : article.snippet}</p>
            </div>
          );
        }) : null
      }
      </Grid>
      { error ? <ErrorMessage message={error} /> : null }
      <TableElement>
        <TableHead>
          <TableRowElement>
            <TableHeadElement>Date</TableHeadElement>
            <TableHeadElement>State</TableHeadElement>
            <TableHeadElement>Vaccinated</TableHeadElement>
          </TableRowElement>
        </TableHead>
        <TableBody>
          
        </TableBody>
      </TableElement>
    </>
  );
}

export default LandingPage;
