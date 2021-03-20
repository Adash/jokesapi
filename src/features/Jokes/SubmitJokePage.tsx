import React, { useState } from 'react';
import { submitJoke } from './jokesAPI';
import { useSelector } from 'react-redux';
import { selectCategories } from './jokesSlice';
import styled from 'styled-components';

const StyledSubmitJokesComponent = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: coral;
`;

const StyledForm = styled.form`
  padding: 20px;
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledJokeInputField = styled.input`
  min-height: 200px;
  min-width: 300px;
`;

const SingleJokeText = ({
  jokeText,
  setJokeText,
}: {
  jokeText: string;
  setJokeText: (text: string) => void;
}) => {
  return (
    <>
      <label htmlFor="joke-text">Joke:</label>
      <StyledJokeInputField
        id="joke-text"
        type="text"
        value={jokeText}
        onChange={(event) => {
          setJokeText(event.target.value);
        }}
      />
    </>
  );
};

const TwoPartJokeText = ({
  setupText,
  deliveryText,
  setSetupText,
  setDeliveryText,
}: {
  setupText: string;
  deliveryText: string;
  setSetupText: (text: string) => void;
  setDeliveryText: (text: string) => void;
}) => {
  return (
    <>
      <label htmlFor="setup-text">Setup:</label>
      <StyledJokeInputField
        id="setup-text"
        type="text"
        value={setupText}
        onChange={(event) => {
          setSetupText(event.target.value);
        }}
      />

      <label htmlFor="delivery-text">Delivery:</label>
      <StyledJokeInputField
        id="setup-text"
        type="text"
        value={deliveryText}
        onChange={(event) => {
          setDeliveryText(event.target.value);
        }}
      />
    </>
  );
};

export function SubmitJokePage() {
  const [category, setCategory] = useState('Any');
  const [jokeType, setJokeType] = useState('single');
  const [jokeText, setJokeText] = useState('');
  const [setupText, setSetupText] = useState('');
  const [deliveryText, setDeliveryText] = useState('');
  const categories = useSelector(selectCategories);

  const onJokeSubmit = (event: any) => {
    event.preventDefault();
    const newJoke =
      jokeType === 'single'
        ? {
            formatVersion: 3,
            category: 'Misc',
            type: 'single',
            joke: 'A horse walks into a bar...',
            flags: {
              nsfw: false,
              religious: false,
              political: false,
              racist: false,
              sexist: false,
              explicit: false,
            },
            lang: 'en',
          }
        : {
            formatVersion: 3,
            category: category,
            type: 'twopart',
            setup: setupText,
            delivery: deliveryText,
            flags: {
              nsfw: false,
              religious: false,
              political: false,
              racist: false,
              sexist: false,
              explicit: false,
            },
            lang: 'en',
          };
    submitJoke(newJoke);
  };

  return (
    <StyledSubmitJokesComponent>
      <p>submit jokes</p>
      <StyledForm onSubmit={onJokeSubmit}>
        {jokeType === 'single' ? (
          <SingleJokeText jokeText={jokeText} setJokeText={setJokeText} />
        ) : (
          <TwoPartJokeText
            setupText={setupText}
            deliveryText={deliveryText}
            setSetupText={setSetupText}
            setDeliveryText={setDeliveryText}
          />
        )}
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          {categories.length !== 0
            ? categories.map((category: string) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
            : null}
        </select>
        <select
          value={jokeType}
          onChange={(event) => {
            setJokeType(event.target.value);
          }}
        >
          <option value="single">Single</option>
          <option value="twopart">Two-part</option>
        </select>
        <button type="submit">submit</button>
      </StyledForm>
    </StyledSubmitJokesComponent>
  );
}
