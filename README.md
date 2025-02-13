CreateProduct.jsx


const addColor = (e) => {
    e.preventDefault(); // Prevent form submission
    if (!colors.includes(currentColor)) {
      setColors([...colors, currentColor]);
    }
  };

  const removeColor = (colorToRemove) => {
    setColors(colors.filter((color) => color !== colorToRemove));
  };
What it does:
e.preventDefault();
This prevents the default behavior of the button inside a <form>. Without this, clicking the button might cause the form to refresh the page.
if (!colors.includes(currentColor))
Checks if the currentColor is not already in the colors array.
setColors([...colors, currentColor]);
Adds the new currentColor to the colors array using the React state updater function.
setColors([...colors, currentColor]) creates a new array by spreading existing colors (...colors) and adding currentColor at the end.

  const removeColor = (colorToRemove) => {
  setColors(colors.filter((color) => color !== colorToRemove));
};

What it does:
Uses .filter() to remove the selected color from the colors array.
.filter() creates a new array containing only colors that are not equal to colorToRemove.
setColors(newArray) updates the state with the filtered list.

---------------------------------------------------------------------------------------------------------