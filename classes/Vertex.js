class Vertex {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.radius = 0;
        this.selected = false;
        this.neighbors = [];
        this.distance = 0;
        this.reset();
    }

    reset() {
        this.traversal = [];
        this.previous = null;
        this.partOfSolution = false;
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

        strokeWeight(4);
        for (let edge of this.neighbors) {
            line(this.x, this.y, edge.x, edge.y);
        }

        if (displayTraversal) {
            stroke(222, 0, 0);
            strokeWeight(6);
            for (let edge of this.traversal) {
                line(this.x, this.y, edge.x, edge.y);
            }
        }
    }

    show() {
        stroke(0);
        strokeWeight(4);
        if (((mode === 0 || mode === 1) && (this.index === 1)) ||
            mode === 2 && (this.index === 1 || this.index === vertices.length)) {
            this.radius = 60;
            if (this.selected) {
                fill(150);
            }
            else {
                fill(255, 0, 77);
            }
        }
        else {
            this.radius = 50;
            if (this.selected) {
                fill(150);
            }
            else {
                fill(255);
            }
            if (this.partOfSolution) {
                fill(255, 119, 168);
            }
        }

        ellipse(this.x, this.y, this.radius);

        noStroke();
        fill(0);
        textAlign(CENTER);
        textFont('cursive');
        textSize(20);
        //text(this.index, this.x, this.y + 6);
    }
}