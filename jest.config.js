module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ["./node_modules/jest-enzyme/lib/index.js"],
    setupFiles: ["enzyme-react-16-adapter-setup"],
    testEnvironment: "jsdom"
};