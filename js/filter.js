let tbody = document.getElementById("tbody");
let searchInput = document.getElementById("search");
let locationSelect = document.getElementById("locationSearch"); // Changed to select element

// Fetch function
fetch("https://sierrachurches1.onrender.com/churches")
    .then(res => res.json())
    .then(json => {
        const allData = json; // Store all data for filtering
        renderTable(allData);

        // Populate the location dropdown options
        const uniqueLocations = [...new Set(allData.map(data => data.location))];
        uniqueLocations.forEach(location => {
            const option = document.createElement("option");
            option.value = location;
            option.textContent = location;
            locationSelect.appendChild(option);
        });

        // Event listener for search input
        searchInput.addEventListener("input", filterData);

        // Event listener for location select
        locationSelect.addEventListener("change", filterData);

        function filterData() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedLocation = locationSelect.value.toLowerCase(); // Get selected location
            let filteredData;

            if (selectedLocation === "") {
                filteredData = allData.filter(data => (
                    data.name.toLowerCase().includes(searchTerm) ||
                    data.address.toLowerCase().includes(searchTerm) ||
                    data.contact.toLowerCase().includes(searchTerm)
                ));
            } else {
                filteredData = allData.filter(data => (
                    (data.name.toLowerCase().includes(searchTerm) ||
                    data.address.toLowerCase().includes(searchTerm) ||
                    data.contact.toLowerCase().includes(searchTerm)) &&
                    (data.location.toLowerCase() === selectedLocation || selectedLocation === "all")
                ));
            }

            renderTable(filteredData);
        }
    });

// Render table rows
function renderTable(data) {
    tbody.innerHTML = ""; // Clear existing rows
    data.forEach(dataItem => {
        tbody.appendChild(td_fun(dataItem));
    });
}

// Create td
function td_fun({ logo, name, address, contact, location }) {
    let td = document.createElement("tr");
    td.innerHTML = `
    <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10">
                <img src="${logo}" class="h-10 w-10 rounded-full" alt="">
            </div>
            <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">
                    ${name}
                </div>
                <div class="text-sm text-gray-500">
                    ${address}
                </div>
            </div>
        </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
           ${contact}
        </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
        <span class="text-sm text-gray-500">${location}</span>
    </td>
    `;
    return td;
}