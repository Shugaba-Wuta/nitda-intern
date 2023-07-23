
# NITDA Intern Management Portal

Created to automate and keep track of interns (NYSC, SIWES and intern) for the National Information Technology Development Agency (NITDA). Started project during my national service @ NITDA.

## Acknowledgements

 - [Shugaba Wuta](https://linkedin.com/in/Shugaba-Wuta)



## Author

- [@shugaba-wuta](https://www.github.com/shugaba-wuta)


![NITDA](https://nitda.gov.ng/wp-content/uploads/2020/07/cropped-cropped-NITDA-Logo-new-03.png)


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Tech Stack

**Client:** React, Redux, TailwindCSS, MUI, nivo charts

**Server:** Node, Express, MongoDB

**Others:** Docker


## Run Locally

Clone the project

```bash
  git clone https://github.com/Shugaba-Wuta/nitda-intern
```

Go to the project directory

```bash
  cd nitda-intern
```

Provide all values in the `./services/web/src/test.env` and `./services/api/test.env` files and rename the files to `.env`


Start all services by running the command below

```bash
  docker compose up --build --no-recreate --env-file ./services/api/.env
```



## Web Features

- Light/dark mode toggle
- Live previews
- Responsive design


## API Features
- API docs using SwaggerUI
- Automated testing



## Environment Variables

To run this project, you will need to populate the `test.env` and rename it to `.env` found in the following directories:

`./services/web/src/test.env`

`./services/api/test.env`


