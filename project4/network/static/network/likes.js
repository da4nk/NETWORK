function search(array, user) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === user) {
            return user;
        }
    }
    return -1;
}

document.addEventListener('DOMContentLoaded', () => {
    let like_button = document.querySelector('.fa-regular.fa-heart');
    let post = document.querySelector('#post_id_stuff');
    let post_id = post.getAttribute('data-current-post');
    let user = document.querySelector('#user');
    let user_id = user.getAttribute('data-current-user');
    console.log(post_id);

    like_button.addEventListener('click', () => {
        fetch(`post/${post_id}/`, {
            method: 'GET',
            headers: { 'X-CSRFToken': csrftoken },
    
        if (search(data.likes, user_id) !== user_id) {
                data.likes.pop(user_id);
                fetch(`post/${post_id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            }
        });


        fetch(`post/${post_id}/`, {
            method: 'GET',
            headers: { 'X-CSRFToken': csrftoken },
        if (search(data.likes, user_id) === user_id) {
            const index = data.likes.indexOf(user_id);
            data.likes.splice(index, 1);
            console.log(data.likes);

            fetch(`post/${post_id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        }});
    });