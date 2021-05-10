import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import getFormattedDate from '../util/Utility';
import ErrorMessage from '../components/core/Error';
import axios from 'axios';

const Star=styled.button`
    width:15%;
    margin-bottom:10px;
`
const ImageContainer = styled.div`
  width: '100%';
  height: '12rem';
`;

const Image = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: cover;
`;

const Description = styled.p`
  color: gray;
  font-size: 18px;
`;

const ArticleTitle = styled.p`
  font-weight: 700;
  font-size: 28px;
  margin: 0.25rem 0 0 0;
  &:hover {
    color: ${({ theme }) => theme.colors.darkBlue};
    cursor: pointer;
  }
`;

function ArticleWrapper({user, article, type, update}) {
    //tracks whether the article is currently liked
    const [articleLike, setArticleLike] = useState(false);

    useEffect(() => {
      if (user) {
        setArticleLike(user.articles.includes(article._id))
      }
    },[user])

    let buttonType = ''
    if (articleLike) {
      buttonType = "btn btn-primary"
    } else {
      buttonType = "btn btn-outline-primary"
    }

    const buttonClick = async () => {
      if (articleLike) {
        buttonType = "btn btn-outline-primary"
        const idx = user.articles.indexOf(article._id)
        axios.post('http://localhost:8081/removearticle', { username: user.username, index: idx })
          .then((data) => {
            update(true)
          })
          .catch((err) => {
            console.log(err)
          });
      } else {
        buttonType = "btn btn-primary"
        axios.post('http://localhost:8081/addarticle', { username: user.username, article: article._id })
          .then((data) => {
            update(true)
          })
          .catch((err) => {
            console.log(err)
          })
      }
      setArticleLike(!articleLike)
    }

    return (
      <>
        <div className = "card" style={{textDecoration: 'none', padding: '10px'}} key={article.title}>
         {type !== 'favorite' && (
          <Star onClick={buttonClick} type="button" className={buttonType}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
            </svg>
          </Star>
         )}
          <ImageContainer >
            <Image src={article.image} alt="Image for article" />
          </ImageContainer>
          <ArticleTitle onClick={() => window.open(article.link)}>{article.title.length > 30 ? `${article.title.substring(0, 30)}...` : article.title}</ArticleTitle>
          <Description>{getFormattedDate(article.publishDate)} | {article.author}</Description>
          <p>{article.snippet.length > 60 ? `${article.snippet.substring(0, 60)}...` : article.snippet}</p>
        </div>
      </>
    )
}
export default ArticleWrapper; 