module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/pages/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

//node: npm init -y
//instalar tailwind: npm install -D tailwindcss
//instalar tailwind: npx tailwindcss init 

//Para poder ver los cambios de tailwind durante la edicion del codigo html
//npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
