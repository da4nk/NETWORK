function search(array, user) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === user) {
            return user;
        }
    }
    return -1;
}

document.addEventListener('DOMContentLoaded', () => {


    document.querySelector('.nav-link').addEventListener('click', load_posts());
    like_button.addEventListener('click', like());
});

function like() {

    let like_button = document.querySelector('.fa-regular.fa-heart');
    let post = document.getElementsByClassName('post_id_stuff');
    let post_id = post.getAttribute('data-current-post');
    let user = document.querySelector('#user');
    let user_id = user.getAttribute('data-current-user');
    console.log(post_id);
    fetch(`post/${post_id}/`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json' },
    }).
    then(response => response.json()).then(post => {

        post.forEach(data => {
            
            if (search(data.likes, user_id) != user_id) {

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
    });


    fetch(`post/${post_id}/`, {
        method: 'GET',

    }).then(response => response.json()).then(data => {



        if (search(data.likes, user_id) === user_id) {

            const index = data.likes.indexOf(user_id);
            data.likes.splice(index, 1);
            console.log('unfollow');

            fetch(`post/${post_id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        }
    });

}

function load_posts(){

    let div = document.createElement('div');
    

fetch('post/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => response.json())
.then(data => {

    data.forEach(posts => {
    const like_div = `<i style="cursor: pointer;" class="fa-regular fa-heart"></i> ${posts.like_count}`;

        div.innerHTML = `
        <div >
        <div class = "card post-card">
          <h2><a href="profile/${posts.user_id}">${posts.user}</a></h2>
        </div>
        <div class="card-body">
          <h5 class="card-title"> ${posts.text}</h5>
          <p class="card-text"> Posted ${posts.date}</p>
          ${like_div}
          <div class="post_id_stuff" data-current-post="${posts.id}"></div>
        </div>
        <div class="card-footer text-body-secondary">
          Comment
        </div>
      </div>`;

    });
});
document.querySelector('.active-post').appendChild(div);

}