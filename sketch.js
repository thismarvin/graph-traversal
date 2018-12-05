
let mouseCollision;
let vertices;
let selectedVertex;
let isVertexSelected;

let displayDepthSearch;

function setup() {
    createCanvas(displayWidth, displayHeight);
    this.mouseCollision = new Rectangle(0, 0, 1, 1);
    vertices = [];
    selectedVertex = null;
    isVertexSelected = false;

    search = [];
    displayDepthSearch = false;
}

function mousePressed() {
    this.mouseCollision.setLocation(mouseX, mouseY);
    let collided = false;
    for (let vertex of vertices) {
        if (mouseCollidesWithVertex(vertex)) {
            collided = true;
            if (!isVertexSelected) {
                selectedVertex = vertex;
                selectedVertex.selected = true;
                isVertexSelected = true;
            }
            else {
                if (!(vertex === selectedVertex)) {
                    selectedVertex.linkToVertex(vertex);
                    vertex.linkToVertex(selectedVertex);
                    selectedVertex.selected = false;
                    isVertexSelected = false;
                }
            }
            break;
        }
    }

    if (!collided) {
        vertices.push(new Vertex(mouseX, mouseY, vertices.length + 1));
        vertices.sort(function (a, b) { return b.y - a.y });
    }
}

function mouseCollidesWithVertex(vertex) {
    let distance = dist(this.mouseCollision.x, this.mouseCollision.y, vertex.x, vertex.y);
    return distance < vertex.radius;
}

function keyPressed() {
    // Space
    if (keyCode === 32) {
        vertices = [];
    }
    // Enter
    if (keyCode === 13) {
        depthFirstSearch();
        displayDepthSearch = true;
    }
}

function depthFirstSearch() {
    let stack = [];
    let explored = [];
    stack.push(vertices[0]);
    while (stack.length > 0) {
        let vertex = stack.pop();
        if (!explored.includes(vertex)) {
            if (vertex.parent != null){
                vertex.linkSearch(vertex.parent);
            }
            explored.push(vertex);
            for (let neighbor of vertex.neighbors) {
                neighbor.parent = vertex;
                stack.push(neighbor);
            }
        }
    }
}

function draw() {
    background(255);
    for (let vertex of vertices) {
        vertex.show();
    }
}

