
let mouseCollision;
let vertices;
let selectedVertex;
let isVertexSelected;
let displayTraversal;

let showShortestPath;

function setup() {
    createCanvas(windowWidth, windowHeight);
    this.mouseCollision = new Rectangle(0, 0, 1, 1);
    reset();
}

function reset() {
    vertices = [];
    selectedVertex = null;
    isVertexSelected = false;
    displayTraversal = false;
    showShortestPath = false;
}

function mousePressed() {
    this.mouseCollision.setLocation(mouseX, mouseY);
    displayTraversal = false;
    resetVertices();
    selectVertices();
}

function selectVertices() {
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
        reset();
    }
    // Enter
    if (keyCode === 13) {
        //graphTraversal("BFS");
        createRandomGraph();
        dijktras();
        displayTraversal = true;
    }
}

function resetVertices() {
    for (let vertex of vertices) {
        vertex.reset();
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

function dijktras() {
    unvisited = [];
    for (let vertex of vertices) {
        vertex.distance = Number.MAX_SAFE_INTEGER;
        unvisited.push(vertex);
    }
    unvisited[0].distance = 0;

    while (unvisited.length > 0) {
        let current = vertexWithShortestDistance(unvisited);
        unvisited.splice(unvisited.indexOf(current), 1);
        for (let neighbor of current.neighbors) {
            let alternativePath = current.distance + dist(current.x, current.y, neighbor.x, neighbor.y);
            if (alternativePath < neighbor.distance) {
                neighbor.distance = alternativePath;
                neighbor.previous = current;
            }
        }
    }
    showShortestPath = true;
}

function vertexWithShortestDistance(unvisited) {
    let min = unvisited[0];
    for (let vertex of unvisited) {
        if (vertex.distance < min.distance) {
            min = vertex;
        }
    }
    return min;
}

function createRandomGraph() {
    vertices = [];
    let total = 5 + floor(Math.random() * 5);
    for (let i = 0; i < total; i++) {
        vertices.push(new Vertex(floor(Math.random() * (windowWidth - 200)) + 100, floor(Math.random() * (windowHeight - 200)) + 100, i + 1));
    }
    for (let i = 0; i < total; i++) {
        let target = floor(Math.random() * (total - 1));
        vertices[i].linkToVertex(vertices[target]);
        vertices[target].linkToVertex(vertices[i]);
    }
}

function draw() {
    background(222, 224, 229);
    for (let vertex of vertices) {
        vertex.drawLines();
    }

    if (showShortestPath) {
        stroke(0);
        strokeWeight(6)
        let solution = vertices[vertices.length - 1];
        while (solution.previous != null) {
            line(solution.x, solution.y, solution.previous.x, solution.previous.y);
            solution.partOfSolution = true;
            solution = solution.previous;
        }
    }

    for (let vertex of vertices) {
        vertex.show();
    }
}

