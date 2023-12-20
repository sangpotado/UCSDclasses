function parseCourseData() {
    const url = document.getElementById("courseUrl").value;
  
    fetch(url)
      .then(response => response.text())
      .then(data => {
        const courses = [];
        const courseElements = data.querySelectorAll(".anchor-parent");
  
        courseElements.forEach(element => {
          const courseId = element.querySelector("a").id;
          const courseName = element.querySelector(".course-name").textContent.trim();
          const unit = element.querySelector(".course-name").textContent.trim().match(/\((\d+)\)/)[1];
          const description = element.querySelector(".course-descriptions").textContent.trim();
          const prerequisites = element.querySelector("strong.italic em").nextSibling.textContent.trim();
  
          courses.push({
            id: courseId,
            name: courseName,
            unit: unit,
            description: description,
            prerequisites: prerequisites
          });
        });
  
        // Display the first course data (you can modify this to display all courses or add controls)
        const firstCourse = courses[0];
        document.getElementById("courseData").innerHTML = JSON.stringify(firstCourse, null, 2);
      })
      .catch(error => console.error("Error fetching or parsing data:", error));
  }