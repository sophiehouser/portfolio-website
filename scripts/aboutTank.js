// Ahhhhhhhh My Face Is Bouncing
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/131-bouncing-dvd-logo.html
// https://youtu.be/0j86zuqqTlQ
// https://editor.p5js.org/codingtrain/sketches/Ya1K1ngtFk

let xPos;
let yPos;

let xspeed;
let yspeed;

let dvd;

let faces = [];

const STARTING_FACE_COUNT = 20;
let faceCount = STARTING_FACE_COUNT;

let r, g, b;

class Face {
    constructor(currImageSource, xPos, yPos, xSpeed, ySpeed) {
        this.faceRightImageSource = 'images/falafelFaceRight.png';
        this.faceLeftImageSource = 'images/falafelFaceLeft.png';

        this.xPos = xPos;
        this.yPos = yPos;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.currImageSource = currImageSource
        this.image = loadImage(currImageSource);
    }

    flip() {
        if (this.currImageSource == this.faceRightImageSource) {
            this.currImageSource = this.faceLeftImageSource;
        } else if (this.currImageSource == this.faceLeftImageSource) {
            this.currImageSource = this.faceRightImageSource;
        }

        this.image = loadImage(this.currImageSource);
    }

    move() {
        image(this.image, this.xPos, this.yPos);

        this.xPos = this.xPos + this.xSpeed;
        this.yPos = this.yPos + this.ySpeed;

        if (this.xPos + this.image.width >= width) {
            this.xSpeed = -this.xSpeed;
            this.xPos = width - this.image.width;
            this.tint();
            this.flip();
        } else if (this.xPos <= 0) {
            this.xSpeed = -this.xSpeed;
            this.xPos = 0;
            this.tint();
            this.flip();
        }

        if (this.yPos + this.image.height >= height) {
            this.ySpeed = -this.ySpeed;
            this.yPos = height - this.image.height;
            this.tint();
        } else if (this.yPos <= 0) {
            this.ySpeed = -this.ySpeed;
            this.yPos = 0;
            this.tint();
        }
    }

    tint() {
        r = random(100, 256);
        g = random(100, 256);
        b = random(100, 256);

        tint(r, g, b);
    }


}

function preload() {}

function setup() {
    createCanvas(windowWidth, windowHeight);

    refreshSprites(STARTING_FACE_COUNT, faces)

    createPortfolioText();
}


function refreshSprites(faceCount, spriteList) {
    var  i;
    for (i=0; i < faceCount; i++) {
        xPos = random(width);
        yPos = random(height);
        xspeed = random(6);
        yspeed = random(6);

        spriteList[i] = new Face('images/falafelFaceRight.png', xPos, yPos, xspeed, yspeed);
    }
}

function draw() {
    background(0);
    var i;
    console.log("draw faces: " + faceCount);
    animateCount = random(faceCount);

    for (i=0; i < animateCount; i++) {
        faces[i].move();
    }
}

function setFaceCount() {
    faceCount = document.getElementById('faceCount').value;

    let faceCountInt = parseInt(faceCount)

    refreshSprites(faceCountInt, faces);
}

function centerPortfolioText() {
    linkContentVar.position(window.innerWidth/2 - linkContentVar.elt.clientWidth/2, window.innerHeight/2 - linkContentVar.elt.clientHeight/2);
}

function centerPortfolioText() {
    linkContentVar.position(window.innerWidth/2 - linkContentVar.elt.clientWidth/2, window.innerHeight/2 - linkContentVar.elt.clientHeight/2);
}

function createPortfolioText() {
    linkContentVar = createDiv().id("linkContent")
    linkContentVar.style("margin-left", -linkContentVar.offsetWidth + "px");

    createA("", ' im sophie. im 23. i like to do this and do that. other text will go here. blh blah blah. my CV will be hyperlinked here. ').parent(linkContentVar);

    linkContentVar.style("max-width", window.innerWidth - window.innerWidth/3 + "px");
    centerPortfolioText();

    //linkContentVar.position(window.innerWidth/2 - linkContentVar.elt.clientWidth/2, window.innerHeight/2 - linkContentVar.elt.clientHeight/2);
}
