import { useEffect, useRef } from 'react';

export function useCleanupFieldData(
    currentKeys: string[],
    setCurrentData: (updater: (prev: Record<string, any>) => Record<string, any>) => void
    ) {
    const prevFieldKeysRef = useRef<string[]>([]);

    useEffect(() => {
        const prevKeys = prevFieldKeysRef.current;
        const removedKeys = prevKeys.filter((key) => !currentKeys.includes(key));

        if (removedKeys.length > 0) {
        setCurrentData((prev) => {
            const newData = { ...prev };
            removedKeys.forEach((key) => {
            delete newData[key];
            });
            return newData;
        });
        }

        prevFieldKeysRef.current = currentKeys;
    }, [currentKeys, setCurrentData]);
}
