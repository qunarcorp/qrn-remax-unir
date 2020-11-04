/**
 * Created by haikuan.gu on 2020-06-24
 */

module.exports = {
    "presets": [
        ['@babel/preset-env',{modules:false}],
        // ['@babel/preset-env'],
        ["@babel/preset-typescript"],

    ],
    plugins: [
        '@babel/plugin-transform-flow-strip-types',
        ['babel-plugin-transform-react-remove-prop-types', { mode: 'wrap' }],
        ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
        '@babel/plugin-proposal-nullish-coalescing-operator',
        ['@babel/plugin-transform-runtime'],
        ['@babel/plugin-syntax-class-properties'],
        ['@babel/plugin-proposal-class-properties'],
        ["@babel/plugin-syntax-jsx"]
    ]
};
