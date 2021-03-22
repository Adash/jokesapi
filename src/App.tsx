import React, { useEffect, FunctionComponent } from 'react';
import { Router, Link, RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { Jokes } from './Jokes/Jokes';
import { SubmitJokePage } from './Jokes/SubmitJokePage';
import { getInfo } from './Jokes/jokesAPI';
import { useDispatch } from 'react-redux';
import { setTotalCount, setCategories } from './Jokes/jokesSlice';

// the wrapper below was implemented because typescript was complaining about 'path' prop on the component
type Props = { component: FunctionComponent } & RouteComponentProps;
const Route: FunctionComponent<Props> = ({ component: Component, ...rest }) => (
  <Component {...rest} />
);

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  text-align: center;
`;

const Header = styled.header`
  z-index: 10;
  width: 100vw;
  height: 60px;
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #1a759f;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding-left: 10px;
  font-size: 18px;
  color: white;
  cursor: pointer;

  :hover {
    color: #184e77;
  }
`;

const Main = styled.div`
  align-items: center;
`;

function App() {
  const dispatch = useDispatch();

  // we are loading categories here so they can be used in both Jokes and SubmitJokePage components
  useEffect(() => {
    getInfo().then((info) => {
      if (info?.jokes?.totalCount) {
        dispatch(setTotalCount(info.jokes.totalCount));
      }
      if (info?.jokes?.categories?.length !== 0) {
        dispatch(setCategories(info.jokes.categories));
      }
    });
    // initial load
    // run only once
  }, []);

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
