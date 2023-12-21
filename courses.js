class Course {
    constructor(jsonData) {
        // Initialize attributes with default values or values from JSON data
        this.id = jsonData.id || "";
        this.name = jsonData.name || "";
        this.unit = jsonData.unit || 0;
        this.description = jsonData.description || "";
        // this.prerequisites = parsePrerequisites(jsonData.prerequisites) || [];
        this.prerequisites = jsonData.prerequisites || "";
        this.posX = 0;
        this.posY = 0;
        this.level = 0;
        this.parents = [];
    }

    // Additional constructor for a placeholder course
    static createPlaceholder(id) {
        return new Course({
            id: id,
            name: "notCSE",
            unit: 0,
            description: "notCSE",
            prerequisites: "notCSE"
        });
    }

    draw() {
        // Draw a ball for each course
        fill(0, 150, 200);
        ellipse(this.posX, this.posY, 40, 40);

        // Display the course ID inside the ball
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(12);
        text(this.id, this.posX, this.posY);
    }
}


function parsePrerequisites(prerequisites) {
    const prerequisitesArray = [];
  
    // Split by 'and' and '.' or ';' to separate individual prerequisites
    const individualPrerequisites = prerequisites.split(/\s*and\s*|\s*[.;]\s*/);
  
    individualPrerequisites.forEach(individualPrerequisite => {
      // Check if 'or' is surrounded by spaces before splitting
      const orSeparatedCourses = individualPrerequisite.includes(' or ')
        ? individualPrerequisite.split(/\s*or\s*/)
        : [individualPrerequisite];
  
      // Flatten the array, remove empty elements, and handle cases where both 'and' and 'or' conditions exist
      const flattenedCourses = orSeparatedCourses
        .reduce((acc, val) => acc.concat(val.split(/\s*,\s*/)), [])
        .filter(course => course.trim() !== '');
  
      // Check if the array is not empty before pushing
      if (flattenedCourses.length > 0) {
        prerequisitesArray.push(flattenedCourses);
      }
    });
  
    return prerequisitesArray;
  }

//   function linkPrerequisites(Courses) {
//     Courses.forEach(course => {
//         // Iterate through each prerequisite array
//         course.prerequisites.forEach(prerequisiteGroup => {
//             prerequisiteGroup.forEach(prerequisite => {
//                 // Extract potential course IDs from the prerequisite text
//                 const potentialCourseIds = prerequisite.match(/[a-zA-Z]{3,4}\d{1,3}[a-zA-Z]?/g) || [];

//                 // Iterate through potential course IDs
//                 potentialCourseIds.forEach(potentialCourseId => {
//                     // Convert to lowercase and remove spaces for case-insensitive comparison
//                     const prerequisiteId = potentialCourseId.toLowerCase().replace(/\s/g, '');

//                     // Find the course with the matching ID
//                     const matchingCourse = Courses.find(c => c.id.toLowerCase().replace(/\s/g, '') === prerequisiteId);

//                     // If a matching course is found, add it to the list of parents
//                     if (matchingCourse) {
//                         course.parents.push(matchingCourse);
//                     } else {
//                         // If no matching course is found, create a placeholder and add it to course.parents and Courses
//                         const placeholderCourse = Course.createPlaceholder(prerequisiteId);
//                         course.parents.push(placeholderCourse);
//                         Courses.push(placeholderCourse);
//                     }
//                 });
//             });
//         });
//     });
// }




// Fetch the JSON file asynchronously
// let Courses = [];

// fetch('output.json')
//   .then(response => response.json())
//   .then(data => {
//     // Create an array of Courses objects
//     Courses = data.map(course => new Course(course));

//     // Call linkPrerequisites here, inside the then block
//     // linkPrerequisites(Courses);

//     // Additional code if needed after linkPrerequisites
//     // ...
//   })
//   .catch(error => console.error('Error fetching JSON:', error));
