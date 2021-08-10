type Awaited<P> = P extends Promise<infer Inner> ? Inner : unknown;

type T0 = Awaited<Promise<string>>; // expected string
type T1 = Awaited<Promise<boolean>>; // expected boolean
