
const canvasWidth = 1280;
const canvasHeight = 720;

let vertices;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    vertices = [];
}

function mousePressed() {
    vertices.push(new Vertex(mouseX, mouseY));
}

function draw() {
    background(0);
    for (let vertex of vertices) {
        vertex.show();
    }
}

