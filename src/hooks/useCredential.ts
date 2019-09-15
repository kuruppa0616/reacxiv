import SInfo from 'react-native-sensitive-info';

interface CredentialActions {
	set: (username: string, password: string) => Promise<void>;
	get: () => Promise<{
		username: string;
		password: string;
	}>;
	reset: () => Promise<void>;
}

const useCredential = (): [CredentialActions] => {
	const set = async (username: string, password: string) => {
		await Promise.all([
			SInfo.setItem('username', username, {}),
			SInfo.setItem('password', password, {})
		]);
		return;
	};

	const get = async () => {
		const [username, password] = await Promise.all<string, string>([
			SInfo.getItem('username', {}),
			SInfo.getItem('password', {})
		]);
		return { username, password };
	};

	const reset = async () => {
		await Promise.all([
			SInfo.deleteItem('username', {}),
			SInfo.deleteItem('password', {})
		]);
		return;
	};
	return [{ set, get, reset }];
};

export default useCredential;
