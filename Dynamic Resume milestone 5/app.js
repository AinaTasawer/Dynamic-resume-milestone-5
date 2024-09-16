// Get the form and resume content elements
var form = document.getElementById('resume-form');
var resumeContent = document.getElementById('resume-content');
// Event listener for form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get form input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Generate resume content
    var resumeHTML = "\n    <h3>".concat(name, "</h3>\n    <p><strong>Email:</strong> ").concat(email, "</p>\n    <p><strong>Education:</strong> ").concat(education, "</p>\n    <p><strong>Work Experience:</strong> ").concat(experience, "</p>\n    <p><strong>Skills:</strong> ").concat(skills, "</p>\n  ");
    // Inject resume content into the div
    resumeContent.innerHTML = resumeHTML;
    // Create a unique URL for sharing the resume
    var uniqueURL = "".concat(window.location.origin, "/resume/").concat(name.replace(/\s+/g, '-').toLowerCase());
    var shareLink = document.createElement('p');
    shareLink.innerHTML = "<strong>Shareable Link:</strong> <a href=\"".concat(uniqueURL, "\" target=\"_blank\">").concat(uniqueURL, "</a>");
    resumeContent.appendChild(shareLink);
    // Add button to download resume as PDF
    var pdfButton = document.createElement('button');
    pdfButton.textContent = 'Download as PDF';
    resumeContent.appendChild(pdfButton);
    // Event listener for generating and downloading the PDF
    pdfButton.addEventListener('click', function () {
        var pdfWindow = window.open('', '_blank');
        if (pdfWindow) {
            pdfWindow.document.write("\n        <html>\n          <head>\n            <title>Resume</title>\n          </head>\n          <body>\n            ".concat(resumeHTML, "\n          </body>\n        </html>\n      "));
            pdfWindow.document.close();
            pdfWindow.print();
        }
        else {
            console.error('Failed to open PDF window');
        }
    });
});
