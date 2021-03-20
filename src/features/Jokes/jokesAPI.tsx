const jokesURL = 'https://v2.jokeapi.dev/';

export type jokeType = {
  category: string;
  type: string;
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
};

export type submitJokeType = {
  formatVersion: number;
  category: string;
  type: string;
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  lang: string;
};

export async function getJokes(
  category: string = 'Any',
  amount: number = 10,
  searchString: string = ''
): Promise<{ jokes: [jokeType]; status: string; message: string }> {
  let jokes = [];
  let status = 'idle';
  let message = '';

  const getURL = () =>
    searchString === ''
      ? `${jokesURL}/joke/${category}?amount=${amount}&safe-mode`
      : `${jokesURL}/joke/${category}?amount=${amount}&contains=${encodeURIComponent(
          searchString
        )}&safe-mode`;
  console.log(getURL());
  try {
    status = 'loading';
    let response = await fetch(getURL());

    if (response && response.ok) {
      let data = await response.json();
      if (data?.jokes?.length > 0 && !data.error) {
        console.log(data);
        status = 'finished';
        jokes = data.jokes;
      }
      if (data.error) {
        status = 'error';
        message = data.message;
      }
    }
  } catch (error) {
    status = 'error';
    message = JSON.stringify(error);
    console.log(error);
  }

  return { jokes, status, message };
}

export async function getInfo() {
  let info;
  try {
    let response = await fetch(`${jokesURL}/info`);

    if (response && response.ok) {
      let data = await response.json();
      if (data) {
        info = data;
      }
      console.log(data);
    }
  } catch (error) {
    // just logging the error for now
    console.log(error);
  }

  return info;
}

export function submitJoke(data: object) {
  const submitJokeURL = 'https://v2.jokeapi.dev/submit?dry-run';
  let response = '';

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  postData(submitJokeURL, data).then((res) => {
    response = res;
    console.log(response); // JSON data parsed by `data.json()` call
  });

  return response;
}
