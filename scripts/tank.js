// Ahhhhhhhh My Face Is Bouncing

let xPos;
let yPos;

let xspeed;
let yspeed;

let faces = [];

const STARTING_FACE_COUNT = 2;

let r, g, b;

class FaceSprite {
    constructor(xPos, yPos, xSpeed, ySpeed) {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        let imageRight = loadImage('images/falafelFaceRight.png');
        let imageLeft = loadImage('images/falafelFaceLeft.png');

        this.sprite = createSprite(xPos, yPos);
        this.sprite.addImage("right", imageRight);
        this.sprite.addImage("left", imageLeft);
        //this.sprite.addSpeed(xSpeed, xSpeed * 10);
        this.sprite.position.x = xPos;
        this.sprite.position.y = yPos;

        this.sprite.mass = 10;
        //this.sprite.velocity = 10;

        //this.sprite.setVelocity(xSpeed, ySpeed);
    }

    repell() {
        if (this.sprite.touching.right || this.sprite.touching.left) {
            this.xSpeed = -this.xSpeed;
        } else if (this.sprite.touching.top || this.sprite.touching.bottom) {
            this.ySpeed = -this.ySpeed;
        }
    }

    move() {
        this.sprite.position.x = this.sprite.position.x + this.xSpeed;
        this.sprite.position.y = this.sprite.position.y + this.ySpeed;

        if (this.sprite.position.x + this.sprite.width >= windowWidth) {
            this.xSpeed = -this.xSpeed;
            this.sprite.position.x = windowWidth - this.sprite.width;
            this.sprite.mirrorX(-1);
            this.tintSprite();
            //this.flip();
        } else if (this.sprite.position.x <= 0) {
            this.xSpeed = -this.xSpeed;
            this.sprite.position.x = 0;
            this.sprite.mirrorX(1);
            this.tintSprite();
            //this.flip();
        }

        if (this.sprite.position.y + this.sprite.height / 2 >= windowHeight) {
            this.ySpeed = -this.ySpeed;
            this.sprite.position.y = windowHeight - this.sprite.height;
            this.tintSprite();
        } else if (this.sprite.position.y <= 0) {
            this.ySpeed = -this.ySpeed;
            this.sprite.position.y = 0;
            this.tintSprite();
        }
    }

    tintSprite() {
        r = random(100, 256);
        g = random(100, 256);
        b = random(100, 256);

        tint(r, g, b);
    }
}

function preload() {
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    refreshSprites(STARTING_FACE_COUNT, faces)

    createPortfolioText();
}

function refreshSprites(faceCount, spriteList) {
    console.log("length of list before clear: " + spriteList.length);

    this.clearSprites(spriteList);

    for (let i = 0; i < faceCount + 1; i++) {
        xPos = random(windowWidth);
        yPos = random(windowHeight);
        xspeed = random(6);
        yspeed = random(6);

        spriteList[i] = new FaceSprite(xPos, yPos, xspeed, yspeed);
    }
}

function tintSprites() {
    r = random(100, 256);
    g = random(100, 256);
    b = random(100, 256);

    tint(r, g, b);
}

function draw() {
    background(0);

    tintSprites();

    drawSprites();

    for (let i = 0; i < faces.length; i++) {
        faces[i].move();

        // TODO: comment this back in if you want them to repell
        //faces[i].sprite.displace(allSprites, function (faces) {faces.repell()} (faces[i]));

        if (i % 10 === 0) {
            faces[i].sprite.visible = false;
        }
    }
}

function setFaceCount() {
    faceCount = document.getElementById('faceCount').value;

    if (!faceCount) {
        faceCount = 1;
    }

    console.log('setfacecount: ' + faceCount);
    console.log('length of faces: ' + faces);

    let faceCountInt = parseInt(faceCount)

    refreshSprites(faceCountInt, faces)
}

function clearSprites(spriteArray) {
    for (let i = 0; i < spriteArray.length; i++) {
        spriteArray[i].sprite.remove();
    }
}

function centerPortfolioText() {
    linkContentVar.position(window.innerWidth / 2 - linkContentVar.elt.clientWidth / 2, window.innerHeight / 2 - linkContentVar.elt.clientHeight / 2);
}

function createPortfolioText() {
    linkContentVar = createDiv().id("linkContent")
    linkContentVar.style("margin-left", -linkContentVar.offsetWidth + "px");

    createA("", ' im a software engineer, animator and artist. i like to explore xxx and xxxx. im currently living in berlin. ').parent(linkContentVar);

    linkContentVar.style("max-width", window.innerWidth - window.innerWidth / 3 + "px");
    centerPortfolioText();

    //linkContentVar.position(window.innerWidth/2 - linkContentVar.elt.clientWidth/2, window.innerHeight/2 - linkContentVar.elt.clientHeight/2);
}
