# Developpez-le-front-end-en-utilisant-Angular
Dashboard des Jeux Olympiques - Collaboration avec TéléSport

Ce projet consiste à développer une application web interactive pour la chaîne TéléSport, dans le cadre de la couverture des Jeux Olympiques. L'objectif est de permettre aux utilisateurs de visualiser les informations des précédentes éditions des JO, telles que le nombre de médailles par pays, le nombre d'athlètes participants, etc.

Fonctionnalités principales : Tableau de bord interactif avec visualisation des données des Jeux Olympiques (médailles, participants, pays). Design responsive, optimisé pour une utilisation sur mobile et ordinateur. Intégration des données via des appels HTTP avec services Angular. Gestion des données avec RxJS et observables. Technologies utilisées : Framework : Angular Pratiques : Services Angular, RxJS, Typage strict, Unsubscribe des observables.

OlympicGamesStarter
This project was generated with Angular CLI version 18.0.3.

Don't forget to install your node_modules before starting (npm install).

Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

Where to start
As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

components folder: contains every reusable components
pages folder: contains components used for routing
core folder: contains the business logic (services and models folders)
I suggest you to start by understanding this starter code. Pay an extra attention to the app-routing.module.ts and the olympic.service.ts.

Once mastered, you should continue by creating the typescript interfaces inside the models folder. As you can see I already created two files corresponding to the data included inside the olympic.json. With your interfaces, improve the code by replacing every any by the corresponding interface.

You're now ready to implement the requested features.

Good luck!