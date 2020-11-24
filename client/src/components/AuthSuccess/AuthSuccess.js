import React, {useEffect} from 'react';

export default function AuthSuccess() {
	useEffect(() => {
		window.opener.open('/', '_self');
		window.opener.focus();
		window.close();
	}, []);
	return <div/>;
}