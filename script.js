function drawCanvasGridMatrix(gridMatrix) {
    let padding = 2; // padding
    let originX = 0; // starting X point in canvas
    let originY = 0; // starting Y point in canvas
    let width = (this.gridIcon.nativeElement.width - (2 * padding)) / this.videoWallLayout.gridColumns; // standard cell width
    let height = (this.gridIcon.nativeElement.height - (2 * padding)) / this.videoWallLayout.gridRows; // standerd cell height

    this.ctx.beginPath();

    const cells = [];

    // creates an array of standard cells
    for (let i = 0; i < gridMatrix.length; i++) {
      const matrix = gridMatrix[i];
      for (let y = 0; y < matrix.length; y++) {
        cells.push({
          label: `A${matrix[y]}`, // needed to recognize same cells later on
          width,
          height,
          positionX: y,
          positionY: i
        });
      }
      
    }

    const rects = [];

    // creates rects from cells
    cells.forEach((cell) => {
      const rectIndex = rects.findIndex((rect) => rect.label === cell.label);

      if (rectIndex !== -1) {
        if (cell.positionX > rects[rectIndex].positionX && cell.positionY === rects[rectIndex].positionY) {
          rects[rectIndex].width += cell.width;
        }
        
        if (cell.positionY >  rects[rectIndex].positionY && cell.positionX === rects[rectIndex].positionX) {
          rects[rectIndex].height += cell.height;
        }
        
      } else {
        rects.push(cell);
      }
    });

    // prints rects in canvas
    rects.forEach((rect) => {
      originX = (rect.positionX * width) + padding;
      originY = (rect.positionY * height) + padding;
      this.ctx.rect(originX, originY, rect.width, rect.height);
      this.ctx.stroke();
    });
  }

// same number means merged cells
const matrix = [
    [0,3,5,9],
    [1,4,4,10],
    [2,4,4,11],
    [6,7,8,12]
]

drawCanvasGridMatrix(matrix);