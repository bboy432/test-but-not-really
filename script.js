const dropzone = document.getElementById('dropzone');
const gallery = document.getElementById('gallery');
const uploadButton = document.createElement('button'); // Create upload button element

uploadButton.textContent = 'Upload Photos'; // Set button text
dropzone.appendChild(uploadButton); // Add button to dropzone

// Event listeners for drag and drop
dropzone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropzone.classList.add('dragover'); // Add visual effect on drag over
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dragover');
});

// Event listener for drop and button click (combined)
dropzone.addEventListener('drop', (event) => {
  event.preventDefault();
  const files = event.dataTransfer ? event.dataTransfer.files : event.target.files; // Check for drag/drop or button click

  for (const file of files) {
    if (file.type.startsWith('image/')) {
      // Handle the image file (create preview element, upload to server, etc.)
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        gallery.appendChild(img);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Only image files are allowed!');
    }
  }
});

// Event listener for button click (optional)
uploadButton.addEventListener('click', () => {
  // Simulate a click event on a hidden file input element (for traditional file selection)
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.multiple = true; // Allow multiple file selection
  fileInput.accept = 'image/*'; // Only accept image files
  fileInput.style.display = 'none'; // Hide the file input element
  document.body.appendChild(fileInput);

  fileInput.click(); // Trigger click event on the file input

  // Handle file selection after the click event (similar logic as drag/drop)
  fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    for (const file of files) {
      // ... (same image handling logic as drag/drop)
    }
    document.body.removeChild(fileInput); // Remove the temporary file input element
  });
});
