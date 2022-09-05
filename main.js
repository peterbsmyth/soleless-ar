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
  const key = Object.keys(cards[0]).find((key) => key.includes('view'));
  const viewId = cards[0][key][0].id;
  const viewRequest = await fetch(
    `https://api.myth.software/soleless/views/${viewId}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  const { output } = await viewRequest.json();
  document.querySelector('#card').setAttribute('src', output);
  document.querySelector('#card').play();
};
run();
