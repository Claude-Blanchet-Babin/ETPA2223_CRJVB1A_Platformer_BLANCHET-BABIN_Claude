// importation des différents calques

import {menu as menu} from "./menu.js"

import {overworld as overworld} from "./overworld.js"

import {niveau_1 as niveau_1} from "./niveau_1.js"

import {niveau_2 as niveau_2} from "./niveau_2.js"

import {niveau_3 as niveau_3} from "./niveau_3.js"

import {niveau_4 as niveau_4} from "./niveau_4.js"

import {cinematique as cinematique} from "./cinematique.js"



var config = {
    type: Phaser.AUTO,
    width: 1920, height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
        //gravity: { y: 0 },
        debug: false,
        tileBias : 64
    }},
    pixelArt:false,
    input:{gamepad:true},
    scene: [menu,niveau_4,niveau_2,cinematique,niveau_3,niveau_1,overworld],
    scale: {
        mode: Phaser.Scale.FIT, //La fenetre s'adapte avec le même ratio
        width: 1920,
        height: 1080,
    },
        
};

new Phaser.Game(config);