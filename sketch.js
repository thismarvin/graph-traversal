
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
        displayDepthSearch = true;
    }
}

function graphTraversal(type) {
    let structure = [];
    let parents = [];
    let explored = [];
    let vertex = null;
    let parent = null;

    structure.push(vertices[0]);
    parents.push(null);

    while (structure.length > 0) {
        switch (type) {
            case "DFS":
                vertex = structure.pop();
                parent = parents.pop();
                break;
            case "BFS":
                vertex = structure.shift();
                parent = parents.shift();
                break;
        }
        if (!explored.includes(vertex)) {
            explored.push(vertex);
            if (parent != null) {
                console.log(parent);
                vertex.linkSearch(getVertex(parent));
            }
            for (let neighbor of vertex.neighbors) {
                neighbor.parent = vertex;
                structure.push(neighbor);
                parents.push(vertex.index);
            }
        }
    }

    /*for (let i = 0; i < parents.length; i++){
        explored[i + 1].linkSearch(getVertex(parents[i]));
    }*/
}

function getVertex(number) {
    for (let vertex of vertices) {
        if (vertex.index === number) {
            return vertex;
        }
    }
    return null;
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

