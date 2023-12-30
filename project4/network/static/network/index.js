document.addEventListener('DOMContentLoaded', () =>{
    
    
    document.querySelector('#follow_button').addEventListener('click', follow);


});
function follow(){
    const user_to_follow_data = document.querySelector('#profile_info');
    const user_to_follow = user_to_follow_data.getAttribute('data-user-id');
    
    const current_user_data = document.querySelector('#user');

    const current_user = current_user_data.getAttribute('data-current-user');

    console.log(user_to_follow)
    const button = document.querySelector('#follow_button');

    var is_following = false;

    // try{

        const data = {
            
                following: [],
                followers: []
        }
        data.followers.push(current_user);

        console.log(user_to_follow, current_user);
        fetch(`http://127.0.0.1:8000/users/${user_to_follow}/`,
        {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
                // 'X-CSRFToken': csrftoken,

              },
          
            body: JSON.stringify(data) 
        }).then(response => {
            if(!response.ok)
            {
                throw new Error('not workin');
            }
        })
        button.innerHTML = 'unfollow'
        is_following = true
    

    // catch(is_following){
    //     button.innerHTML = 'Follow'
    //     fetch(`/users/${user_to_follow}/`,
    //     {
    //         method: 'DELETE',
    //         body: JSON.stringify(
    //             {
    //                 followers: ''
    //             }
    //         ) 
    //     });
    // }
}

