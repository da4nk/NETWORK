function search(array, user) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === user) {
            return user;
        }
    }
    return -1;
}


document.addEventListener('DOMContentLoaded', () => {



    
async function like(posts, count_element)
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
    try{
        const response = await fetch(`post/${posts.postid}/`, {
            method: 'PUT',
            body: JSON.stringify({likes: posts.likes, like_count: posts.like_count})
        });
        if(!response.ok){
            throw new Error('Error');
        } 
        else  // if response ok
        {            
            const updatedCountElement = document.getElementById(count_element);
            if(updatedCountElement){
                updatedCountElement.innerHTML = posts.like_count;

            
            }


        }
    }
    catch(error){
        console.log(error);
    }


   

}



function load_posts() 
{    
    
    let userelement = document.querySelector('#users');
    let user = userelement.dataset.currentuser;
    if(user)
    {
    fetch('post/').then(response => response.json()).then(data => {

        data.forEach(posts => {
    
        let post_Container = document.createElement('div');
        let div = document.createElement('div');
        
    
        let like_button_container = document.createElement('div');
        like_button_container.classList.add('container');
            
        let count_element = document.createElement('p');
        count_element.id = `likeCount_${posts.postid}`;
        count_element.innerHTML = posts.like_count;
        

        let like_div = document.createElement('div');

        like_div.innerHTML = `<i style="cursor: pointer;" class="fa-regular fa-heart"></i>`;
        edit_button = document.createElement('p');
        edit_button.id = `edit_button_${posts.postid}`;
        edit_button.innerHTML = 'Edit';
        

        
        div.innerHTML = `
                <div>
                    <div class="card post-card">
                        <h2><a href="profile/${posts.user_id}/">${posts.user}</a></h2>
                    </div>
                    <div class="card-body">
                        <h5 id = 'post_text_${posts.postid}' class="card-title">${posts.text}</h5>
                        <p class="card-text">Posted ${posts.date}</p> 
                        ${count_element.outerHTML} 

                    </div>
                </div>`;
            like_div.addEventListener('click', () => like(posts, count_element.id));
            edit_button.addEventListener('click', () => post_edit(post_Container, user, posts));   
                  
      
  
        
            post_Container.appendChild(div);
            post_Container.appendChild(like_div);
            if(user === posts.user)
            {
            post_Container.appendChild(edit_button);

                

            }
            // Append the postContainer to the active-post

            document.querySelector('.active-post').appendChild(post_Container);
        });
    
        });
    }
    else
    {
    fetch('post/').then(response => response.json()).then(data => {

        data.forEach(posts => {

        let count_element = document.createElement('p');
        count_element.id = `likeCount_${posts.postid}`;
        count_element.innerHTML = posts.like_count;


        
        let post_Container = document.createElement('div');
        let div = document.createElement('div');


        let like_div = document.createElement('div');

        like_div.innerHTML = `<i style="cursor: pointer;" class="fa-regular fa-heart"></i>`;


           
        let like_button_container = document.createElement('div');
        like_button_container.classList.add('container');
        
        
        div.innerHTML = `
        <div>
            <div class="card post-card">
                <h2><a href="profile/${posts.user_id}/">@${posts.user}</a></h2>
            </div>
            <div class="card-body">
                <h5 class="card-title ">${posts.text}</h5>
                <p class="card-text">Posted ${posts.date}</p> 
            </div>
     
            ${count_element.outerHTML}

        </div>`;
 
        post_Container.appendChild(div);
        post_Container.appendChild(like_div);
        document.querySelector('.active-post').appendChild(post_Container);
   
        });
    });
    }
    }





document.querySelector('.nav-link').addEventListener('click', load_posts());

function post_edit(post_Container, user, posts)
{   
    let edit_button = document.getElementById('edit_button_'+posts.postid);    
    edit_button.style.display = 'none';
    if(user === posts.user)
    {
    let textarea = document.createElement('textarea');
    textarea.innerHTML = posts.text;
    textarea.classList.add('form-control');
    let text = document.getElementById('post_text_'+posts.postid).replaceWith(textarea)
    let save_button = document.createElement('button');
    save_button.innerHTML = 'Save';

    save_button.classList.add('btn', 'btn-primary');

    post_Container.appendChild(save_button);

    save_button.addEventListener('click', () => {
        posts.text = textarea.value;
        fetch(`post/${posts.postid}/`, {
            method: 'PUT',
            body: JSON.stringify({text: posts.text})
        });
        text = textarea.value;
        textarea.replaceWith(text);
        save_button.style.display = 'none';

    });


    }

    


 
}
});
