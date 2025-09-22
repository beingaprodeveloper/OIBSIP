function convertTemperature() {
  let temp = document.getElementById("temperature").value;
  let fromUnit = document.getElementById("fromUnit").value;
  let toUnit = document.getElementById("toUnit").value;
  let result = document.getElementById("result");
  let historyList = document.getElementById("historyList");

  if (temp === "" || isNaN(temp)) {
    result.innerText = "❌ Please enter a valid number!";
    return;
  }

  temp = parseFloat(temp);
  let converted;

  // Convert to Celsius first
  let celsius;
  if (fromUnit === "C") celsius = temp;
  else if (fromUnit === "F") celsius = (temp - 32) * 5/9;
  else if (fromUnit === "K") celsius = temp - 273.15;

  // Convert from Celsius to target
  if (toUnit === "C") converted = celsius;
  else if (toUnit === "F") converted = (celsius * 9/5) + 32;
  else if (toUnit === "K") converted = celsius + 273.15;

  // Show Result with animation
  result.innerHTML = `${temp} °${fromUnit} → <b>${converted.toFixed(2)} °${toUnit}</b>`;
  result.classList.add("show");
  setTimeout(() => result.classList.remove("show"), 800);

  // Save to history with delete button
  let li = document.createElement("li");
  li.innerHTML = `${temp} °${fromUnit} → ${converted.toFixed(2)} °${toUnit} 
    <button class="delete-btn">❌</button>`;
  historyList.prepend(li);

  // Delete item on click
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
  });

  // Keep only 5 items in history
  if (historyList.childNodes.length > 5) {
    historyList.removeChild(historyList.lastChild);
  }
}

// Swap Units + Auto Convert
document.getElementById("swapBtn").addEventListener("click", () => {
  let fromUnit = document.getElementById("fromUnit");
  let toUnit = document.getElementById("toUnit");
  let temp = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = temp;

  // Auto-convert if input is not empty
  if (document.getElementById("temperature").value !== "") {
    convertTemperature();
  }
});
