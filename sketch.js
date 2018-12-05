
let mouseCollision;
let vertices;
let selectedVertex;
let isVertexSelected;

function setup() {
    createCanvas(displayWidth, displayHeight);
    this.mouseCollision = new Rectangle(0, 0, 1, 1);
    vertices = [];
    selectedVertex = new Vertex(0, 0);
    isVertexSelected = false;
}

function mousePressed() {
    this.mouseCollision.setLocation(mouseX, mouseY);
    let collided = false;
    for (let vertex of vertices) {
        if (mouseCollidesWithVertex(vertex)) {
            collided = true;
            if (!isVertexSelected){
                selectedVertex = vertex;
                selectedVertex.selected = true;
                isVertexSelected = true;
            }
            else {
                selectedVertex.linkToVertex(vertex);
                selectedVertex.selected = false;
                isVertexSelected = false;
            }
            break;
        }
    }

    if (!collided) {
        vertices.push(new Vertex(mouseX, mouseY));
    }
}

function mouseCollidesWithVertex(vertex) {
    let distance = dist(this.mouseCollision.x, this.mouseCollision.y, vertex.x, vertex.y);
    return distance < vertex.radius;
}

function draw() {
    background(255);
    for (let vertex of vertices) {
        vertex.show();
    }
}

