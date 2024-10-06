import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    publicDir: 'public',
    base: '/wallet-test/',
    build: {
        outDir: 'dist',
        minify: 'esbuild',
        commonjsOptions: {
            transformMixedEsModules: true
        },
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        const libraries = [
                            'react'
                        ];
                        const pattern = new RegExp(
                            '/node_modules/(' + libraries.join('|') + ')/'
                        );

                        const match = id.match(pattern);
                        if (match) {
                            return match[1];
                        }
                        return id
                            .toString()
                            .split('node_modules/')[1]
                            .split('/')[0]
                            .toString();
                    }

                    return null;
                }
            }
        }
    },
    assetsInclude: ['**/*.webp', '**/*.png', '**/*.woff2', '**/*.jpeg'],
    plugins: [
        react(),
        svgr({
            include: '**/*.svg',
            exclude: '**/*.svg?bg',
            svgrOptions: {
                plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
                svgoConfig: {
                    multipass: true,
                    plugins: [
                        {
                            name: 'cleanupIds',
                            params: {
                                remove: false,
                                minify: false
                            }
                        },
                        {
                            name: 'cleanupAttrs',
                            params: {
                                newlines: true,
                                trim: true,
                                spaces: true
                            }
                        },
                        {
                            name: 'cleanupNumericValues',
                            params: {
                                floatPrecision: 2
                            }
                        },
                        { name: 'collapseGroups' },
                        {
                            name: 'convertColors',
                            params: {
                                names2hex: true,
                                rgb2hex: true
                            }
                        },
                        {
                            name: 'convertEllipseToCircle'
                        },
                        {
                            name: 'convertPathData',
                            params: {
                                applyTransforms: true,
                                applyTransformsStroked: true,
                                makeArcs: {
                                    threshold: 2.5,
                                    tolerance: 0.5
                                }
                            }
                        },
                        'convertShapeToPath',
                        'convertTransform',
                        'mergeStyles',
                        'inlineStyles',
                        'minifyStyles',
                        'removeComments',
                        'removeMetadata',
                        'sortAttrs',
                        'sortDefsChildren',
                        'removeUselessDefs'
                    ]
                }
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
            '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@icon': fileURLToPath(new URL('./src/assets/icon', import.meta.url)),
            '@styles': fileURLToPath(new URL('./src/styles/modules', import.meta.url))
        }
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
            generateScopedName: '[local]__[hash:base64:5]'
        },
        postcss: {
            plugins: [
                autoprefixer({
                    grid: 'autoplace'
                }),
                cssnano({
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true
                            }
                        }
                    ]
                })
            ]
        }
    }
});
