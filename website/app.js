/* Global Variables */
const apiKey    = "86fb0c21f009d6e0b625b3842a57ce97&units=metric";
const baseURL   = "http://api.openweathermap.org/data/2.5/weather?zip=";//{zip code},{country code}&appid={API key}";
const generateBtn = document.getElementById('generate');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

const getData = async (url, zipCode, apiKey)=>{
    const response = await fetch(url+zipCode+'&appid='+apiKey);
    try{
        const responseData = await response.json();
        return responseData;
    }catch(error){
        console.log("Error",error);
    }
};

const postData = async (url='',data={})=>{
    const postResponse = await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
    });
    try{
        const responseData = await postResponse.json();
        return responseData;
    }catch(error){
        console.log("Error",error);
    }
};

const showData = async ()=>{
    const data = await fetch('/allData');
    try{
        const jsonData = await data.json();
        document.getElementById('date').innerHTML       = jsonData.date;
        document.getElementById('temp').innerHTML       = jsonData.temperature;
        document.getElementById('content').innerHTML    = jsonData.userResponse;
    }catch(error){
        console.log("Error",error);
    }
};



generateBtn.addEventListener('click',generateClick);

function generateClick(){
    const userResponse = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    if(zipCode.length > 1 && !isNaN(Number(zipCode))){
        getData(baseURL,zipCode,apiKey).then(data=>{
            postData('/addData',{
                temperature :data.main.temp,
                date        :newDate,
                userResponse
            });
        })
        .then(()=>{
            showData();
        });
    }else{
        alert("Invalid ZipCode");
    }
};