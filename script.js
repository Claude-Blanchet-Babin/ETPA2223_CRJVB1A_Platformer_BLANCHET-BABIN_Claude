// importation des différents calques

import {menu as menu} from "./script_menu.js"

import {jardin as jardin} from "./script_jardin.js"

import {cimetiere as cimetiere} from "./script_cimetiere.js"

import {crypte as crypte} from "./script_crypte.js"



var config = {
    type: Phaser.AUTO,
    width: 4160, height: 3456,
    physics: {
        default: 'arcade',
        arcade: {
        debug: true
    }},
    pixelArt:true,
    input:{gamepad:true},
    scene: [menu,jardin,cimetiere,crypte],
        
};

new Phaser.Game(config);