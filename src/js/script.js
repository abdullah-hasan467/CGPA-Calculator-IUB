const getID = (inputID) => {
  const element = document.getElementById(inputID); // Correctly fetch the element
  if (element) {
    const inputValue = element.value; // Get the value of the input field
    console.log(inputValue); // Log the value
  } else {
    console.error(`Element with ID '${inputID}' not found.`);
  }
};

// Call the function with the ID as a string
getID('creditID');

function calculateResult(){
console.log("Hlw")
}







const displayResult = (calculatedResult) =>{

}
