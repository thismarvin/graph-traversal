
let mouseCollision;
let vertices;
let selectedVertex;
let isVertexSelected;
let displayTraversal;

let showShortestPath;

let mode;
let topBar;
let breadthCollision;
let depthCollision;
let dijkstraCollision;
let resetCollision;

function setup() {
    createCanvas(windowWidth, windowHeight);
    this.mouseCollision = new Rectangle(0, 0, 1, 1);
    this.topBar = new Rectangle(0, 0, windowWidth, 32);
    this.breadthCollision = new Rectangle(32, 0, textWidth('Breadth First Search'), 32);
    this.depthCollision = new Rectangle(64 + textWidth('Breadth First Search'), 0, textWidth('Depth First Search'), 32);
    this.dijkstraCollision = new Rectangle(96 + textWidth('Breadth First Search') + textWidth('Depth First Search'), 0, textWidth('Dijkstra\'s Algorithm'), 32);
    this.resetCollision = new Rectangle(128 + textWidth('Breadth First Search') + textWidth('Depth First Search') + textWidth('Dijkstra\'s Algorithm'), 0, textWidth('Reset'), 32);
    mode = 0;
    reset();
    createCompleteGraph(8);
}

function reset() {
    mode = -1;
    vertices = [];
    selectedVertex = null;
    isVertexSelected = false;
    displayTraversal = false;
    showShortestPath = false;
}

function mousePressed() {
    this.mouseCollision.setLocation(mouseX, mouseY);
    displayTraversal = false;

    if (this.mouseCollision.intersects(this.topBar)) {
        if (this.mouseCollision.intersects(this.breadthCollision)) {
            selectMode(0);
        }
        if (this.mouseCollision.intersects(this.depthCollision)) {
            selectMode(1);
        }
        if (this.mouseCollision.intersects(this.dijkstraCollision)) {
            selectMode(2);
        }
        if (this.mouseCollision.intersects(this.resetCollision)) {
            reset();
        }
    }
    else {
        resetVertices();
        selectVertices();
    }
}

function selectMode(next) {
    mode = next;
    if (vertices.length === 0) {
        return;
    }

    resetVertices();
    switch (mode) {
        case 0:
            graphTraversal("BFS");
            break;
        case 1:
            graphTraversal("DFS");
            break;
        case 2:
            dijkstras();
            break;
    }
    displayTraversal = true;
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
        createRandomGraph();
    }
    // 1
    if (keyCode == 49) {
        selectMode(0);
    }
    // 2
    if (keyCode == 50) {
        selectMode(1);
    }
    // 3
    if (keyCode == 51) {
        selectMode(2);
    }
    // 4
    if (keyCode == 52) {
        reset();
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

function dijkstras() {
    if (vertices.count == 0) {
        return;
    }

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

function createCompleteGraph(order) {
    let center = createVector(windowWidth / 2, windowHeight / 2);
    let theta = 0;
    let increment = Math.PI * 2 / order;
    let radius = windowHeight * 0.75 * 0.5;
    if (windowWidth < windowHeight) {
        radius = windowWidth * 0.75 * 0.5;
    }

    for (let i = 0; i < order; i++) {
        vertices.push(new Vertex(center.x + Math.cos(theta) * radius, center.y + Math.sin(theta) * radius, i + 1));
        theta += increment;
        for (let j = 0; j < vertices.length; j++) {
            vertices[j].linkToVertex(vertices[vertices.length - 1]);
            vertices[vertices.length - 1].linkToVertex(vertices[j]);
        }
    }
}

function draw() {
    background(222, 224, 229);
    for (let vertex of vertices) {
        vertex.drawLines();
    }

    if (showShortestPath) {
        stroke(222, 0, 0);
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

    fill(255);
    noStroke();
    this.topBar.show();

    textFont('sans-serif');
    textAlign(LEFT);
    textSize(12);

    fill(0);
    if (mode === 0) {
        fill(255, 0, 77);
    }
    text("Breadth First Search", 32, 20);
    fill(0);
    if (mode === 1) {
        fill(255, 0, 77);
    }
    text("Depth First Search", 32 + textWidth('Breadth First Search') + 32, 20);
    fill(0);
    if (mode === 2) {
        fill(255, 0, 77);
    }
    text("Dijkstra's Algorithm", 32 + textWidth('Breadth First Search') + 32 + textWidth('Depth First Search') + 32, 20);
    fill(0);
    text("Reset", 32 + textWidth('Breadth First Search') + 32 + textWidth('Depth First Search') + 32 + textWidth('Dijkstra\'s Algorithm') + 32, 20);
}

