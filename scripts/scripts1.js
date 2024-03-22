// Define Item class
class Item {
    constructor(name, category, price, quantity) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }
}

// Initialize inventory array
let inventory = [];

// Function to add item to inventory
function addItemToInventory(name, category, price, quantity) {
    const newItem = new Item(name, category, price, quantity);
    inventory.push(newItem);
    updateInventoryTable();
}

// Function to update inventory table
function updateInventoryTable() {
    const tableBody = document.querySelector("#inventoryTable tbody");
    tableBody.innerHTML = ""; // Clear previous content

    inventory.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to display notification for low stock items
function checkStockLevels() {
    const notificationArea = document.getElementById("notification");
    notificationArea.innerHTML = ""; // Clear previous notification

    inventory.forEach(item => {
        if (item.quantity <= 3) {
            const notification = document.createElement("p");
            notification.textContent = `${item.name} is low in stock (${item.quantity} left)`;
            notificationArea.appendChild(notification);
        }
    });
}

// Event listener for form submission to add new item
const addItemForm = document.getElementById("addItemForm");
addItemForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const itemName = document.getElementById("itemName").value;
    const category = document.querySelector('input[name="category"]:checked').value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    addItemToInventory(itemName, category, price, quantity);
    checkStockLevels(); // Check stock levels after adding item
    addItemForm.reset(); // Reset form fields
});

// Initial update of inventory table
updateInventoryTable();
checkStockLevels();
