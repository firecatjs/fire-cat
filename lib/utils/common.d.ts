export declare function isStartRouter(path: string): path is "/";
export declare function ensureLeadingSlash(path: string): string;
export declare function fixedEndPath(path: string): string;
export declare function joinRoutePaths(...paths: Array<string | undefined>): string;
