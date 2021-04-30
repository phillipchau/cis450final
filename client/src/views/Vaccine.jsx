import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { getVaccineData, getRecentCovidVaccineTweets } from '../api/Vaccine';
import { FlexContainer } from '../components/core/Container';
import { Text, LoadingContainerText } from '../components/core/Text';
import ErrorMessage from '../components/core/Error';
import { TopMarginButton } from '../components/core/Button';
import { TwitterTweetEmbed } from 'react-twitter-embed';


const TweetContainer = styled.div`
  margin: 0 auto;
  width: 325px;
`;

const TweetIndexText = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin: 1rem 0 0 0;
`;

const TweetLoadingContainer = styled.div`
  height: 200px;
  width: 325px;
  position: relative;
  border: 1px solid rgb(196, 207, 214);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  margin: 1rem 0;
`;

function VaccinePage() {
    const [vaccine, setVaccine] = useState([])
    const [vaccineTweetIds, setVaccineTweetIds] = useState([]);
    const [vaccineTweetIndex, setVaccineTweetIndex] = useState(0);
    useEffect(() => {
      getVaccineData().then((res) => {
        setVaccine(res);
      }).catch((err) => {
        console.log(err)
      });
      
      getRecentCovidVaccineTweets().then((res) => {
        let tweetIds = [];
        res.forEach((tweet) => {
          // Only select the English-language tweets.
          if (tweet.lang === 'en') {
            tweetIds.push(tweet.id);
          }
        })
        setVaccineTweetIds(tweetIds);
      }).catch((err) => {
        console.log(err);
      });
    }, []);

    return (
      <>
        { vaccineTweetIds !== undefined ?
          <TweetContainer>
            <h4>COVID Vaccines: Twitter</h4>
            <FlexContainer>
              <TopMarginButton
                onClick={() => {
                  setVaccineTweetIndex(vaccineTweetIndex - 1);
                }}
                disabled={vaccineTweetIndex < 1}
              >
                Prev
              </TopMarginButton>
              <TweetIndexText>{vaccineTweetIndex + 1}/{vaccineTweetIds.length}</TweetIndexText>
              <TopMarginButton
                onClick={() => {
                  setVaccineTweetIndex(vaccineTweetIndex + 1);
                }}
                disabled={vaccineTweetIndex >= vaccineTweetIds.length - 1}
              >
                Next
              </TopMarginButton>
            </FlexContainer>
            <TwitterTweetEmbed
              key={vaccineTweetIds[vaccineTweetIndex] || 0}
              tweetId={vaccineTweetIds[vaccineTweetIndex] || 0}
              placeholder={<TweetLoadingContainer><LoadingContainerText>Loading...</LoadingContainerText></TweetLoadingContainer>}
              options={{ width: 325, conversation: 'none', cards: 'hidden', align: 'center' }}
            />
          </TweetContainer> : null
        }
      </>
    )
}

export default VaccinePage;