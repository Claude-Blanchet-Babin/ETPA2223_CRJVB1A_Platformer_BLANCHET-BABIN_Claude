import PlayScene from './scenes/Play.js';
import PreloadScene from './scenes/Preload.js';
import TestScene from './scenes/EnvironnementTest.js';
import DialogueSystem from './scenes/DialogueSystem.js';
import ChooseChar from './scenes/ChooseChar.js';
import UIScene from './scenes/UIScene.js';
import Scene02 from './scenes/Scene_02.js';
import Level01 from './scenes/Level_01.js';
import Level02 from './scenes/Level_02.js';
import Level03 from './scenes/Level_03.js';
import Level04 from './scenes/Level_04.js';
import Level05 from './scenes/Level_05.js';
import Level06 from './scenes/Level_06.js';
import EndScene from './scenes/EndScene.js';


const WIDTH = 1280;
const HEIGHT = 768;
const ZOOM_FACTOR = 3; 

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: ZOOM_FACTOR,
  leftTopCorner: {
    x: (WIDTH - (WIDTH / ZOOM_FACTOR)) / 2,
    y: (HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2
  }
}

const Scenes = [PreloadScene, PlayScene, UIScene, TestScene, DialogueSystem, ChooseChar, Scene02, Level01, Level02, Level03, Level04, Level05, Level06, EndScene];
const createScene = Scene => new Scene(SHARED_CONFIG) //A voir
const initScenes = () => Scenes.map(createScene) 

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    }
  },
  fps: {
    target: 60,
    forceSetTimeOut: true
  },
  scene: initScenes()
}

new Phaser.Game(config);