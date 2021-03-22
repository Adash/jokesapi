import React, { useState, useEffect } from 'react';
import { getJokes, jokeType } from './jokesAPI';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTotalCount,
  selectJokesList,
  selectCategories,
  setJokesList,
} from './jokesSlice';
import styled from 'styled-components';

const StyledJokesComponent = styled.div`
  top: 60px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const StyledControls = styled.div`
  width: 100%;
  background-color: #168aad;
  color: #d9ed92;
  padding-top: 7px;

  div {
    padding-bottom: 7px;
  }
`;

export const StyledSelect = styled.select`
  border: none;
  border-radius: 3px;
  padding: 2px 3px;
`;

export const StyledInput = styled.input`
  border: none;
  border-radius: 3px;
  padding: 2px 3px;
`;

const StyledJokesList = styled.div`
  width: 100%;
  background-color: #d9ed92;
  color: #ecf3f3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  p {
    margin-bottom: 3px;
  }
`;

const StyledJoke = styled.div`
  width: 400px;
  list-style: none;
  background-color: #34a0a4;
  padding: 15px;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  padding: 30px;
  color: #803b3b;
  font-size: 18px;
`;

const TwoPartJoke = ({ joke }: { joke: jokeType }) => (
  <div>
    <p>Category: {joke.category}</p>
    <p>Type: {joke.type}</p>
    <hr />
    <p>{joke.setup}</p>
    <p> . </p>
    <p> .. </p>
    <p> ... </p>
    <p>{joke.delivery}</p>
  </div>
);

const SinglePartJoke = ({ joke }: { joke: jokeType }) => (
  <div>
    <p>Category: {joke.category}</p>
    <p>Type: {joke.type}</p>
    <hr />
    <p>{joke.joke}</p>
  </div>
);

const SingleJoke = ({ joke }: { joke: jokeType }) => {
  if (joke.type === 'single') {
    return (
      <StyledJoke>
        <SinglePartJoke joke={joke} />
      </StyledJoke>
    );
  } else {
    return (
      <StyledJoke>
        <TwoPartJoke joke={joke} />
      </StyledJoke>
    );
  }
};

export function Jokes() {
  const [searchString, setSearchString] = useState('');
  const [category, setCategory] = useState('Any');
  const [errorMessage, setErrorMessage] = useState('');
  const totalCount = useSelector(selectTotalCount);
  const jokesList = useSelector(selectJokesList);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchJokes(category, searchString);
  }, [searchString]);

  const fetchJokes = (category?: string, searchString?: string) => {
    getJokes(category, searchString).then(({ jokes, status, message }) => {
      if (status === 'finished') {
        //reset message
        setErrorMessage('');
        dispatch(setJokesList(jokes));
      }
      if (status === 'error') {
        // reset jokes list
        dispatch(setJokesList([]));
        setErrorMessage(message);
      }
    });
  };

  const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // reset search string in order to prevent unpredictable states
    setSearchString('');
    setCategory(event.target.value);
    fetchJokes(event.target.value);
  };

  return (
    <StyledJokesComponent>
      <StyledControls>
        <div>Total number of jokes: {totalCount}</div>
        <div>
          {/* consider extracting this component and reusing it (used in SubmitJokePage) */}
          Select Joke category:
          <StyledSelect value={category} onChange={onCategoryChange}>
            {categories.length !== 0
              ? categories.map((category: string) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))
              : null}
          </StyledSelect>
        </div>
        <div>
          <label htmlFor="searchInput">search for jokes: </label>
          <StyledInput
            type="text"
            id="searchInput"
            value={searchString}
            onChange={(event) => {
              setSearchString(event.target.value);
            }}
          />
        </div>
      </StyledControls>
      <StyledJokesList>
        {errorMessage.length ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : null}
        {jokesList?.length !== 0
          ? jokesList.map((joke: jokeType) => (
              <SingleJoke key={joke.id} joke={joke} />
            ))
          : null}
      </StyledJokesList>
    </StyledJokesComponent>
  );
}
