import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { getVaccineData } from '../api/Vaccine';
import { getLogin, getUser } from '../api/Home';
import ErrorMessage from '../components/core/Error';
import { Text, LandingHeaderText } from '../components/core/Text';
import { useHistory, Link } from 'react-router-dom'
import ArticleWrapper from './ArticleWrapper'
import {
  TableElement,
  TableHead,
  TableBody,
  TableRowElement,
  TableHeadElement,
  TableDataElement,
} from '../components/core/Table';
import { getLatestCovidArticles, getCovidArticle } from '../api/NYTData';

const Grid = styled.div`
margin-top: 20px;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
grid-gap: 2rem;
`

const Wall = styled.div`
  position: relative; 
  margin-left: -6%;
  height: 100vh;
  width: 112%;
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
`;

const WallText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function LandingPage() {
  const history = useHistory()
  // Hold the vaccine data.
  const [vaccineData, setVaccineData] = useState();

  // The latest articles from NYT.
  const [latestArticles, setLatestArticles] = useState();

  // Hold loading boolean.
  const [loading, setLoading] = useState(false);
  
  // Hold error text.
  const [error, setError] = useState('');

  //tracks the user logged in 
  const [login, setLogin] = useState()

  //tracks the user information
  const [user, setUser] = useState()


  //boolean to update liked articles
  const [like, setLike] = useState(false)

  //initially load who is logged in 
  useEffect(() => {
    getLogin().then((res) => {
      console.log(res)
      if (!res) {
        history.push('/login')
      } else {
        setLogin(res);
        getUser(res).then((response) => {
          setUser(response)
        }).catch((e) => {
          setError(e.message)
        });
      }
    }).catch((err) => {
      setError(err.message);
    });
    setLike(false)
  }, [like])
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
    console.log(res)
    let articleList = [];

    let newArticle = {};
    res.docs.forEach((article) => {
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

      newArticle._id = article._id

      articleList.push(newArticle);
      newArticle = {};
    });

    setLatestArticles(articleList);
  };

  return (
    <>
      <Wall>
        <WallText>
          <h1 style={{color: 'white'}}>Analyzing Socioeconomic Impacts on COVID19</h1>
          {user !== undefined ? 
            <h3 style={{color: 'white'}}>
              Welcome {user.name} to the CIS 450 Final Project from Group 36!
            </h3> 
            : 
            <h3 style={{color: 'white'}}>
              Welcome to the CIS 450 Final Project from Group 36!
            </h3>
          }
          <br></br>
          <h3 style={{color: 'white'}}>This is some subtext. This is the longest the subtext can go before wrapping around.</h3>
        </WallText>
      </Wall>
      <h2 style={{marginTop: 50}}>Latest News</h2>
      <Grid>
      { latestArticles !== undefined ?
        latestArticles.map((article, index) => {
          return (
            <ArticleWrapper user={user} article={article} update={setLike} type="regular" />
          ); 
        }) : null
      }
      </Grid>
        
      { error ? <ErrorMessage message={error} /> : null }
    </>
  );
}

export default LandingPage;
