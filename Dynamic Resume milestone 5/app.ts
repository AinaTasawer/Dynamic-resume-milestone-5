// Get the form and resume content elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeContent = document.getElementById('resume-content') as HTMLDivElement;

// Event listener for form submission
form.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  // Get form input values
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const education = (document.getElementById('education') as HTMLTextAreaElement).value;
  const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
  const skills = (document.getElementById('skills') as HTMLInputElement).value;

  // Generate resume content
  const resumeHTML = `
    <h3>${name}</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Education:</strong> ${education}</p>
    <p><strong>Work Experience:</strong> ${experience}</p>
    <p><strong>Skills:</strong> ${skills}</p>
  `;

  // Inject resume content into the div
  resumeContent.innerHTML = resumeHTML;

  // Create a unique URL for sharing the resume
  const uniqueURL = `${window.location.origin}/resume/${name.replace(/\s+/g, '-').toLowerCase()}`;
  const shareLink = document.createElement('p');
  shareLink.innerHTML = `<strong>Shareable Link:</strong> <a href="${uniqueURL}" target="_blank">${uniqueURL}</a>`;
  resumeContent.appendChild(shareLink);

  // Add button to download resume as PDF
  const pdfButton = document.createElement('button');
  pdfButton.textContent = 'Download as PDF';
  resumeContent.appendChild(pdfButton);

  // Event listener for generating and downloading the PDF
  pdfButton.addEventListener('click', () => {
    const pdfWindow = window.open('', '_blank');

    if (pdfWindow) {
      pdfWindow.document.write(`
        <html>
          <head>
            <title>Resume</title>
          </head>
          <body>
            ${resumeHTML}
          </body>
        </html>
      `);
      pdfWindow.document.close();
      pdfWindow.print();
    } else {
      console.error('Failed to open PDF window');
    }
  });
});
