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

});

function load_posts(){    

fetch('post/').
then(response => response.json()).then(data => {
    data.forEach(posts => {

    let div = document.createElement('div');
    let like_div = document.createElement('div');
    like_div.innerHTML = `<i style="cursor: pointer;" class="fa-regular fa-heart"></i>`;
    
    console.log(posts.postid);

    like_div.addEventListener('click', (e) => {
        e.preventDefault();
        like(posts.postid);
    });
    let like_button_container = document.createElement('div');
    like_button_container.classList.add('container');


        
        div.innerHTML = `
            <div>
                <div class="card post-card">
                    <h2><a href="profile/${posts.user_id}/">${posts.user}</a></h2>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${posts.text}</h5>
                    <p class="card-text">Posted ${posts.date}</p>
                    ${like_button_container.outerHTML} <i>${posts.like_count}</i>
                </div>
                <div class="card-footer text-body-secondary">
                    Comment
                </div>
            </div>`;


      document.querySelector('.active-post').appendChild(div);
      document.querySelector('.container').appendChild(like_div);





    });

    });
}

function like(post_id)
{

    let userelement = document.querySelector('#users');
    let user = userelement.dataset.currentuser;
    let likes = document.querySelector('.fa-heart');
    fetch(`post/${post_id}/`, {}).then(response => response.json()).then(data => {
        if (search(data.likes, user) === -1) {
            data.likes.push(user); // Push the 'user' into the 'data.likes' array

            fetch(`post/${post_id}/`, {
                method: 'POST',
                body: JSON.stringify(data) // Send the updated 'data' object as the request body
            }).then(response => response.json()).then(data => {
                // Handle the response data if needed
                likes.innerHTML = data.like_count;
            });
        }

        if(search(data.likes, user) === user) {
            data.likes.pop(user);
            fetch(`post/${post_id}/`, {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(response => response.json()).then(data => {
                likes.innerHTML = data.like_count;
            });
        }
    });



    
}


