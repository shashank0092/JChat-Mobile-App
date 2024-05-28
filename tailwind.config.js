/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        "custome-paper":"#D9D9D9",
        "chat-container":"#1A212E",
        "chat-child-container":"#2E3441",
        "chat-text":"#ced9f3"
      },
      fontFamily:{
        "some-type-mono":['Sometype Mono'],
        "sans":['monospace']
      }
    },
  },
  plugins: [],
}

