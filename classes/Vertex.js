
class Vertex {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.radius = 40;

        this.neighbors = [];
        this.parent = null;

        this.selected = false;

        this.search = [];
    }

    linkToVertex(vertex) {
        if (!this.neighbors.includes(vertex)) {
            this.neighbors.push(vertex);
            this.neighbors.sort(function (a, b) { return a.index - b.index });
            //console.log(this.neighbors);
        }
    }

    linkSearch(vertex) {
        this.search.push(vertex);
    }

    show() {
        stroke(0);
        strokeWeight(3);
        for (let neighbor of this.neighbors) {
            line(this.x, this.y, neighbor.x, neighbor.y);
        }

        stroke(222, 0, 0);
        strokeWeight(6);
        for (let so of this.search) {
            line(this.x, this.y, so.x, so.y);
        }

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
        text(this.index, this.x, this.y + 5);
    }
}