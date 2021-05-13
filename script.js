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

    socket.on('new__message', (fromUser, msg) => {
        addMessage(fromUser, msg);
    });
});

const sendMessage = (userid, username) => {
    const msg = document.querySelector(`#msg_${userid}`).value;
    if(!msg && msg.length === 0)
        return;
    socket.emit('send__message', userid, msg);
    document.querySelector(`#msg_${userid}`).value = '';
    addMessage('You', msg);
}

const addMessage = (username, msg) => {
    let pEle = document.createElement('p');
    const content = `<span class="userchat">${username}</span> : ${msg}`;
    pEle.innerHTML = content;
    document.querySelector('.right').appendChild(pEle);
}

const displayUserCards = (data) => {
    let finalEle = '';
    data.forEach(user => {
        if(!(user.username === username)) {
            const ele = `<div class="usercard ${user.username}">
                            <p>User: ${user.username}</p>
                            <div class="inputs">
                                <input type="text" id="msg_${user.userid}">
                                <button onclick="sendMessage('${user.userid}', '${user.username}')">Send</button>
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