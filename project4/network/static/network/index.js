document.addEventListener('DOMContentLoaded', () =>{
    
    
    document.querySelector('#follow_button').addEventListener('submit', follow);


});
function follow(){
    const user_to_follow_data = document.querySelector('#profile_info');
    const user_to_follow = user_to_follow_data.getAttribute('data-user-id');
    
    const current_user_data = document.querySelector('#user');

    const current_user = current_user_data.getAttribute('data-current-user');
    const current_user_id = current_user_data.getAttribute('data-current-id');
    console.log(user_to_follow)
    const button = document.querySelector('#follow_button');

    var is_following = false;

    // try{
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        const auth_token = 'bb0be4fca9f83f06e2a2d9049f34a7f0760798f3';
        console.log('faksldfjs');
        fetch(`users/${user_to_follow}/`,
        {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${auth_token}`,
                'X-CSRFToken': csrftoken,

              },
          
            body: JSON.stringify(
                {
                    followers: current_user
                }
            ) 
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

