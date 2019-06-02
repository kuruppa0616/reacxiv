import { useState } from 'react';

const initialKeys: Set<number> = new Set();

const useIllustKeys = () => {
	const [keys, setKeys] = useState(initialKeys);

	const addKeys = (newKeys: number[]) => {
		setKeys(keys => new Set([...keys, ...newKeys]));
	};

	const clearKeys = () => {
		setKeys(new Set());
	};

	return { keys, addKeys, clearKeys };
};

export default useIllustKeys;
