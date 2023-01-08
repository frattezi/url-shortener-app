import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { RouteComponentProps } from '@reach/router';

interface IShortenerRedirect extends RouteComponentProps {
  shortUrl?: string;
}
interface GetUrlResponse {
  originalURL: string
  error: string
}

function ShortenerRedirect({ shortUrl }: IShortenerRedirect) {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function redirectUser() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}get?shortenedURL=${shortUrl}`);
      const result = await response.json() as GetUrlResponse
      if (result.error || !result.originalURL) {
        console.log("here")
        setError("URL Invalida")
        setIsLoading(false)
        return
      }
      window.location.replace(`https://${result.originalURL}`)
    };
    redirectUser();
  }, [shortUrl])

  return (
    <div className="ShortenerRedirect">
      <body style={{
        margin: "auto",
        width: "50 %",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column"
      }}>
        <h1>Aguarde o redirecionamento</h1>
        {isLoading && <ReactLoading type={'spin'} color={'purple'} height={300} width={200} />}
        {error && <div>{error}</div>}
      </body>
    </div>
  );
}

export default ShortenerRedirect;
