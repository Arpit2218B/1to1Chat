let socket = null;
let username = null;

document.querySelector('.join__button').addEventListener('click', e => {
    username = document.querySelector('#join__text').value;
    if(!username || username.length === 0) {
        alert('Need a username to join chat');
        return;
    }
    document.querySelector('#join__text').disabled = true;
    document.querySelector('.join__button').disabled = true;
    document.querySelector('.join').innerHTML = `<h2>Joined in as : ${username}</h2>`;
    socket = io('localhost:3000', {query: `username=${username}`});
    
    socket.on('new_user', data => {
        displayUserCards(data);
    });
    
    socket.on('user_left', data => {
        displayUserCards(data);
    });
});

const displayUserCards = (data) => {
    let finalEle = '';
    data.forEach(user => {
        if(!(user.username === username)) {
            const ele = `<div class="usercard ${user.username}">
                            <p>${user.username}</p>
                            <div class="inputs">
                                <input type="text">
                                <button>Send</button>
                            </div>
                        </div>`;
            finalEle = finalEle + ele;
        }
    });
    document.querySelector('.userlist').innerHTML = finalEle;
}

//Search functionality
// document.querySelector('.search').addEventListener('keydown', (e) => {
//     const searchTerm = e.target.value;
//     document.querySelectorAll('.usercard').forEach(ele => {
//         const classname = ele.className;
//         if(!classname.includes(searchTerm)) {
//             ele.style.display = 'none';
//         }
//         else {
//             ele.style.display = '';
//         }
//     });
// });

// console.log('Hello');