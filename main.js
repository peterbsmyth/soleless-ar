const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const code = params.code;

const request = fetch(`https://api.peterbsmyth.com/soleless/card/${code}/ar-url`, {
  method: 'GET',
  headers: {
    'content-type': 'application/json'
  }
});

request
  .then(response => {
    if (response.status !== 200) {
      alert("Sorry, something went wrong. Please try again later. Did you use a valid code?");
      return; 
    }
    return response.json();
    
  })
  .then(({ url }) => {
    document.querySelector('#card').setAttribute('src', url);
  })
  .catch(() => {
    document.querySelector('#card').setAttribute('src', '/warning.png');
  });