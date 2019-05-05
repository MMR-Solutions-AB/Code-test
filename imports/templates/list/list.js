import '../card/card.js';
import './list.html'

import { ReactiveVar } from 'meteor/reactive-var';

// Data
import { data as DATA } from '/imports/data.js';

let colors, currenctColors;

/**
*   getRandNumList(): Returns an array of uniquely generated numbers between the max and min number.
*
*   @param max is the max number.
*   @param min is the min number.
*   @param size is the size of the list of unique random numbers.
*   @returns a list of uniquely generated numbers between the max and min number.
*
*   @author devmattb
**/
function randomInt(min, max){
    return Math.floor(Math.random()*(max - min + 1)) + min;
}
function getRandNumList(min,max,size){
    let arr = [];
    while(arr.length < size){
        let randomnumber = randomInt(min, max);
        // If this number already exists in the array, skip to next loop, we don't want to add a non-unique number.
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }
    return arr;
}

const getRandomeColors = (list, numberOfCards) => {
    let length = list.length;
    let randomIndexes = getRandNumList(0, length - 1, numberOfCards);
    randomColors = [];
    randomIndexes.forEach( i => {
        randomColors.push(colors[i]);
    });
    return randomColors;
};

Template.list.onCreated(() => {
    console.log(DATA.colors);
    colors = DATA.colors;
    let template = Template.instance();
    template.currenctColors = new ReactiveVar(getRandomeColors(colors, 5));
});

Template.list.helpers({
    colors: () => Template.instance().currenctColors.get(),
    listLength: () => colors.length,
});

Template.list.events({
  'click #random'(event, instance) {
    instance.currenctColors.set(getRandomeColors(colors, 5));
  },

  'change input[name=points]':function(event, instance) {
        let numberOfColors = document.getElementById("numberOfCards").value
        instance.currenctColors.set(getRandomeColors(colors, numberOfColors));
  },
});