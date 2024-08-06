/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [],
  content: ["./views/**/*.{html,ejs}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

// npx tailwindcss -i ./public/stylesheets/input.css -o ./public/stylesheets/output.css --watch