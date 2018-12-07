
let mouseCollision;
let vertices;
let selectedVertex;
let isVertexSelected;
let displayTraversal;

function setup() {
    createCanvas(displayWidth, displayHeight);
    this.mouseCollision = new Rectangle(0, 0, 1, 1);
    vertices = [];
    selectedVertex = null;
    isVertexSelected = false;
    displayTraversal = false;
}

function mousePressed() {
    this.mouseCollision.setLocation(mouseX, mouseY);
    selectVertices();
}

function selectVertices(){
    let collided = false;
    for (let vertex of vertices) {
        if (mouseCollidesWithVertex(vertex)) {
            collided = true;
            if (!isVertexSelected) {
                selectedVertex = vertex;
            }
            else {
                if (!(vertex === selectedVertex)) {
                    selectedVertex.linkToVertex(vertex);
                    vertex.linkToVertex(selectedVertex);
                }
            }
            selectedVertex.selected = !selectedVertex.selected;
            isVertexSelected = !isVertexSelected;
            break;
        }
    }

    if (!collided) {
        vertices.push(new Vertex(mouseX, mouseY, vertices.length + 1));
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
        graphTraversal("DFS");
        displayTraversal = true;
    }
}

function graphTraversal(type) {
    let structure = [];
    let explored = [];
    let vertex = null;

    structure.push([vertices[0], null]);

    while (structure.length > 0) {
        switch (type) {
            case "DFS":
                vertex = structure.pop();
                break;
            case "BFS":
                vertex = structure.shift();
                break;
        }

        if (!explored.includes(vertex[0])) {
            explored.push(vertex[0]);
            if (vertex[1] != null) {
                vertex[0].linkSearch(vertex[1]);
            }
            for (let neighbor of vertex[0].neighbors) {
                neighbor.parent = vertex[1];
                structure.push([neighbor, vertex[0]]);
            }
        }
    }
}

function draw() {
    background(255);
    for (let vertex of vertices) {
        vertex.drawLines();
    }
    for (let vertex of vertices) {
        vertex.show();
    }
}

