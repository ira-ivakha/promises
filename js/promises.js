// paallel execution - timeouts
// document.getElementById('button').onclick = function () {
//
//     let tasksArray = document.getElementById('promises-wrapper').querySelectorAll('li');
//     let promises = [];
//
//     tasksArray.forEach(function(task){
//
//         let promise = new Promise(function(success, error) {
//             task.innerHTML = '';
//             let randomTimeout = Math.floor(Math.random()*2000);
//             setTimeout(
//                 function(){
//                   // success
//                   // return success();
//                   // success/error
//                   if (randomTimeout < 1000) { success() }
//                   else {error();}
//                 },
//                 randomTimeout );
//         });
//         console.dir(promise);
//         promises.push(promise);
//     });
//
//     for (let i=0;i<promises.length; i++) {
//         promises[i].then(
//             function(){
//             tasksArray[i].innerHTML = `finished! next started..`;
//         },
//             function(error){
//             console.log('error at task ', i);
//         });
//
//         // promises[i].catch(function(){});
//     }
//
//     let allDone = Promise.all(promises);
//     let finalMessage = document.getElementById('promises-all');
//
//     allDone.then(() => {finalMessage.innerHTML = `all promises done`;}
//         , (error) => { finalMessage.innerHTML = 'one of promises called error'; }
//     );
// };

// promise in XHR request

// document.getElementById('request-number').onclick = function(){
//         let url = `https://numbersapi.p.mashape.com/${document.getElementById('number').value}/math`;
//
//         let xhrPromise = new Promise(function(resolve, reject) {
//
//             let xhttp = new XMLHttpRequest();
//             xhttp.onreadystatechange = function() {
//                 console.log('Request state: ', this.readyState);
//
//                 if (this.readyState == 4 && this.status == 200) {
//                     document.getElementById("demo").innerHTML = xhttp.responseText;
//                 }
//             };
//
//
//             xhttp.open("GET", url, true);
//             xhttp.setRequestHeader('X-Mashape-Key', '0npu3bFoKHmshfCQIY0QxQ1BM4etp1yBQjmjsnrSvssvI2XBdu');
//             xhttp.send();
//             xhttp.onload = function() {
//                 if (this.status == 200) {
//                     // console.log('request success, we got response');
//                     resolve(this.response);
//                 } else {
//                     var error = new Error(this.statusText);
//                     error.code = this.status;
//                     reject(error);
//                 }
//             };
//         });
//
//         xhrPromise.then(function () {
//             console.log('request success, we got response');
//         }, function(error){
//             console.log('request finished with next error: ', error);
//         })
//
// };

// consistent execution - timeouts

// document.getElementById('button').onclick = function () {
//
//     let tasksArray = document.getElementById('promises-wrapper').querySelectorAll('li');
//
//     let promise = Promise.resolve();
//     tasksArray.forEach(function(task){
//       task.innerHTML = '';
//       promise = promise.then(function(){
//           return new Promise(function(success, error) {
//               let randomTimeout = Math.floor(Math.random()*2000);
//               task.innerHTML = 'stattime to finish ' + randomTimeout + ' ms';
//
//               setTimeout(
//                   function(){
//                     task.innerHTML = 'finished';
//
//                     // success
//                     return success();
//                     // success/error
//                     // if (randomTimeout < 1000) { success() }
//                     // else {error();}
//
//                   },
//                   randomTimeout );
//           });
//         })
//     });
//
// };

// consistent execution - XHR requests
document.getElementById('request-number').onclick = function(){

    let numbersArray = [5, 18, 22, 45, 999],
        placeForResponse = document.getElementById('demo');
    placeForResponse.innerHTML = '';

    let promise = Promise.resolve();

    numbersArray.forEach(function(number){
        promise = promise.then(function () {
            return new Promise(function (resolve, reject) {
                let url = `https://numbersapi.p.mashape.com/${number}/math`;
                // console.log(url);
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    // console.log('Request state: ', this.readyState);

                    if (this.readyState == 4 && this.status == 200) {
                        let content = document.createElement('p');
                        content.innerHTML = xhttp.responseText;
                        placeForResponse.appendChild(content);
                    }
                };


                xhttp.open("GET", url, true);
                xhttp.setRequestHeader('X-Mashape-Key', '0npu3bFoKHmshfCQIY0QxQ1BM4etp1yBQjmjsnrSvssvI2XBdu');
                xhttp.send();
                xhttp.onload = function () {
                    if (this.status == 200) {
                        console.log('request success, we got response');
                        return resolve();
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };
            });
        })
    })

    promise.then(function () {
        console.log('request success, we got response');
    });

};
