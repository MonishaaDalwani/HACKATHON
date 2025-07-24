document.addEventListener('DOMContentLoaded', () => {
    const addTurfForm = document.getElementById('addTurfForm');
    const turfsContainer = document.getElementById('turfsContainer');

    
    let turfs = JSON.parse(localStorage.getItem('turfs')) || [];

    
    function renderTurfs() {
        turfsContainer.innerHTML = '';
        if (turfs.length === 0) {
            turfsContainer.innerHTML = '<p>No turfs added yet.</p>';
            return;
        }

        turfs.forEach((turf, index) => {
            const turfItem = document.createElement('div');
            turfItem.classList.add('turf-item');
            turfItem.innerHTML = `
                <h3>${turf.name}</h3>
                <p><strong>Location:</strong> ${turf.location}</p>
                <p><strong>Pricing:</strong> ₹${turf.pricing} per hour</p>
                <p><strong>Available Hours:</strong> ${turf.availableHours}</p>
                <div class="actions">
                    <button class="delete-btn" data-index="${index}">Delete</button>
                    </div>
            `;
            turfsContainer.appendChild(turfItem);
        });

       
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const indexToDelete = event.target.dataset.index;
                deleteTurf(indexToDelete);
            });
        });
    }

    
    addTurfForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const turfName = document.getElementById('turfName').value;
        const turfLocation = document.getElementById('turfLocation').value;
        const turfPricing = parseFloat(document.getElementById('turfPricing').value);
        // This line remains the same as it correctly gets the selected option's value
        const turfAvailableHours = document.getElementById('turfAvailableHours').value;

        const newTurf = {
            id: Date.now(), 
            name: turfName,
            location: turfLocation,
            pricing: turfPricing,
            availableHours: turfAvailableHours,
            bookings: [] 
        };

        turfs.push(newTurf);
        localStorage.setItem('turfs', JSON.stringify(turfs)); 
        renderTurfs(); 
        addTurfForm.reset(); 
    });

    
    function deleteTurf(index) {
        turfs.splice(index, 1); 
        localStorage.setItem('turfs', JSON.stringify(turfs)); 
        renderTurfs(); 
    }

   
    renderTurfs();

   
    const pendingBookingsContainer = document.getElementById('pendingBookings');

    pendingBookingsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('approve-btn')) {
            alert('Booking Approved!');
        
        } else if (event.target.classList.contains('reject-btn')) {
            alert('Booking Rejected!');
           
        }
    });
});