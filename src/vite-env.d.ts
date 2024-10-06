/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly glob: (
        path: string,
        config: object,
    ) => Record<string, () => Promise<{ default: any }>>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

declare module '*.svg' {
    import * as React from 'react';
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

declare module '*.jpg' {
    const path: string;
    export default path;
}
declare module '*.jpeg' {
    const path: string;
    export default path;
}
declare module '*.svg?bg' {
    const path: string;
    export default path;
}
declare module '*.png' {
    const path: string;
    export default path;
}
