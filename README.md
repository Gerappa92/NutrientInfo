# Nutrient-Info

Applicaiton to retriew a nutrient data from [The FoodData Central API](https://fdc.nal.usda.gov/api-guide.html)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the UI react app in the development mode.\
Run script from `./src/UI/` folder.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `dotnet run`

Runs the .Net WebApi in the development mode.\
Run script from `./src/WebAPI`.\
Open [http://localhost:5000/swagger/index.html](http://localhost:5000/swagger/index.html) to view swagger in the browser.

### `docker-compose up -d --build`

Runs containerized WebApi and UI.

## Configuration

### ApiKey

The API key is necessary to connect with The FoodCentral API.\
You should add the key in property `FoodCentralData:ApiKey` in `./src/WebAPI/appsettings.json` configuration file.

OR

The ApiKey can be set using `dotnet user-secrets` commands.\
To do it open the command line in `./src/WebAPI` folder and run the below scripts:

```
dotnet user-secrets init
dotnet user-secrets set "set "FoodCentralData:ApiKey" "Your_Api_Key"
```

Where `Your_Api_Key` should be replaced by your FoodData Central API key.

### Docker

If you would like to run docker you should also add configuration files which will be used by containers in `./compose-configuration` folder.\
There should be added:
 - appsettings.Development.json - for WebApi
 - .env - for UI