### Frontend for JokesAPI build with React.

### additional packages and tools used: Redux Toolkik, Reach Router, Styled Components and TypeScript

### Overview

The App component is wrapping everything style-wise and handling routing.

There are two pages split into two separate components: Jokes and SubmitJokePage.

The App component loads the total count and categories data from the 'info' endpoint
and stores it in the Redux store (so it can be shared between the two components mentioned above)

In the Jokes component/page the list of jokes if fetched from the API and stored in the Redux store.
Elements of the state which are used only within that component are not stored in Redux but in the component's state (using useState): searchString, category and errorMessage.

The SubmitJokePage gets the categories list from Redux but stores the rest of the variables within the component

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
