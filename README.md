# Landmark Remark - Dennis Deljouei
Hi, 
Thank you for giving me the opportunity to show what I can do. I do appreciate how the questions presented.
Just a note, I would like to mention that I would spend more time on this application if I could, however, I was unable to do so simply due my schedule and the time limit on this project.


If I had more time and it was an actual production system I would undertake followiong tasks:

- Includes integration testing to the level that I feel very comfortable not to break any existing functionality due to my refactor.
- RESTFul apis must always have validators for every single DTO. There are good libraries that I usually use e.g. : https://fluentvalidation.net/start
- Performance considerations for instance, in this application, all the markers within the view area should be retrieved and on change a new call should be made to get updated points.
- all the DTOs must be immutable (readonly in c# with a public getter).
- I do very clearly understand you point about having a very well commented code, however, the best way is to have simple code.
- Generate a pool of components, resources etc... available to every so that we do not re-invent the wheel and make it clear at all levels how to keep things consistent 
- A proper authentication...
- UI validation, not a lot of it at this stage but still some better visual effects.
- UI Error handling: Using an angular httpinterceptor for all the possible issues with proper messages (error statuses 400, 401, 500, etc..)
- TDD: I do understand the importance and benefits of TDD and I have done it in the past for years, however, I usually stick to basics of writing a testable code and then test them, I did not 100% follow the TDD rules, however, for me, it is always helpful to once again "review" my code after I context switch to unit testing.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.

## How to run 
1) Download and install nodejs:  https://nodejs.org/dist/v12.13.0/node-v12.13.0-x64.msi
2) Download the source code and go to Tigerspike folder and run `npm i`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

You will need to download and run the back end server for the this application to work
Please refer to https://github.com/PooyaDel/LandmarkRemarkService for source code.

## Man/hour break down (estimated)
1- UI setup : 3 hours, following activities were undertaken.
  - Set up and get a new angular application running.
  - Find a simple and helpful angular library for components like pop-ups and fonts
  - Research about the Angular Google Map which I never used before and figuring out how to work wiuth it. I ended up looking at source code to figure things out.
  - Setup API key.
  
2- back end: roughly 4 hours
  - Setup EF data mapping and how to get them right with CODE FIRST (I will never do in production due to performance and over-complicated queries etc...)
  - Adding logger and small things like setting up CORS, DI view models, details and comments.
  - Wired-up RESTful apis considering SOLID rules.
  
3- Unit testing both UI/backend:  4 hours
  - Unit tested the logic just to demonstrate some techniques. More tests done in UI due to nature of this small app.
  
4- UI clean-up : 4 hours : Just to make sure everything is responsive and google maps is working fine. I had a bit of trouble dealing with google maps refusing to pan to spesific locations that took a bit of time to read and findout and data comes back correctly...basically putting on the tester hat and making sure ther app works on mobile.

 


## Solution overview
This application uses angular 8.3 for UI and for back-end I used .net core 3.0 Web API (RESTFul) and for database I have used Entity Frameowrk.
I also use log4net for error logging.
User will need to "login" to the sysem which I have mocked for 2 static users at this stage. once that's done, user will be redirect to the map which she/he can see all the available markers and by clicking on any area on the map and addeding a comment they can save a location. As, request, they are also able to view comments by tapping/clicking on the markers on the map.
the markers will be saved to a local database (sqllite).


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

