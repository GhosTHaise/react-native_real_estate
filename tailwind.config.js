/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily : {
        rubik : ['Rubik-Regular', 'Rubik-Medium', 'Rubik-SemiBold', 'Rubik-Bold', 'Rubik-ExtraBold', 'Rubik-Light'],
      }
    },
  },
  plugins: [],
}