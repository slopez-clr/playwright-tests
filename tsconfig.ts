{
    "compilerOptions": {
    "target": "ES2020",
        "module": "commonjs",
        "lib": ["ES2020", "DOM"],
        "types": ["node", "@playwright/test"],
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "moduleResolution": "node",
        "resolveJsonModule": true
},
    "include": [
    "**/*.ts",
    "**/*.js"
],
    "exclude": [
    "node_modules"
]
}
