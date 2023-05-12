// importation des différents calques

import {menu as menu} from "./menu.js"

import {overworld as overworld} from "./overworld.js"

import {niveau_1 as niveau_1} from "./niveau_1.js"

import {niveau_2 as niveau_2} from "./niveau_2.js"



var config = {
    type: Phaser.AUTO,
    width: 1920, height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { y: 500 },
        debug: true,
        tileBias : 128
    }},
    pixelArt:true,
    input:{gamepad:true},
    scene: [niveau_1,menu,overworld,niveau_2],
        
};

new Phaser.Game(config);