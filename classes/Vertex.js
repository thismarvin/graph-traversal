
class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 25;

        this.neighbors = [];

        this.selected = false;
    }

    linkToVertex(vertex){
        this.neighbors.push(vertex);
    }

    show() {
        if (this.selected){
            fill(100);
        }
        else{
            fill(255);
        }
        
        stroke(0);
        strokeWeight(3);
        for (let neighbor of this.neighbors){
            line(this.x, this.y, neighbor.x, neighbor.y);
        }
        ellipse(this.x, this.y, this.radius);
    }
}