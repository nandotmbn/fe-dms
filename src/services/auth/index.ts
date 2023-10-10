import { login } from "./login.auth";
import { me } from "./me.auth";
import { register } from "./register.auth";
import { sendSSO } from "./sso.auth";

const Auth = {
	me,
	login,
	register,
	sendSSO
};

export { Auth };
