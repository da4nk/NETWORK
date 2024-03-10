function search(array, user) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === user) {
            return user;
        }
    }
    return -1;
}



function like(posts)
{
    let userelement = document.querySelector('#users');
    let user = userelement.dataset.currentuser;

    if (search(posts.likes, user) === -1) {
    
        posts.likes.push(user);
        posts.like_count += 1;        

    }
    else if (search(posts.likes, user) === user) {

        posts.likes.splice(posts.likes.indexOf(user), 1);
        posts.like_count -= 1;
        

    }
    fetch(`post/${posts.postid}/`, {
        method: 'PUT',
        body: JSON.stringify({likes: posts.likes, like_count: posts.like_count})
    });
   

}




function load_posts(){    

    fetch('post/').

    then(response => response.json()).then(data => {

        data.forEach(posts => {
            
    
        let post_Container = document.createElement('div');
        let div = document.createElement('div');
        let like_div = document.createElement('div');
        like_div.innerHTML = `<i style="cursor: pointer;" class="fa-regular fa-heart"></i>`;
        
    
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
                        
                        ${posts['like_count']}
                    </div>
                    
                    <div id = "edit" onclick = "post_edit()">
                    edit
                    </div>
                </div>`;

                  
        like_div.addEventListener('click', async (e) => {
            e.preventDefault();
            like(posts);
        });
        
            post_Container.appendChild(div);
            post_Container.appendChild(like_div);
            // Append the postContainer to the active-post
            document.querySelector('.active-post').appendChild(post_Container);
        });
    
        });
    }




document.addEventListener('DOMContentLoaded', () => {


    document.querySelector('.nav-link').addEventListener('click', load_posts());

function post_edit()
{
    edit = document.querySelector('#edit');
    

}
    
});
