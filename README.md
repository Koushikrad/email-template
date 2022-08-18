# Email Template

## Tech Stack

* EmberJs 3.12
* SCSS
* SMTP JS and Mailtrap (For Emailing)

## Few Assumptions taken during the project:

* Have kept accessibility score in mind and used corresponding colors and labels.
* The page is responsive and supports mobile and Tab views.
* The validation happens once user clicks the save and send button.
* Added length validation based on Internet standards, minimum of 2 characters and maximum of 120 for first name and last name.
* Images can be added and also be removed.
* Emails are sent using SMTP and mailtrap.

## FUTURE ENHANCEMENTS:

* Attaching Images to email.

## Video Demo of the project.

https://user-images.githubusercontent.com/28425590/185413036-25201150-233a-4088-b1c1-1c40568a1b1e.mp4

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js v12.22 (recommended)](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome (for running tests)](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd email-template`
* `yarn install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

