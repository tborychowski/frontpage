# frontpage

A PoC inspired by: https://github.com/MatthK/Selfoss-Webfront

![Screenshot](.github/screenshot.png)


## Setup
1. Copy `.env-sample` as `.env` and update variables:
    - `HOST` is the base url of your miniflux instance
    - `API_KEY` you can generate in miniflux admin settings
    - `NODE_ENV` *(optional)* defaults to `prod`, you can set it to `dev` to get sourcemaps & unminified assets
2. Run `npm i`
3. Run `npm start`
4. Open `localhost:3000` in your browser.
