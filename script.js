const res = document.getElementById("output");

// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(promiseName){
  return new Promise((resolve)=>{
    // Random time between 1 and 3 seconds; 1000,2000,3000
    const time=Math.floor(Math.random()*3+1)
    setTimeout(()=>resolve({name:promiseName,time:time}),time*1000);
  });
}

// Create 3 promises
const promises=[
    createRandomPromise('Promise 1'),
    createRandomPromise('Promise 2'),
    createRandomPromise('Promise 3'),
];

async function func(){
const start=new Date();
// Adding the loading row
res.innerHTML+=`
        <tr id="loading">
            <td colspan=2>Loading...</td>
        </tr>
`;

  // Use Promise.all to wait for all promises to resolve
  await Promise.all(promises)
        .then((results)=>{
             // Remove the loading row
            res.innerHTML=``;

            // Populate the table with the resolved values
            results.forEach((e)=>{
                res.innerHTML+=`
                <tr>
                    <td>${e.name}</td>
                    <td>${e.time}</td>
                </tr>
                `;
            });


        })
        .catch((error)=>console.error(error));

      // Add the total time row
      const end = new Date();
      const timeInMillisec = end - start;
        res.innerHTML += `
            <tr>
                <td>Total</td>
                <td>${timeInMillisec / 1000}</td>
            </tr>
          `;
}

func();