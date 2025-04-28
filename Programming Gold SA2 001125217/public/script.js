
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addWishButton');
    const wishList = document.getElementById('wishList');
    const newWishInput = document.getElementById('newWish');

    addButton.addEventListener('click', function() {
        const wishText = newWishInput.value;
        if (wishText === '') {
            alert('Please enter a wish!');
            return;
        }

        const li = document.createElement('li');
        li.textContent = wishText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            wishList.removeChild(li);
        };

        li.appendChild(deleteButton);
        wishList.appendChild(li);

        newWishInput.value = ''; 
    });
});
function performSearch() {
    var input = document.getElementById('searchInput').value;
    if (input) {
        
        window.location.href = 'https://fixr.co' + encodeURIComponent(input);
    } else {
        alert('please type the key words');
    }
}

button.addEventListener('click', () => {
    postComment(tx.value);
});


tx.addEventListener('keyup', e => {
    if (e.key === 'Enter' && !e.shiftKey) {  
        e.preventDefault();  
        postComment(tx.value);
    }
});


function postComment(comment) {
    if (comment.trim() === '') {
        alert('Pls do not send blank comment！');
        return;
    }

    fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: comment.trim() })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fabu();  
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    
    tx.value = '';
    total.innerHTML = '0/200words';
}
