# Capriccioso ♬

A Makerthon Project by Deon, Rob, Aaron & George
------------------

During Week 9 of our Makers Academy experience we took part in our first hackathon. After picking a project we worked on it tirelessly for three days, presenting it to our cohort at the end. We came out with... Capriccioso!

Capriccioso is a web app designed to help music students hone their musical ear. Identifying the intervals (distances) between notes is an important and useful skill for musicians, and the app gamifies the process of practising it. Capriccioso selects musical intervals at random and plays them using the MIDI standard; the player is given sixty seconds to correctly identify as many of them as possible from a multiple choice selection.

The app collects players' high scores and displays a high scores leaderboard. This design fosters competition, encouraging users to try to better their own scores and to keep practising, ultimately improving their musical ability.

Approach
--------
Here are the user stories we followed:
```
As a music student who wants to hone my listening skills
So that I can try to identify the interval between notes
I want to hear two notes played simultaneously

As a music student
So that I can identify the interval more easily
I want to be able to hear the notes as many times as I need to

As somebody who enjoys games
So that I can compete with myself and others
I want to score points for a correct answer and lose them for an incorrect one

As somebody who enjoys games
So that I can compete with myself and others
I want a time limit in which to try to score as many points as possible

As a user
So that the game can store my personal scores
I want to be able to register an account

As a player
So that I have an incentive to keep practising
I want to see a leaderboard that displays high scores
```

We decided to work with AngularJS along with the wider MEAN stack for this project. We used:

* AngularJS to handle game logic, implementing factories in order to separate concerns and unit testing our functions using Karma
* The brilliant [MIDI.js](https://github.com/mudcube/MIDI.js) to generate the desired musical notes using JavaScript functions
* Express to serve our application and handle routing
* MongoDB to store user data and scores
* Crypto to encrypt users' passwords

Challenges
----------
The biggest challenges we faced in delivering the product were:

* Configuring the routing of the application using Express, as this was the first time we had worked with it
* Incorporating MIDI.js successfully into our application. We needed to quickly learn the basics of how the library functioned and then refactor the relevant functions into Angular factory logic
* Styling the game interface to run on a single page. We used CSS to craft a sleek, uncluttered game, with a large ► (play) button that sounds the interval, large multiple choice buttons from which to pick an answer, a running points total and a countdown to display how much time is left
* Successfully fetching data from Mongo in order to display high scores on the leaderboard page.

Setup
-----
To run the app:

1. Fork this repository and then clone it using `git clone <url>`
2. cd into the project
3. Run `npm install`, `bower install` and then `brew install mongo`
4. In your root folder, create the directory `/data/db` and give it full read-write access
5. Run `mongod`
6. Run `node server.js` to start serving the application
7. Visit `http://localhost:1337/` to start using the application
8. Click the `Register` button to create your own account

How to play
----------
1. Press the large ► (play) button to start the game. You will hear two musical notes played simultaneously. The clock will start counting down: you now have sixty seconds. You can hear the interval as many times as you wish by clicking the ► button.
2. Try to identify the musical interval, and click on what you believe to be the correct answer from the four choices. The button will turn green for a correct answer and red for an incorrect one.
3. You gain a point for a correct answer, and lose a point when you click on an incorrect one.
4. When the correct answer is clicked, a new interval will be played.
5. When sixty seconds have elapsed, you will be taken to the leaderboard, which shows the highest scores that have been achieved.

Good luck and happy interval training!

P.S. *capriccioso* is an Italian musical term, meaning 'of whimsical or fanciful character'.
