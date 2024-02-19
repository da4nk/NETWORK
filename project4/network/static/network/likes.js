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
        like(posts);
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
                
                <div id = "edit" onclick = "post_edit()">
                edit
                </div>
            </div>`;


      document.querySelector('.active-post').appendChild(div);
      document.querySelector('.container').appendChild(like_div);





    });

    });
}

function like(posts)
{

    let userelement = document.querySelector('#users');
    let user = userelement.dataset.currentuser;
    let likes = document.querySelector('.fa-heart');
    if (search(posts.likes, user) === -1) {
        posts.likes.push(user);
        posts.like_count += 1;
        fetch(`post/${posts.postid}/`, {
            method: 'PUT',
            body: JSON.stringify(posts) // Send the updated 'data' object as the request body
        });
    }
    if(search(posts.likes, user) === user)
    {
        posts.likes.splice(posts.likes.indexOf(user), 1);
        posts.like_count -= 1;
        fetch(`post/${posts.postid}/`, {
            method: 'PUT',
            body: JSON.stringify({ likes: posts.likes, like_count: posts.like_count })
        });
    }
}

function post_edit()
{
    edit = document.querySelector('#edit');
    

}
    


