function fetchStations(callback) {
    fetch('https://apis.is/petrol')
        .then(response => response.json())
        .then(json => callback(null, json))
        .catch(error => callback(error, null))
}

fetchStations((error, stations) => {
    if(error) { console.log(error); }
    
    else {
        let bensinArray = [];
        
        let container = document.getElementById('container');

        for(let i = 0; i < stations['results'].length; i++) {
            bensinArray.push(stations['results'][i]['bensin95']);


            if (!document.getElementById(`${stations['results'][i]['company']}`)) {
                let newDiv = document.createElement('div');
                newDiv.setAttribute('id', `${stations['results'][i]['company']}`);
                newDiv.classList.add('center-text');

                let newH = document.createElement('H2');
                let stationNameForDiv = document.createTextNode(`${stations['results'][i]['company']}`);
                newH.appendChild(stationNameForDiv);
                newDiv.appendChild(newH);
                container.appendChild(newDiv);
                container.appendChild(document.createElement('hr'));
            }
            if (document.getElementById(`${stations['results'][i]['company']}`)) {
                

                let newContainerDiv = document.createElement('div');
                newContainerDiv.classList.add('gridClass');

                
                let pname = document.createElement('p');
                let pbensin = document.createElement('p');
                let pdiesel = document.createElement('p');

                
                let nameNode = document.createTextNode(stations['results'][i]['name']);
                let bensinNode = document.createTextNode(`Bensín: ${stations['results'][i]['bensin95']}`);
                let dieselNode = document.createTextNode(`Dísel: ${stations['results'][i]['diesel']}`);

                
                pname.appendChild(nameNode);
                pbensin.appendChild(bensinNode);
                pdiesel.appendChild(dieselNode);

                
                newContainerDiv.appendChild(pname);
                newContainerDiv.appendChild(pbensin);
                newContainerDiv.appendChild(pdiesel);

                document.getElementById(`${stations['results'][i]['company']}`).appendChild(newContainerDiv);
            }
        }
        let yearTime = stations['timestampApis'].slice(0, 4);
        let monthTime = stations['timestampApis'].slice(5, 7);
        let dayTime = stations['timestampApis'].slice(8, 10);
        let hour = stations['timestampApis'].slice(11, 13);
        let minute = stations['timestampApis'].slice(14, 16)

        let time = `Síðast uppfært: ${dayTime}/${monthTime}/${yearTime} klukkan ${hour}:${minute}`;
        
        document.getElementById('timestamp').innerHTML = time;

        document.getElementById('max').innerHTML = `Dýrast: ${Math.max.apply(Math, bensinArray)}`;
        document.getElementById('min').innerHTML = `Ódýrast: ${Math.min.apply(Math, bensinArray)}`;
    }
})