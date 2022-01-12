import { useEffect, useState } from "react";
function App() {
  //useState is a function that returns an array with two items in it.
  // the first item ( here called greeting ) is the value that you pass as an argument to use state, in this case an empty string ("")
  // the second item is a function ( here called setGreeting ) that we can use to change the value of the first item ( greeting )
  // when ever we call this function the App function will be called and the view will be updated with the new value
  const [greeting, setGreeting] = useState("");

  //useEffect is a function that takes a function and an array as arguments. The function runs once when the component loads
  // and then again if any of the state variables in the array are canged. What matters most here is that if you leave the array empty
  // the code in the function will only run once but not every time we call setGreeting (like the App function).
  useEffect(() => {
    const getGreeting = async () => {
      //to be able to use async and await in useEffect we need to create an async function.
      const response = await fetch("http://localhost:5001"); //we fetch from our api server running on port 5001
      const data = await response.json(); //we get the json data
      //the data is an array with one item. This item is an object with _id and greeting properties
      //this makes sense since we turned the data into an array in line 20 in server.js and the array is the collection from MongoDB
      //this collection has only one document and our objet represents the data in that document.

      //now let's get the string from greeting into our greeting state:
      setGreeting(data[0].greeting);
    };

    getGreeting();
  }, []);
  return <div>{greeting}</div>;
}

export default App;
