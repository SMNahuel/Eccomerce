import React, {useEffect} from 'react';

export default function AuthSuccess() {
	useEffect(() => {
		const url = '/welcome';
		window.opener.open(url, '_self');
		window.opener.focus();
		window.close();
	}, []);
	return <div/>;
}