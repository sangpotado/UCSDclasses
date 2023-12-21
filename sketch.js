let Courses = [];

function setup() {
  // Set canvas size based on window size
  createCanvas(windowWidth, windowHeight);

  // Fetch the JSON file asynchronously
  fetch('output.json')
    .then(response => response.json())
    .then(data => {
      // Create an array of Courses objects
      Courses = data.map(course => new Course(course));

      // Set positions for each course
      setCoursePositions(Courses);
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

function draw() {
  background(0);

  // Draw each course
  Courses.forEach(course => {
    course.draw();
  });

  // Draw course information box at the bottom
  drawCourseInfoBox();
}

function mouseClicked() {
    // Check if the mouse is over any course
    Courses.forEach(course => {
      if (mouseX > course.posX - 20 && mouseX < course.posX + 20 && mouseY > course.posY - 20 && mouseY < course.posY + 20) {
        // Reset the isClicked attribute for the previously clicked course
        Courses.forEach(otherCourse => {
          if (otherCourse !== course) {
            otherCourse.isClicked = false;
          }
        });
  
        // Toggle the isClicked attribute for the current course
        course.isClicked = !course.isClicked;
      }
    });
  }
  

function windowResized() {
  // Resize canvas when the window is resized
  resizeCanvas(windowWidth, windowHeight);

  // Update course positions
  setCoursePositions(Courses);
}

function setCoursePositions(courses) {
  const ballSize = 50;
  const margin = 20;
  const coursesPerRow = Math.floor((width - margin * 2) / ballSize);
  const coursesPerColumn = Math.floor((height - margin * 3) / ballSize);

  courses.forEach((course, index) => {
    const row = Math.floor(index / coursesPerRow);
    const col = index % coursesPerRow;

    course.posX = margin + col * ballSize;
    course.posY = margin + row * ballSize;
  });
}

function drawCourseInfoBox() {
    const infoBoxWidth = width;
    const infoBoxHeight = height / 3;
    const infoBoxX = width - infoBoxWidth;
    const infoBoxY = height - infoBoxHeight;
  
    fill(200);
    rect(infoBoxX, infoBoxY, infoBoxWidth, infoBoxHeight);
  
    // Find the clicked course
    const clickedCourse = Courses.find(course => course.isClicked);
  
    if (clickedCourse) {
      fill(0);
      textAlign(LEFT, TOP);
      textSize(14);
  
      // Split the information into lines
      const lines = [];
      lines.push(`Name: ${clickedCourse.name}`);
      lines.push(`\nDescription: ${clickedCourse.description}`);
      lines.push(`\nPrerequisites: ${clickedCourse.prerequisites}`);
    //   lines.push(`\nPrerequisites:`);
  
    //   // Add each prerequisite on a new line
    //   clickedCourse.prerequisites.forEach(prerequisite => {
    //     lines.push(` - ${prerequisite}`);
    //   });
  
      // Draw the lines within the info box
      text(lines.join('\n'), infoBoxX + 10, infoBoxY + 10, infoBoxWidth - 20, infoBoxHeight - 20);
    }
  }
  
