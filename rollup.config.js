import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import dts from 'rollup-plugin-dts'
import cleanup from 'rollup-plugin-cleanup'

import { DateTime } from 'luxon'

import packageJson from './package.json'

const banner = `/*\n * ${packageJson.name} v${packageJson.version} \n * build time: ${DateTime.now().toISO()}\n */`

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                format: 'cjs',
                file: packageJson.main,
                sourcemap: true,
                banner: banner,
            },
            {
                format: 'esm',
                file: packageJson.module,
                sourcemap: true,
                banner: banner,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript(),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            json(),
            cleanup({ comments: 'none', extensions: ['ts'] }),
        ],
        external: [],
    },
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'lib/index.d.ts',
                format: 'es',
            },
        ],
        plugins: [dts()],
    },
]
