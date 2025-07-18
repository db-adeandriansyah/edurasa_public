
export function getValueByPath(obj: any, path: string) {
    if(path==="") return "";
    
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    
    // versi path satu
    // if (path === "") return "";

    // const parts = path.split('.');

    // let current: any = obj;

    // for (const part of parts) {
    //     if (Array.isArray(current)) {
    //     current = current.map(item => item?.[part]).filter(v => v !== undefined);
    //     } else if (typeof current === 'object' && current !== null) {
    //     current = current[part];
    //     } else {
    //     return undefined;
    //     }
    // }

    // return current;

    // versi path barsarang (nested):
    // if (!path) return "";

    // // Regex untuk memecah path seperti: users[0].hobbies[1].name
    // const pathParts = path.match(/([^[.\]]+)|\[(\d+)\]/g);

    // if (!pathParts) return undefined;

    // let current: any = obj;

    // for (const part of pathParts) {
    //     if (current === undefined || current === null) return undefined;

    //     if (part.startsWith('[')) {
    //     // array index
    //     const index = parseInt(part.slice(1, -1), 10);
    //     if (!Array.isArray(current)) return undefined;
    //     current = current[index];
    //     } else {
    //     // object key
    //     current = current[part];
    //     }
    // }

    // return current;
}
export function setValueByPath(obj: any, path: string, value: any): any {
    // if (!path.includes('.')) {
    //     // Jika tidak ada nested, langsung set
    //     return { ...obj, [path]: value };
    // }

    // const keys = path.split('.');
    // const newObj = { ...obj };
    // let temp = newObj;

    // for (let i = 0; i < keys.length; i++) {
    //     const key = keys[i];

    //     // Jika sudah di akhir path, set value
    //     if (i === keys.length - 1) {
    //     temp[key] = value;
    //     } else {
    //     // Jika belum ada nested objek, buatkan
    //     temp[key] = temp[key] && typeof temp[key] === 'object' ? { ...temp[key] } : {};
    //     temp = temp[key];
    //     }
    // }

    // return newObj;
    const keys = path.split('.');
    return keys.reduceRight((acc, key, idx) => {
        if (idx === keys.length - 1) {
        return { [key]: value };
        }
        return { [key]: { ...(getNested(obj, keys.slice(0, idx + 1)) || {}), ...acc } };
    }, {});
}

export function getNested(obj: any, keys: string[]): any {
    return keys.reduce((acc, key) => acc?.[key], obj);
}
