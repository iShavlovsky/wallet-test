import { defineManifest } from '@crxjs/vite-plugin';

export const manifest = defineManifest({
    manifest_version: 3,
    name: '__MSG_appName__',
    short_name: '__MSG_sName__',
    description: '__MSG_appDescription__',
    version: '1.0.0',
    default_locale: 'en',
    action: {
        default_popup: 'index.html'
    },
    background: {
        service_worker: 'sw.js',
        type: 'module'
    },
    content_scripts: [
        {
            all_frames: true,
            js: ['src/content.tsx'],
            matches: [
                'file://*/*',
                'http://*/*',
                'https://*/*'
            ],
            run_at: 'document_start'
        }
    ],
    // content_security_policy: {
    //     extension_pages: 'script-src \'self\' \'wasm-unsafe-eval\'; object-src \'self\''
    // },
    permissions: [
        'scripting',
        'storage',
        'unlimitedStorage',
        'alarms',
        'activeTab',
        'notifications',
        'offscreen',
        'contextMenus'
    ],
    host_permissions: [
        '<all_urls>'
    ]
    // web_accessible_resources: [
    //     {
    //         resources: [
    //             'user-media-permission.html',
    //             'pageProvider.js',
    //             'vendor/matomo.js',
    //             '/vendor/matomo.client.js'
    //         ],
    //         matches: [
    //             '<all_urls>'
    //         ]
    //     }
    // ]
});
