class Vertex {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.radius = 40;
        this.selected = false;
        this.neighbors = [];  
        this.traversal = [];
    }

    linkToVertex(vertex) {
        if (!this.neighbors.includes(vertex)) {
            this.neighbors.push(vertex);
            this.neighbors.sort(function (a, b) { return a.index - b.index });
        }
    }

    linkSearch(vertex) {
        this.traversal.push(vertex);
    }

    drawLines() {
        if (!displayTraversal) {
            stroke(0);
        }
        else {
            stroke(0, 0, 0, 50);
        }

        strokeWeight(3);
        for (let edge of this.neighbors) {
            line(this.x, this.y, edge.x, edge.y);
        }

        stroke(222, 0, 0);
        strokeWeight(6);
        for (let edge of this.traversal) {
            line(this.x, this.y, edge.x, edge.y);
        }
    }

    show() {
        stroke(0);
        strokeWeight(3);
        if (this.selected) {
            fill(100);
        }
        else {
            fill(255);
        }
        ellipse(this.x, this.y, this.radius);

        noStroke();
        fill(0);
        textAlign(CENTER);
        textSize(20);
        textFont('cursive');
        text(this.index, this.x, this.y + 6);
    }
}