import React, { useState, useEffect } from 'react';
import { getInfo, getJokes, jokeType } from './jokesAPI';
import styled from 'styled-components';

const StyledJokesComponent = styled.div`
  background-color: coral;
`;

const StyledJokesList = styled.div`
  width: 600px;
  background-color: greenyellow;
  color: darkgreen;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledJoke = styled.div`
  width: 400px;
  list-style: none;
  background-color: lightgreen;
  padding: 15px;
  margin-bottom: 10px;
`;

const TwoPartJoke = ({ joke }: { joke: jokeType }) => (
  <ul>
    <li>{joke.setup}</li>
    <li> ... </li>
    <li>{joke.delivery}</li>
    <li>Category: {joke.category}</li>
    <li>Type: {joke.type}</li>
  </ul>
);

const SinglePartJoke = ({ joke }: { joke: jokeType }) => (
  <ul>
    <li>{joke.joke}</li>
    <li>Category: {joke.category}</li>
    <li>Type: {joke.type}</li>
  </ul>
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
  const [totalCount, setTotalCount] = useState(0);
  const [category, setCategory] = useState('Any');
  const [amount, setAmount] = useState(10);
  const [jokesList, setJokesList] = useState<[jokeType] | []>([]);
  const [categories, setCategories] = useState<[string] | []>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getInfo().then((info) => {
      if (info?.jokes?.totalCount) {
        setTotalCount(info.jokes.totalCount);
      }
      // consider replacing the if statement with tenary operator - ? :
      if (info?.jokes?.categories?.length !== 0) {
        setCategories(info.jokes.categories);
        console.log(categories);
      }
    });
    // initial load
    fetchJokes();
    // run only once
  }, []);

  useEffect(() => {
    fetchJokes(category, amount, searchString);
  }, [searchString]);

  const fetchJokes = (
    category?: string,
    amount?: number,
    searchString?: string
  ) => {
    getJokes(category, amount, searchString).then(
      ({ jokes, status, message }) => {
        if (status === 'finished') {
          //reset message
          setErrorMessage('');
          setJokesList(jokes);
        }
        if (status === 'error') {
          // reset jokes list
          setJokesList([]);
          setErrorMessage(message);
        }
      }
    );
  };

  const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    fetchJokes(event.target.value);
  };

  return (
    <StyledJokesComponent>
      <p>Total number of jokes: {totalCount}</p>
      <p>
        {/* consider extracting this component and reusing it (used in SubmitJokePage) */}
        Select Joke category:
        <select value={category} onChange={onCategoryChange}>
          {categories.length !== 0
            ? categories.map((category: string) => (
                <option value={category}>{category}</option>
              ))
            : null}
        </select>
      </p>
      <label htmlFor="searchInput">search for jokes: </label>
      <input
        type="text"
        id="searchInput"
        value={searchString}
        onChange={(event) => {
          setSearchString(event.target.value);
        }}
      />

      <StyledJokesList>
        {errorMessage.length ? <p>{errorMessage}</p> : null}
        {jokesList?.length !== 0
          ? jokesList.map((joke: jokeType) => (
              <SingleJoke key={joke.id} joke={joke} />
            ))
          : null}
      </StyledJokesList>
    </StyledJokesComponent>
  );
}
