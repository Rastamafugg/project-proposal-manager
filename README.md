# Project Proposal Manager

This demo app simulates a municipal project proposal manager tool using The Shire from Middle Earth as a fantasy region that requires local municipalities to submit proposals for capital investment plans, such as building, maintaining, and upgrading local infrastructure, including funding plans over the term of the project.

This application demonstrates an example of a form-based application using Angular, RxJS, NgRx using the latest versions of each tool used

## Current Application Status

This code is in a state of conversion from an existing code base and is missing some keys features that I will add in as I get time.  The current list of outstanding work includes:

* Complete set of sample data that allows the application to be a useful demonstration tool.
* Comprehensive set of unit tests for existing code base
* Improved documentation that describes the code base and how it is intended to work

## Future Additions
* Implement a series of back-end web services with persistent storage, instead of the hard-coded mock data that now exists
* Add visual mapping support for projects using maps from Tolkien's works and a web-map API like Leaflet
* Add proper security roles for authentication and authorization using Keycloak
* Explore adding micro-frontend support using Single-SPA or similar technology

# Developer Notes

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
