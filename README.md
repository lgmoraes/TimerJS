# TimerJS

## Intro

TimerJS is a script that allow you to init javascript timers, with or without control interface

## Package managers

    yarn add https://github.com/lgmoraes/TimerJS.git

## Usage

There are two files to import:

* `timer.js`
* `timer.css`

Then you can create two types of timer:
* `Timer` Which are invisible timers controlled only by javascript
* `TimerInterface` Which are timers usable by users via an interface

To instance a timer, do the following:

    var myTimer = new Timer();
    var myTimerInterface = new TimerInterface();

## Functions

For each timer, you have acces to theses functions:
* play()
* pause()
* stop()
* getCurrentTime()