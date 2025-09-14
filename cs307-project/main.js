"use strict;"
// Ashley Kang
// creative scene js file

//import three js and all the addons that are used in this script 
import * as THREE from 'three';
import { TW } from 'tw';

console.log(`Loaded Three.js version ${THREE.REVISION}`);

// for debugging
globalThis.THREE = THREE;
globalThis.TW = TW;

// Create an initial empty Scene
var scene = new THREE.Scene();
globalThis.scene = scene;

// parameter for the scene
var params = {
    treeSize: 10,
    treeHeight: 50,
    trunkHeight: 10, 
    rockSize: 10,
    totalLandSize: 500,
    totalWaterSize: 125,
    logHeight: 10,
    lawnSize: 19, 
    lawnHeight: 10, 
    logLength: 100, 
    basewidth: 40,
    baseheight: 15,
    basedepth: 20,
    topwidth: 15, 
    topheight: 17,
    topdepth: 15,
    truckwidth: 70, 
    truckheight: 35, 
    truckdepth: 30, 
    carwheelsize: 5, 
    truckwheelsize: 7, 
    unit: 20,   // the base unnit is 20
    riverThickness: 5
} 

// ===================================================================================================
// ===================================================================================================
// Building the Background

//texture loader for the background, rocks, logs, and the trunks of the tree
var loader = new THREE.TextureLoader();

function createTree(params, scale) {
    /**
     * params: params (list of values for measurements)
     *         scale (scale of the tree for different size trees)
     * return: tree object
     * 
     * This function creates a tree object
     */
    
    var tree = new THREE.Object3D();
    
    // load the texture for the trunk of the trees
    loader.load("trunk.jpeg", function(texture) {
        var size = params.treeSize;
        var treeHeight = params.treeHeight;
        var trunkHeight = params.trunkHeight
        var treeGeometry = new THREE.BoxGeometry(size, treeHeight * scale, size);
        var treeMaterial = new THREE.MeshLambertMaterial({color: 0x648e26});
        var treeMesh = new THREE.Mesh(treeGeometry, treeMaterial);
    
        treeMesh.position.set(0, trunkHeight/2 + params.lawnHeight + treeHeight * scale/2, 0);
        
        var trunk = new THREE.BoxGeometry(size/2, trunkHeight, size/2);
        var trunkMaterial = new THREE.MeshLambertMaterial({map: texture});
        var trunkMesh = new THREE.Mesh(trunk, trunkMaterial);
        trunkMesh.position.set(0, trunkHeight/2 + params.lawnHeight,0)
        
        tree.add(treeMesh);
        tree.add(trunkMesh);
    });    
    
    return tree;
}

function createRock(params, scale) {
    /**
     * params: params (list of values for measurements)
     *         scale (scale of the rock for different size rocks)
     * return: rock object
     * 
     * This function creates a rock object
     */

    var rock = new THREE.Object3D();

    // load the texture for the rocks
    loader.load("rock.jpg", function(texture) {
        var size = params.rockSize;
        var rockGeometry = new THREE.BoxGeometry(size*scale, size*scale*0.8, size*scale);
        var rockMaterial = new THREE.MeshLambertMaterial({map: texture});
        var rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);

        var rockGeometry1 = new THREE.BoxGeometry(size*scale*0.9, size*scale*0.5, size*scale*0.9);
        var midMesh = new THREE.Mesh(rockGeometry1, rockMaterial);

        var rockGeometry2 = new THREE.BoxGeometry(size*scale*0.7, size*scale*0.3, size*scale*0.7);
        var topMesh = new THREE.Mesh(rockGeometry2, rockMaterial);
        
        rockMesh.position.set(0, params.lawnHeight + size*scale/3, 0)
        midMesh.position.set(0, params.lawnHeight + size*scale/3 + size*scale*0.8/2, 0)
        topMesh.position.set(0, params.lawnHeight + size*scale/3 + size*scale*0.8, 0)
        
        rock.add(rockMesh);
        rock.add(midMesh)
        rock.add(topMesh)

    });    

    return rock
}

function log(params, scale){
    /**
     * params: params (list of values for measurements)
     *         scale (scale of the log for different size logs)
     * return: log object
     * 
     * This function creates a log object
     */
    var log = new THREE.Object3D();

    // load the log texture file
    loader.load("trunk.jpeg", function(texture) {

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.rotation = Math.PI / 2; 

        var logGeometry = new THREE.BoxGeometry(params.logLength * scale, params.logHeight, params.unit);
        var logMaterial = new THREE.MeshLambertMaterial({map: texture});
        var logMesh = new THREE.Mesh(logGeometry, logMaterial);
        logMesh.position.set(0, params.riverThickness/2, 0)
        log.add(logMesh)
    });    

    return log
}

function river(params) {
    /**
     * params: params (list of values for measurements)
     * return: river object
     * 
     * This function creates a river object with logs in the river
     */
    var river = new THREE.Object3D();

    var water = new THREE.BoxGeometry(params.totalLandSize, params.riverThickness+1, params.totalWaterSize);
    
    // add texture for the river
    var waterMaterial = new THREE.MeshLambertMaterial({color: 0x6fddff, transparent: true, opacity: 0.55});
    var waterMesh = new THREE.Mesh(water, waterMaterial);
    waterMesh.position.set(0, 0, -params.unit*11/2 - params.totalWaterSize/2);
    
    // create 10 logs
    var log1 = log(params, 1);
    var log2 = log(params, 1.5);
    var log3 = log(params, 0.9);
    var log4 = log(params, 1.3);
    var log5 = log(params, 0.7);
    var log6 = log(params, 1);
    var log7 = log(params, 0.7);
    var log8 = log(params, 0.5);
    var log9 = log(params, 0.7);
    var log10 = log(params, 0.8);

    // set them at random places
    log1.position.set(0, 0, -params.totalLandSize/4 - params.unit/4); 
    log2.position.set(-170, 0, -params.totalLandSize/4 - params.unit/4);
    log3.position.set(200, 0, -params.totalLandSize/4 - params.unit/4);
    log4.position.set(100, 0, -params.totalLandSize/4 - params.unit/4*7);
    log5.position.set(-100, 0, -params.totalLandSize/4 - params.unit/4*7);
    log6.position.set(0, 0, -params.totalLandSize/4 - params.unit/4*13); 
    log7.position.set(-210, 0, -params.totalLandSize/4 - params.unit/4*13);
    log8.position.set(200, 0, -params.totalLandSize/4 - params.unit/4*13);
    log9.position.set(110, 0, -params.totalLandSize/4 - params.unit/4*18);
    log10.position.set(-130, 0, -params.totalLandSize/4 - params.unit/4*18);
    
    // add all the logs to the river
    river.add(log1);
    river.add(log2);
    river.add(log3);
    river.add(log4);
    river.add(log5);
    river.add(log6);
    river.add(log7);
    river.add(log8);
    river.add(log9);
    river.add(log10);
    river.add(waterMesh);

    return river
}

function lawn(params, scale) {
    /**
     * params: params (list of values for measurements)
     *         scale (scale for the tree reflections: 1 and -1)
     * return: lawn object
     * 
     * This function creates a lawn object with trees and rocks
     */
    var lawn = new THREE.Object3D();

    var length = params.totalLandSize;
    var width = params.lawnSize;
    var height = params.lawnHeight;

    var grass = new THREE.BoxGeometry(length-2, width, height);
    var grassMaterial = new THREE.MeshLambertMaterial({color: 0xaadc60});
    var grassMesh = new THREE.Mesh(grass, grassMaterial);
    grassMesh.rotateX(-Math.PI / 2);
    grassMesh.position.set(0, height/2, 0)
    
    // only add the lawn once so that the scene doesn't have a duplicate of the same object
    // when reflecting the trees
    if (scale == -1) {
        lawn.add(grassMesh)
    }
    
    // add the trees
    var tree1 = createTree(params, 1.6);
    tree1.position.set(200*scale, 0, 0)

    var tree2 = createTree(params, 1);
    tree2.position.set(50*scale, 0, 0)

    var tree3 = createTree(params, 0.5);
    tree3.position.set(130*scale, 0, 0)

    lawn.add(tree1)
    lawn.add(tree2)
    lawn.add(tree3)
    
    // add the rocks
    var rock1 = createRock(params, 1)
    rock1.position.set(20*scale, 0, 0)
    lawn.add(rock1)

    var rock2 = createRock(params, 0.5)
    rock2.position.set(100*scale, 0, 0)
    lawn.add(rock2)

    return lawn
}

function background(params) {
    /**
     * params: params (list of values for measurements)
     * return: ground object
     * 
     * This function creates a ground object with the road and the lawn
     */

    var ground = new THREE.Object3D();

    var groundGeometry = new THREE.BoxGeometry(params.totalLandSize, 5, params.unit*11);
    var groundMaterial = new THREE.MeshLambertMaterial({color: 0x808080});
    var groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.position.set(0, params.riverThickness, 0);
    ground.add(groundMesh);

    // add in the lawns to the ground
    var lawn1 = lawn(params, -1);
    ground.add(lawn1)

    var lawn11 = lawn(params, 1);
    ground.add(lawn11)

    var lawn2 = lawn(params, 1);
    lawn2.position.set(0, 0, 100)
    ground.add(lawn2)

    var lawn22 = lawn(params, -1);
    lawn22.position.set(0, 0, 100)
    ground.add(lawn22)

    var lawn3 = lawn(params, 1);
    lawn3.position.set(0, 0, -100)
    ground.add(lawn3);

    var lawn33 = lawn(params, -1);
    lawn33.position.set(0, 0, -100)
    ground.add(lawn33);

    return ground;
}

function car(params, color) {
    /**
     * params: params (list of values for measurements)
     *         color (define the color of the car)
     * return: car object
     * 
     * This function creates a car object 
     */
    var car = new THREE.Object3D();

    // create the body of the car
    var baseW = params.basewidth;
    var baseH = params.baseheight;
    var baseD = params.basedepth;
    var wheel = params.carwheelsize;

    var baseGeometry = new THREE.BoxGeometry(baseW, baseH, baseD);
    var baseMaterial = new THREE.MeshLambertMaterial({color: color})
    var baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.set(0, 10 + 10, 0)

    var topGeometry = new THREE.BoxGeometry(params.topwidth + 10, params.topheight, params.topdepth);
    var topMaterial = new THREE.MeshLambertMaterial({color: 0xEDEADE})
    var topMesh = new THREE.Mesh(topGeometry, topMaterial);
    topMesh.position.set(0,10 + 10 + 10,0)

    // create the wheels of the car
    var wheelGeometry = new THREE.CylinderGeometry(wheel, wheel, 1);
    var wheelMaterial = new THREE.MeshLambertMaterial({color: 0x000000})
    var wheelMesh1 = new THREE.Mesh(wheelGeometry, wheelMaterial)
    var wheelMesh2 = new THREE.Mesh(wheelGeometry, wheelMaterial)
    var wheelMesh3 = new THREE.Mesh(wheelGeometry, wheelMaterial)
    var wheelMesh4 = new THREE.Mesh(wheelGeometry, wheelMaterial)
    
    wheelMesh1.rotateX(-Math.PI / 2);
    wheelMesh2.rotateX(-Math.PI / 2);
    wheelMesh3.rotateX(-Math.PI / 2);
    wheelMesh4.rotateX(-Math.PI / 2);

    wheelMesh1.position.set(baseW/3, wheel + 5, baseD/2)
    wheelMesh2.position.set(baseW/3, wheel + 5, -baseD/2)
    wheelMesh3.position.set(-baseW/3, wheel + 5, baseD/2)
    wheelMesh4.position.set(-baseW/3, wheel + 5, -baseD/2)

    // add all meshes to the car object
    car.add(baseMesh)
    car.add(topMesh);
    car.add(wheelMesh1);
    car.add(wheelMesh2);
    car.add(wheelMesh3);
    car.add(wheelMesh4);

    return car;
}

function truck(params, color) {
    /**
     * params: params (list of values for measurements)
     *         color (define the color of the truck)
     * return: truck object
     * 
     * This function creates a truck object 
     */
    var truck = new THREE.Object3D();

    var baseW = params.truckwidth;
    var baseH = params.truckheight;
    var baseD = params.truckdepth;
    var wheel = params.truckwheelsize + 2;
    
    // create the body of the truck
    var baseGeometry = new THREE.BoxGeometry(baseW, baseH, baseD);
    var baseMaterial = new THREE.MeshLambertMaterial({color: 0xEDEADE});
    var baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.set(0, baseH/2 + 5 + wheel, 0)

    var faceGeometry = new THREE.BoxGeometry(baseW/4, baseH/1.5, baseD/1.2);
    var faceMaterial = new THREE.MeshLambertMaterial({color: color})
    var faceMesh = new THREE.Mesh(faceGeometry, faceMaterial);
    faceMesh.position.set(baseW/2 + baseW/8, 5 + wheel + baseH/1.5/2,0)

    var headBottomGeometry = new THREE.BoxGeometry(params.topwidth*1.5, params.topheight/4, params.topdepth);
    var headBottomMaterial = new THREE.MeshLambertMaterial({color: 0xfdec09})
    var headBottomMesh = new THREE.Mesh(headBottomGeometry, headBottomMaterial);
    headBottomMesh.position.set(baseW/2 + (params.topwidth/4)/2, 5 + wheel + baseH/1.5 + params.topheight/8,0)

    var headTopGeometry = new THREE.BoxGeometry(params.topwidth/1.2, params.topheight/4, params.topdepth/1.2);
    var headTopMaterial = new THREE.MeshLambertMaterial({color: 0xfdec09})
    var headTopMesh = new THREE.Mesh(headTopGeometry, headTopMaterial);
    headTopMesh.position.set(baseW/2 + (params.topwidth/4)/2, 5 + wheel + baseH/2 + baseH/1.5/2,0)

    var topGeometry = new THREE.BoxGeometry(params.topwidth-5, params.topheight, params.topdepth);
    var topMaterial = new THREE.MeshLambertMaterial({color: 0xffffff})
    var topMesh = new THREE.Mesh(topGeometry, topMaterial);
    topMesh.position.set(baseW/2 + (params.topwidth-5)/2, 5 + wheel + params.topheight/2,0)

    // create the wheels of the truck
    var wheelGeometry = new THREE.CylinderGeometry(wheel, wheel, 1);
    var wheelMaterial = new THREE.MeshLambertMaterial({color: 0x000000})
    var wheelMesh1 = new THREE.Mesh(wheelGeometry, wheelMaterial)
    var wheelMesh2 = new THREE.Mesh(wheelGeometry, wheelMaterial)
    var wheelMesh3 = new THREE.Mesh(wheelGeometry, wheelMaterial)
    var wheelMesh4 = new THREE.Mesh(wheelGeometry, wheelMaterial)
    
    wheelMesh1.rotateX(-Math.PI / 2);
    wheelMesh2.rotateX(-Math.PI / 2);
    wheelMesh3.rotateX(-Math.PI / 2);
    wheelMesh4.rotateX(-Math.PI / 2);

    wheelMesh1.position.set(baseH/2, wheel*1.5, baseD/2)
    wheelMesh2.position.set(baseH/2, wheel*1.5, -baseD/2)
    wheelMesh3.position.set(-baseH/2, wheel*1.5, baseD/2)
    wheelMesh4.position.set(-baseH/2, wheel*1.5, -baseD/2)

    // add the meshes to the truck object
    truck.add(baseMesh)
    truck.add(faceMesh);
    truck.add(wheelMesh1);
    truck.add(wheelMesh2);
    truck.add(wheelMesh3);
    truck.add(wheelMesh4);
    truck.add(headBottomMesh);
    truck.add(headTopMesh);

    return truck;
}

function animal() {
    /**
     * params: none
     * return: animal object
     * 
     * This function creates a animal object (the main character of the scene)
     */
    var animal = new THREE.Object3D();

    // create the body mesh
    var bodyGeometry = new THREE.BoxGeometry(12, 20, 15);
    var bodyMaterial = new THREE.MeshLambertMaterial({color: 0xEDEADE});
    var bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.position.set(0, 27, 0)
    animal.add(bodyMesh)

    // create the head mesh
    var headGeometry = new THREE.BoxGeometry(12, 10, 5);
    var headMaterial = new THREE.MeshLambertMaterial({color: 0xEDEADE});
    var headMesh = new THREE.Mesh(headGeometry, headMaterial);
    headMesh.position.set(0, 22, -15/2 - 2.5)
    animal.add(headMesh)

    // create the wing meshes
    var wingGeometry = new THREE.BoxGeometry(5, 5, 12);
    var wingMaterial = new THREE.MeshLambertMaterial({color: 0xEDEADE});
    var wingMesh = new THREE.Mesh(wingGeometry, wingMaterial);
    wingMesh.position.set(6+2.5, 22, -4)
    animal.add(wingMesh)
    var wingMesh2 = new THREE.Mesh(wingGeometry, wingMaterial);
    wingMesh2.position.set(-6-2.5, 22, -4)
    animal.add(wingMesh2)

    // create the comb mesh
    var redGeometry = new THREE.BoxGeometry(5, 5, 9);
    var redMaterial = new THREE.MeshLambertMaterial({color: 0xfd6ea2});
    var redMesh = new THREE.Mesh(redGeometry, redMaterial);
    redMesh.position.set(0, 37+2.5, 0)
    animal.add(redMesh)

    // create the beak mesh
    var beakGeometry = new THREE.BoxGeometry(5, 5, 5);
    var beakMaterial = new THREE.MeshLambertMaterial({color: 0xfd956e});
    var beakMesh = new THREE.Mesh(beakGeometry, beakMaterial);
    beakMesh.position.set(0, 32, 7+2.5)
    animal.add(beakMesh)

    var beakGeometry2 = new THREE.BoxGeometry(5, 5, 3);
    var beakMaterial2 = new THREE.MeshLambertMaterial({color: 0xfd6ea2});
    var beakMesh2 = new THREE.Mesh(beakGeometry2, beakMaterial2);
    beakMesh2.position.set(0, 27, 7 + 1.5)
    animal.add(beakMesh2)

    // create the eye meshes
    var eyeGeometry = new THREE.BoxGeometry(1, 3, 3);
    var eyeMaterial = new THREE.MeshLambertMaterial({color: "black"});
    var eyeMesh = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeMesh.position.set(6, 31, 1)
    animal.add(eyeMesh)
    var eyeMesh2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeMesh2.position.set(-6, 31, 1)
    animal.add(eyeMesh2)

    // create the leg meshes
    var legGeometry = new THREE.BoxGeometry(4, 10, 4);
    var legMaterial = new THREE.MeshLambertMaterial({color: 0xfd956e});
    var legMesh = new THREE.Mesh(legGeometry, legMaterial);
    legMesh.position.set(3, 12, -1)
    animal.add(legMesh)
    var legMesh2 = new THREE.Mesh(legGeometry, legMaterial);
    legMesh2.position.set(-3, 12, -1)
    animal.add(legMesh2)

    // create the feet meshes
    var footGeometry = new THREE.BoxGeometry(4, 4, 8);
    var footMaterial = new THREE.MeshLambertMaterial({color: 0xfd956e});
    var footMesh = new THREE.Mesh(footGeometry, footMaterial);
    footMesh.position.set(3, 7, 1)
    animal.add(footMesh)
    var footMesh2 = new THREE.Mesh(footGeometry, footMaterial);
    footMesh2.position.set(-3, 7, 1) //add 27 to the height
    animal.add(footMesh2)

    return animal;
}

function coin() {
    /**
     * params: none
     * return: coin object
     * 
     * This function creates a coin object with the letter c on top of it
     */

    var coin = new THREE.Object3D();

    // create the coin base mesh
    var coinGeometry = new THREE.CylinderGeometry(10, 10, 5, 12 ); 
    var coinMaterial = new THREE.MeshPhongMaterial({color: 0xfffe58});
    var coinMesh = new THREE.Mesh(coinGeometry, coinMaterial);
    coinMesh.position.set(-130, params.riverThickness/2 + params.logHeight/2 + 2.5, -params.unit*2);
    
    // create the letter mesh
    var letterGeometry = new THREE.TorusGeometry(5, 2, 6, 5, 5); 
    var letterMaterial = new THREE.MeshPhongMaterial({color: 0xea1700})
    var letterMesh = new THREE.Mesh(letterGeometry, letterMaterial)
    letterMesh.position.set(-130, params.riverThickness/2 + params.logHeight/2 + 5, -params.unit*2);
    letterMesh.rotation.x = Math.PI / 2;

    coin.add(coinMesh);
    coin.add(letterMesh);

    return coin;
}

function finalScene(params) {
    /**
     * params: params (list of values for measurements)
     * return: scene (the 3d object), 
     *         car1, car2, car3, car4, car5, truck1, truck2, truck3, truck4 (all the vehicles so that they can move later on)
     * 
     * This function creates a scene with all the other object created from above. 
     */

    var scene = new THREE.Object3D();

    // add the river and the background, which includes the lawn and the ground
    scene.add(river(params))
    scene.add(background(params))
    
    // add another land across the river
    var land2 = background(params);
    land2.position.set(0,0,-params.unit*11 - params.totalWaterSize )
    scene.add(land2)
    
    // add the vehicles with different colors and locations. 
    var car1 = car(params, 0xfa612e); //orange
    car1.position.set(0, 0, (-params.unit - 5)*3);
    scene.add(car1)
    
    var car2 = car(params, 0x10c6f1); //blue
    car2.position.set(0, 0, (params.unit + 5)*3);
    scene.add(car2)

    var car3 = car(params, 0xa770ef); //purple
    car3.position.set(0, 0, (-params.unit - 5)* 13);
    scene.add(car3)
    
    var car4 = car(params, 0xfada59); //yellow
    car4.position.set(0, 0, (-params.unit - 5)* 12);
    scene.add(car4)

    var car5 = car(params, 0xaddb72); //green
    car5.position.set(0, 0, (-params.unit - 5) * 14.7);
    scene.add(car5)

    var truck1 = truck(params, 0x01a7e8); //blue
    truck1.position.set(0, 0, -params.unit - 5);
    scene.add(truck1)

    var truck2 = truck(params, 0xf82d3e); //red
    truck2.position.set(0, 0, params.unit + 5);
    scene.add(truck2)
    
    var truck3 = truck(params, 0xfa612e); //orange
    truck3.position.set(0, 0, (-params.unit - 5) * 16.7);
    scene.add(truck3)

    var truck4 = truck(params, 0xaddb72); //green
    truck4.position.set(0, 0, (-params.unit - 5) * 10.8);
    scene.add(truck4)
    
    // add the animal to the scene
    var c = animal()
    c.position.set(10, 0, 52)
    c.rotation.y = Math.PI;
    scene.add(c)

    return {
        final: scene,
        car1, car2, car3, car4, car5,
        truck1, truck2, truck3, truck4
    };
} 

// ===================================================================================================
// ===================================================================================================
// Renderer for the scene

var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
      
const {
    final,
    car1, car2, car3, car4, car5,
    truck1, truck2, truck3, truck4
} = finalScene(params);
  
// adjust the position so that it's in the center
final.position.set(0, 0, params.unit * 11 / 2 + params.totalWaterSize / 2);
scene.add(final);

// add the coin as well
scene.add(coin())

// add a sphere for background (big sphere) with the texture
loader.load("background.jpg", function(texture) {
    // Create the sphere geometry
    var backgroundGeometry = new THREE.SphereGeometry(800, 60, 40);
    
    // Create the material with the loaded texture
    var backgroundMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide 
    });

    // Create the mesh and add it to the scene
    var backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    scene.add(backgroundMesh);
});

// ===================================================================================================
// ===================================================================================================
// Add lights to the scene

// ambient light on the scene
let ambientLight = new THREE.AmbientLight(0x808080, 15);
scene.add(ambientLight);

// spotlight on the coin
const targetObject = new THREE.Object3D();
targetObject.position.set(-130, 0,  - params.unit/4*9);
scene.add(targetObject);

var spotlightLight = new THREE.SpotLight( 0xFAA0A0,
    10,
    400, 
    0.08,
    0,
    0 );

spotlightLight.position.set(-130, 200, 0); 
spotlightLight.target = targetObject;
scene.add(spotlightLight);

// spotlight on the animal
const targetObjectanimal = new THREE.Object3D();
targetObjectanimal.position.set(10, 0, params.unit/4*45);
scene.add(targetObjectanimal);

var spotlightAnimal = new THREE.SpotLight( 0xD3D3D3,
    10,
    400, 
    0.3,
    0.5,
    0);

spotlightAnimal.position.set(10, 100, params.unit/4*45); 
spotlightAnimal.target = targetObjectanimal;
scene.add(spotlightAnimal);

// directional light from the back left
let directionalLight = new THREE.DirectionalLight(0x808080, 10);
directionalLight.position.set(-500, 200, -500);
directionalLight.target.position.set(0,0,0);
scene.add(directionalLight);


// ===================================================================================================
// ===================================================================================================
// camera setting

TW.mainInit(renderer,scene);

// parameters for the camera
var cameraParams = {
    near: 0.1,  
    far: 2000,
    fov: 75,
    aspectRatio: window.innerWidth / window.innerHeight,
    atX: 0,
    atY: -150,    
    atZ: 0,
    eyeX: 200,
    eyeY: 300,  
    eyeZ: 300,  
    upX: 0,
    upY: 1,
    upZ: 0
};

function setupCamera (cameraParams) {
    /**
     * params: cameraParams (list of values for measurements)
     * return: camera 
     * 
     * This function sets up the camera based on the different parameters
     */
    var cp = cameraParams;
    
    var camera = new THREE.PerspectiveCamera(cp.fov, cp.aspectRatio, cp.near, cp.far);
    camera.position.set(cp.eyeX, cp.eyeY, cp.eyeZ);
    camera.up.set(cp.upX, cp.upY, cp.upZ);
    camera.lookAt(new THREE.Vector3(cp.atX, cp.atY, cp.atZ));
    
    return camera;
}

function loadScene(slideNumber) {
    /**
     * params: slideNumber (the slide number the user would press)
     * return: none 
     * 
     * This function loads the scene and displays it on the screen
     */

    // copy the parameters
    let newParams = { ...cameraParams }; 

    // change the parameters based on the number pressed by the user
    switch (slideNumber) {
        case 1:
            newParams.eyeX = 200;
            newParams.eyeY = 300;
            newParams.eyeZ = 300;
            newParams.atY = -150;
            break;
        case 2:
            newParams.eyeX = 500;
            newParams.eyeY = 500;
            newParams.eyeZ = 0;
            newParams.fov = 45;
            newParams.atX = -100;
            newParams.atY = -100;
            break;
        case 3:
            newParams.eyeX = 0;
            newParams.eyeY = 100;
            newParams.eyeZ = 800;
            newParams.fov = 19;
            newParams.atY = 70;
            break;
        case 4:
            newParams.eyeX = -300;
            newParams.eyeY = 300;
            newParams.eyeZ = -300;
            newParams.fov = 60;
            newParams.atY = -100;
            break;
    }

    // Remove old camera from scene
    scene.remove(camera);

    // Set up and assign new camera
    camera = setupCamera(newParams);
    scene.add(camera);
}

let camera = setupCamera(cameraParams);
scene.add(camera);

function render() {
    /**
     * params: none
     * return: none 
     * 
     * This function renders the scene with the new camera
     */
    renderer.render(scene, camera);
}

render();

// ===================================================================================================
// keyboard callback for loading scenes
TW.setKeyboardCallback("1", () => loadScene(1), "scene 1");
TW.setKeyboardCallback("2", () => loadScene(2), "scene 2");
TW.setKeyboardCallback("3", () => loadScene(3), "scene 3");
TW.setKeyboardCallback("4", () => loadScene(4), "scene 4");


// ===================================================================================================
// ===================================================================================================
// ANIMATION

function getRandomSpeed(min = 1, max = 2) {
    /**
     * params: min = 1, max = 2
     * return: random number  
     * 
     * This function generates a random number and returns that number that will be the speed of the vehicles
     */
    return Math.random() * (max - min) + min;
}

// Store all vehicles with their speeds
const vehicles = [
  { mesh: car1, speed: getRandomSpeed() },
  { mesh: car2, speed: getRandomSpeed() },
  { mesh: car3, speed: getRandomSpeed() },
  { mesh: car4, speed: getRandomSpeed() },
  { mesh: car5, speed: getRandomSpeed() },
  { mesh: truck1, speed: getRandomSpeed() },
  { mesh: truck2, speed: getRandomSpeed() },
  { mesh: truck3, speed: getRandomSpeed() },
  { mesh: truck4, speed: getRandomSpeed() }
];

// Initialize vehicle data with initial positions, direction, and speed
const vehicleData = vehicles.map(vehicle => ({
  mesh: vehicle.mesh,
  initialX: vehicle.mesh.position.x,
  direction: 1,
  speed: vehicle.speed 
}));

// Movement parameters
let carMoving = false;
const carRange = 200;

function animate() {
    /**
     * params: none
     * return: none
     * 
     * This function animates the vehicles in a loop
     */

    requestAnimationFrame(animate);
  
    if (carMoving) {
      for (const v of vehicleData) {
        v.mesh.position.x += v.speed * v.direction; 
  
        if (
          v.mesh.position.x > v.initialX + carRange ||
          v.mesh.position.x < v.initialX - carRange
        ) {
          v.direction *= -1;
        }
      }
    }
    renderer.render(scene, camera);
}

animate();

function resetVehicles() {
    /**
     * params: none
     * return: none
     * 
     * This function resets the vehicles' location and stops the animation
     */
    vehicleData.forEach(vehicle => {
      vehicle.mesh.position.x = vehicle.initialX; 
      vehicle.direction = 1;
      carMoving = false;
    });
  }

// ==================================================================
// keyboard callbacks for starting, pausing, and stopping animation
window.addEventListener("load", () => {
    TW.setKeyboardCallback("s", () => { carMoving = true; }, "start animation");
    TW.setKeyboardCallback("p", () => { carMoving = false; }, "pause animation");
    TW.setKeyboardCallback("r", resetVehicles, "reset vehicles and stop animation");
});

