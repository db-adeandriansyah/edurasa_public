// kode dari ChatGpt: https://chatgpt.com/share/6867df37-7d58-8010-ae72-ce64fd9b629e

/**
    Ubah semua properti (termasuk nested) menjadi optional
 *  Contoh:
    interface User {
    id: number;
    name: string;
    profile: {
        address: string;
        phone: string;
    };
    }

    const user: DeepPartial<User> = {
    profile: {
        phone: "08123",
    },
    }; // ✅ valid

 */ 
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepPartial<T[P]>
    : T[P];
};

/**
 * Hapus semua readonly modifier dari T;
 * contoh:
 * interface ReadOnlyUser {
        readonly id: number;
        readonly name: string;
        }

        type EditableUser = Mutable<ReadOnlyUser>;
        Sekarang id dan name bisa diubah
 */
export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

// Tolak properti tambahan selain yang ada di Shape:
/**
 * type Shape = { id: number };
    const valid: Exact<{ id: number }, Shape> = { id: 1 };        // ✅
    const invalid: Exact<{ id: number; extra: string }, Shape> = {
    id: 1,
    extra: "x",
    }; // ❌ Error: extra property not allowed

 */
export type Exact<T, Shape> = T extends Shape
  ? Exclude<keyof T, keyof Shape> extends never
    ? T
    : never
  : never;

// Buat properti K di T menjadi opsional
export type WithOptional<T, K extends keyof T> =
  Omit<T, K> & Partial<Pick<T, K>>;

// Hanya properti K yang wajib, sisanya opsional
export type RequiredOnly<T, K extends keyof T> =
  Partial<T> & Required<Pick<T, K>>;

// Alias untuk versi lebih readable
export type MakeOptional<T, K extends keyof T> =
  Omit<T, K> & Partial<Pick<T, K>>;

export type MakeRequired<T, K extends keyof T> =
  Omit<T, K> & Required<Pick<T, K>>;

// Hapus null dan undefined dari properti
export type NonNullableProps<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

// Ambil properti yang memiliki tipe tertentu
export type PickByValue<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K];
};

// Gabungkan dua tipe, U menimpa T jika ada konflik
export type Merge<T, U> = Omit<T, keyof U> & U;

// Ubah union jadi intersection
export type UnionToIntersection<U> =
  (U extends any ? (x: U) => any : never) extends (x: infer R) => any
    ? R
    : never;
