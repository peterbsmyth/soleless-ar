const run = async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const code = params.code;

  if (!code) {
    document.querySelector('#card').play();
    return;
  }

  const codeParam = {
    filter: {
      property: 'code',
      rich_text: {
        contains: code,
      },
    },
  };

  const cardsRequest = await fetch(
    `https://api.myth.software/soleless/cards?` +
      new URLSearchParams({
        where: JSON.stringify(codeParam),
      }),
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  const cards = await cardsRequest.json();
  const key = Object.keys(cards[0]).find((key) => key.includes('animation'));
  const animationId = cards[0][key][0].id;

  const animationRequest = await fetch(
    `https://api.myth.software/soleless/animations/${animationId}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  const { animation } = await animationRequest.json();
  document.querySelector('#card').setAttribute('src', animation);
  document.querySelector('#card').play();
};
run();
