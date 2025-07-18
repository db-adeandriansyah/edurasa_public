import { useEffect, useRef } from 'react';

export const useCleanupFieldData = (
  currentKeys: string[],
  setCurrentData: React.Dispatch<React.SetStateAction<Record<string, any>>>
) => {
  const previousKeysRef = useRef<string[]>([]);

  useEffect(() => {
    const removedKeys = previousKeysRef.current.filter(
      (key) => !currentKeys.includes(key)
    );

    if (removedKeys.length > 0) {
      setCurrentData((prev) => {
        const updated = { ...prev };
        let changed = false;
        removedKeys.forEach((key) => {
          if (updated.hasOwnProperty(key)) {
            delete updated[key];
            changed = true;
          }
        });

        return changed ? updated : prev;
      });
    }

    previousKeysRef.current = currentKeys;
  }, [currentKeys, setCurrentData]);
};

// import { useEffect, useRef } from 'react';

// export function useCleanupFieldData( 
//     currentKeys: string[], 
//     setCurrentData: (updater: (prev: Record<string, any>) => Record<string, any>) => void ) {
//         const prevFieldKeysRef = useRef<string[]>([]);

//     useEffect(
//         () => {
//             const prevKeys = prevFieldKeysRef.current;
//             const removedKeys = prevKeys.filter((key) => !currentKeys.includes(key));
            
//             if (removedKeys.length > 0) {
//             setCurrentData((prev) => {
//                 const newData = { ...prev };
//                 console.log('newData before remove',newData);
//                 removedKeys.forEach((key) => {
//                         delete newData[key];
//                 });
//                 return newData;
//             });
//             }

//             prevFieldKeysRef.current = currentKeys;
//         }, 
//         [currentKeys]
//     );
// }
