# Frontend

UI design and response display

## Getting Started


### Installations

Currently our server is listening to port 3000. The frontend must be able to pass requests through this same port in order for it to be received by the server. Due to security precautions and firewalls, we cannot simply use locahost:3000; instead, we will open an SSH tunnel to allow both ends to communicate.

Navigate to the ngrok directory and run the following command
```
npm install ngrok
```
The [ngrok.js](https://github.com/SirFancyWalrus/DogGo/blob/master/client/ngrok/ngrok.js) file in the directory specifies the details of the tunnel as well as which port it will open in. To start up the SSH tunnel, run
```
node ngrok.js
```
This will generate a unique URL that can be used in development. When deploying the frontend, replace the existing URL in config.js with the URL that you generated. The frontend will not deploy unless the correct URL is entered.

## Deployment

When deploying the client project folder in the WebStorm IDE for the first time, open the Terminal at the bottom section and run 
```
yarn install
```
For all subsequent deployments, run
```
yarn start
```
This is an equivalent command to `npm start`. The development build process will display on [http://localhost:19002/](http://localhost:19002/). This site should automatically open after compilation processes are complete in the Terminal. The actual application will be deployed on port 19006. Ensure that the ngrok connection is started and that the steps for replacing the URL are followed. The server must also be started in order for any communications to be made. Follow the deployment details on the backend README. If these steps are not taken, the application will not display. The build process may take several minutes.

## Viewing The Application

There are several methods to view the deployed application:

1. **Run in the web browser:** By far the easiest method, this will automatically open the application in the browser. Because React Native is a mobile application framework, be warned that the display will not be accurate and functionalities may be missing. Only use this for testing the simplest changes, such as centering text.

2. **Run on Android emulator:** Deploy the project in Android Studio and select the Android emulator option on the build process site.

3. **Run on iOS emulator (Only been tested on a Mac so far):** Follow the instructions given on the Webstorm Terminal to install an iOS emulator through XCode. Once finished, you can select the iOS emulator option on the build process site and XCode will launch. Booting up will take several minutes. Afterwards you will be prompted to open Expo. The application will build from there.

4. **Run on Android device (Recommended):** Download the [Expo Client app](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US). Navigate to the Projects tab where you are given an option to scan QR code. Scan the QR code generated on the automatic build site. The project should begin to build on your phone. 

5. **Run on iOS device (Recommended):** Download the [Expo Client app](https://apps.apple.com/us/app/expo-client/id982107779). Use the Camera to scan the QR code. A popup will direct you to open the application in Expo. The project should begin to build on your phone.

After the app appears on the device, you can leave it running. All edits you make to the project will automatically refresh the build.

## Testing

After the app boots up, it should display the start page. Currently, pressing Log In and entering either of pre-seeded credentials in the database will bring the user to the Home Page. The Webstorm Terminal should display the JWT that is handed back on successful authentication. If this works, you will know that the entire flow succeeded.
