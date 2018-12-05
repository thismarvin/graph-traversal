class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  setLocation(x, y) {
    this.x = x;
    this.y = y;
  }

  setWidth(w) {
    this.w = w;
  }

  setHeight(h) {
    this.h = h;
  }

  intersects(rect) {
    return (rect.x < this.x + this.w &&
      rect.x + rect.w > this.x &&
      rect.y < this.y + this.h &&
      rect.y + rect.h > this.y);
  }

  show() {
    rect(this.x, this.y, this.w, this.h);
  }
}
