function search(array, user) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === user) {
            return user;
        }
    }
    return -1;
}



document.addEventListener('DOMContentLoaded', () =>
{
    document.querySelector('#post_link').addEventListener('click', load_posts())    
    
});

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



function load_posts(currentpage) 
{    
    
    let userelement = document.querySelector('#users');
    
    let post_Container = document.createElement('div');
    post_Container.innerHTML = ' ';
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';


    if(userelement)
    {
        user = userelement.dataset.currentuser;
    fetch(`post/?page=${currentpage}`).then(response => response.json()).then(data => {
        let innerdata = data.post;
        innerdata.forEach(posts => {
    
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
        edit_button.classList.add('btn', 'btn-primary');
        

        
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
            paginate(data.total_pages);
            console.log(data.total_pages);
    
        });
     
    
        });
    }
    else
    {
    fetch(`post/?page=${currentpage}`).then(response => response.json()).then(data => {
        let innerdata = data.post;

        innerdata.forEach(posts => {

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
        paginate(data.total_pages);

   
        });
    });

    }

    }






function post_edit(post_Container, user, posts)
{   
    let edit_button = document.getElementById('edit_button_'+posts.postid);    
    
    if(user === posts.user)
    {
        let textarea = document.createElement('textarea');
        textarea.innerHTML = posts.text;
        textarea.classList.add('form-control');


        let oldElement = document.getElementById('post_text_'+posts.postid);

        oldElement.replaceChild(textarea, oldElement.childNodes[0])
        let save_button = document.createElement('button');
        save_button.innerHTML = 'Save';

        save_button.classList.add('btn', 'btn-primary');
        
        edit_button.style.visibility = 'hidden';

        
        post_Container.appendChild(save_button);
        
        save_button.addEventListener('click', () => {
        fetch(`post/${posts.postid}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({text: textarea.value})
            }); 
            oldElement.innerHTML = textarea.value;
            save_button.style.visibility = 'hidden';
            edit_button.style.visibility = 'visible';
        });
    }
}
function paginate(TotalPages)
{
    const pagination_container = document.querySelector('.pagination');

    pagination_container.innerHTML = ' ';

    for(let i = 1; i <= TotalPages; i++)
    {
        const page = document.createElement('a');
        page.textContent = `page ${i}`;
        page.href = '#';
        page.classList.add('p-4','m2');
        
        page.addEventListener('click', (e) =>
        {
            e.preventDefault();
            load_posts(i);
            document.querySelector(".active-post").innerHTML = '';
        });
        pagination_container.appendChild(page);

    }
    
}







