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
      newArticle.title = article.headline.main;
      newArticle.snippet = article.snippet;
      newArticle.publishDate = new Date(article.pub_date);
      newArticle.author = `${article.byline.person[0].firstname} ${article.byline.person[0].lastname}`;
      newArticle.link = article.web_url;
      newArticle.image = `https://static01.nyt.com/${article.multimedia[0].url}`;
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
      { latestArticles !== undefined ?
        latestArticles.map((article, index) => {
          return (
            <ArticleContainer
              key={article.title}
              onClick={() => window.open(article.link)}
            >
              <ImageContainer>
                <Image src={article.image} alt="Image for the Article" />
              </ImageContainer>
              <DescriptionContainer>
                <ArticleTitle>{article.title.length > 30 ? `${article.title.substring(0, 30)}...` : article.title}</ArticleTitle>
                <ArticlePublishDate>{getFormattedDate(article.publishDate)}</ArticlePublishDate>
                <ArticleSnippet>{article.snippet.length > 60 ? `${article.snippet.substring(0, 60)}...` : article.snippet}</ArticleSnippet>
                <ArticleAuthor>By {article.author}</ArticleAuthor>
              </DescriptionContainer>
            </ArticleContainer>
          );
        }) : null
      }
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
          {vaccineData === undefined ?
            (
              loading ? (
                <TableRowElement>
                  <TableDataElement>Loading...</TableDataElement>
                  <TableDataElement>Loading...</TableDataElement>
                  <TableDataElement>Loading...</TableDataElement>
                </TableRowElement>
              ) : null
            )
            :
            vaccineData.map((vaccine, index) => (
              <TableRowElement key={index}>
                <TableDataElement>{vaccine.Date}</TableDataElement>
                <TableDataElement>{vaccine.State}</TableDataElement>
                <TableDataElement>{vaccine.Vaccinated}</TableDataElement>
              </TableRowElement>
            ))
          }
        </TableBody>
      </TableElement>
    </>
  );
}

export default LandingPage;
