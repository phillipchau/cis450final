import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { getLogin, getUser } from '../api/Home';
import { useHistory } from 'react-router-dom'
import { Text, LandingHeaderText } from '../components/core/Text';
import ErrorMessage from '../components/core/Error';
import ArticleWrapper from './ArticleWrapper'
import { getCovidArticle } from '../api/NYTData';

const Grid = styled.div`
margin-top: 20px;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
grid-gap: 2rem;
`


function UserPage() {
    //all favorite articles
    const [favArticles, setFavArticles] = useState([]);
    //tracks the user information
    const [user, setUser] = useState()
    //boolean to update liked articles
    const [like, setLike] = useState(false)
    // Hold error text.
    const [error, setError] = useState('');

    const history = useHistory()
    //initially load who is logged in 
    useEffect(() => {
      getLogin().then((res) => {
        console.log(res)
        if (!res) {
          history.push('/login')
        } else {
          getUser(res).then((response) => {
            setUser(response)
            getCovidArticle(response.articles)
              .then(data => {
                addFavoriteArticles(data)
              })
          }).catch((e) => {
            setError(e.message)
          });
        }
      }).catch((err) => {
        setError(err.message);
      });
      setLike(false)
    }, [like])

    const addFavoriteArticles = (articles) => {
        let articleList = [];
    
        let newArticle = {};
        articles.forEach(res => {
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
        })
    
        setFavArticles(articleList);
      }

    return (
        <>
            <h2 style={{marginTop: 50}}>My Favorite News</h2>
      
            {favArticles !== undefined && favArticles.length > 0 ?
            (
              <Grid>
                {
                  favArticles.map((article, index) => {
                    return (
                      <ArticleWrapper user={user} article={article} update={setLike} type="favorite" />
                    ); 
                  })
                }
              </Grid>
            ) : <Text>You don't have any favorited news articles yet!</Text>
            }
            { error ? <ErrorMessage message={error} /> : null }
        </>
    )
}
export default UserPage; 