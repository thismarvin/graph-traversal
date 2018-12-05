
class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 25;
    }

    show() {
        fill(255);
        ellipse(this.x, this.y, this.radius);
    }

}