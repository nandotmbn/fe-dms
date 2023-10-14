const cookiesHandler = {
	setCookie: (name: string, value: string, days: number) => {
		if(!document) return null;
		let expires = "";
		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "") + expires + "; path=/";
	},

	getCookie: (name: string) => {
		if(!document) return null;
		let nameEQ = name + "=";
		const ca = document.cookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === " ") c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	},

	deleteCookie: (name: string) => {
		if(!document) return null;
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
	},
};

export default cookiesHandler;
