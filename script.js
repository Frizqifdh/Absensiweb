// script.js
document.getElementById('openCamera').addEventListener('click', function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const constraints = {
        video: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            video.style.display = 'block';
            video.srcObject = stream;
        })
        .catch(function(err) {
            console.log("Error: " + err);
        });
    
    video.addEventListener('click', function() {
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        video.style.display = 'none';
        const idCardUrl = canvas.toDataURL('image/png');

        const name = document.getElementById('name').value;
        if (name && idCardUrl) {
            const tableBody = document.querySelector('#absensiTable tbody');
            const newRow = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = name;
            newRow.appendChild(nameCell);
            
            const dateCell = document.createElement('td');
            const currentDate = new Date().toLocaleString();
            dateCell.textContent = currentDate;
            newRow.appendChild(dateCell);
            
            const idCardCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = idCardUrl;
            img.alt = 'ID Card';
            img.style.width = '100px';
            idCardCell.appendChild(img);
            newRow.appendChild(idCardCell);
            
            tableBody.appendChild(newRow);
        }
    });
});

document.getElementById('absensiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('absensiForm').reset();
});
