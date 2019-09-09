import { useState } from 'react';

const initialKeys: Set<number> = new Set();

const useIllustKeys = (): [Set<number>, (newKeys: number[]) => void, () => void] => {
	const [keys, setKeys] = useState(initialKeys);

	const addKeys = (newKeys: number[]): void => {
		setKeys(keys => new Set([...keys, ...newKeys]));
	};

	const clearKeys = (): void => {
		setKeys(new Set());
	};

	return [keys, addKeys, clearKeys];
};

export default useIllustKeys;
