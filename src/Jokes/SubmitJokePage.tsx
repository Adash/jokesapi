import React, { useState } from 'react';
import { submitJoke, submitJokeType } from './jokesAPI';
import { useSelector } from 'react-redux';
import { selectCategories } from './jokesSlice';
import styled from 'styled-components';
import { StyledSelect } from './Jokes';

const StyledSubmitJokesComponent = styled.div`
  top: 60px;
  position: relative;
  width: 100%;
  background-color: #168aad;
  color: #d9ed92;

  h2 {
    padding: 20px;
    font-size: 22px;
  }
`;

const StyledForm = styled.form`
  padding: 20px;
  background-color: lightblue;
  color: #2b3602;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledJokeInputField = styled.textarea`
  border: none;
  border-radius: 3px;
  padding: 2px 3px;
  min-height: 200px;
  min-width: 300px;
  margin-bottom: 15px;
  margin-left: 5px;
  margin-right: 5px;
`;

const StyledJokeWrapper = styled.div`
  position: relative;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  label {
    position: absolute;
    top: -18px;
  }
`;

const StyledOptionsWrapper = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 6px 12px;
  font-size: 18px;
  background-color: #1a759f;
  color: #d9ed92;
`;

const SingleJokeText = ({
  jokeText,
  setJokeText,
}: {
  jokeText: string;
  setJokeText: (text: string) => void;
}) => {
  return (
    <StyledJokeWrapper>
      <label htmlFor="joke-text">Joke text:</label>
      <StyledJokeInputField
        id="joke-text"
        value={jokeText}
        onChange={(event) => {
          setJokeText(event.target.value);
        }}
      />
    </StyledJokeWrapper>
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
    <StyledJokeWrapper>
      <div>
        <label htmlFor="setup-text">Setup:</label>
        <StyledJokeInputField
          id="setup-text"
          value={setupText}
          onChange={(event) => {
            setSetupText(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="delivery-text">Delivery:</label>
        <StyledJokeInputField
          id="setup-text"
          value={deliveryText}
          onChange={(event) => {
            setDeliveryText(event.target.value);
          }}
        />
      </div>
    </StyledJokeWrapper>
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
    const newJoke: submitJokeType =
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
      <h2>Submit new Joke</h2>
      <StyledForm onSubmit={onJokeSubmit}>
        <StyledOptionsWrapper>
          <StyledSelect
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
          </StyledSelect>
          <StyledSelect
            value={jokeType}
            onChange={(event) => {
              setJokeType(event.target.value);
            }}
          >
            <option value="single">Single</option>
            <option value="twopart">Two-part</option>
          </StyledSelect>
        </StyledOptionsWrapper>
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

        <Button type="submit">submit</Button>
      </StyledForm>
    </StyledSubmitJokesComponent>
  );
}
