import React, { FunctionComponent } from 'react';
import { Router, Link, RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { Jokes } from './features/Jokes/Jokes';
import { SubmitJokePage } from './features/Jokes/SubmitJokePage';

// the wrapper below was implemented because typescript was complaining about 'path' prop on the component
type Props = { component: FunctionComponent } & RouteComponentProps;
const Route: FunctionComponent<Props> = ({ component: Component, ...rest }) => (
  <Component {...rest} />
);

const StyledApp = styled.div`
  text-align: center;
`;

const Header = styled.header`
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: teal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding-left: 10px;
  font-size: 18px;
  color: white;
  cursor: pointer;
`;

const Main = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <StyledApp>
      <Header className="App-header">
        <StyledLink to="/">JokesAPI</StyledLink>
        <StyledLink to="/addnew">Add New</StyledLink>
      </Header>
      <Main>
        <Router>
          <Route component={Jokes} path="/" />
          <Route component={SubmitJokePage} path="/addnew" />
        </Router>
      </Main>
    </StyledApp>
  );
}

export default App;
