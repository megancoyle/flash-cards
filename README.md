# Flash Cards JavaScript Game

## Approach
Starting off, I decided to outline the necessary steps involved with the game. Since I would need to include an object with an array of all the possible flash card text, titles, images, etc, it made sense to use Handlebars.JS to help with templating that functionality.

I used jQuery to make it easier to select DOM elements, and separated my JS into different files to make it easier to know which sections to edit for what.

Towards the end of working on this project, I ran into issues where I was trying to incorporate keypresses, since my cards were set up in such a way that didn't make it the easiest to roll out that piece of functionality. I managed to incorporate it with the input fields after users entered their answers, and then realized it would make more sense to just have click event listeners so users could click through the cards.

## User Stories
* As a user, I should be able to see a flash card, then guess the answer based on the image/word that was shown to me.
* As a user, I should be able to see the answer to the flash card once I've made a guess.
* As a user, I should be able to keep track of my progress in the game through score keeping.
* As a user, I should be able to know when my answer is correct, and when it is wrong.
* As a user, I should know when the game is over.

<a href="https://megancoyle.github.io/flash-cards/">View the Flash Cards - "Learn How to Internet"</a>

![ScreenShot](learn-how-to-internet.jpg)
