// Ahhhhhhhh My Face Is Bouncing

let xPos;
let yPos;

let xspeed;
let yspeed;

let faces = [];

const STARTING_FACE_COUNT = 20;
let faceCount = STARTING_FACE_COUNT;

let r, g, b;

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (var i = 0; i < faceCount; i++) {
        xPos = random(width);
        yPos = random(height);
        xspeed = random(6);
        yspeed = random(6);

        faces[i] = new Face('images/falafelFaceRight.png', xPos, yPos, xspeed, yspeed);
    }
}

function draw() {
    background(0);

    // create blinking effect
    animateCount = random(faceCount);

    for (var i = 0; i < animateCount; i++) {
        faces[i].move();
    }
}

function setFaceCount() {
    faceCount = document.getElementById('faceCount').value;

    setup(faceCount);
}

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

        // reverse face if at the edge of the screen
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
