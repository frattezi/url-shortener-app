import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';

interface ShortenUrlResponse {
	shortenedURL: string
	error: string
}

function ShortenerForm(props: RouteComponentProps) {
	const [url, setUrl] = useState<string>('');
	const [shortenedUrl, setShortenedUrl] = useState<string>('');
	const [error, setError] = useState<string>('');


	const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value
		setUrl(value)
	}
	const onSubmit = async () => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}shorten?url=${url}`)
		const responseBody = await response.json() as ShortenUrlResponse
		const { shortenedURL: responseUrl, error } = responseBody
		if (error) {
			return setError(error)
		}

		setShortenedUrl(responseUrl)
	}

	return (
		<div className="App" style={{
			margin: "auto",
			width: "50 %",
			justifyContent: "center",
			alignItems: "center",
			display: "flex",
			flexDirection: "column"
		}}>
			<header className="App-header">
				<h1 style={{
					font: "140 49px asap,arial",
					color: "#0186da",
					textShadow: "0 2px 2px #ddd;",
					letterSpacing: "-1px"
				}}>
					PodCodar Short Url - Deployado automaticamente!
				</h1>
			</header>
			<body style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
				<h1>Copie a URL para ser reduzida</h1>
				<div>
					<input type="text" value={url} onChange={onInputChange} placeholder='Insira a URL aqui' />
					<button onClick={onSubmit} style={{ marginLeft: "5px" }}>Reduzir URL</button>
				</div>
			</body>
			{error && <div className='error'>Ocorreu um erro ao tentar processar sua URL</div>}
			{shortenedUrl && <div>Sua URL está pronta: {`${process.env.REACT_APP_DOMAIN}${shortenedUrl}`}</div>}
		</div >
	);
}

export default ShortenerForm;
