document.addEventListener('DOMContentLoaded', () =>{
    
    
    document.querySelector('#follow_button').addEventListener('click', follow);


});
function follow(){
    const user_to_follow_data = document.querySelector('#profile_info');
    const user_to_follow = user_to_follow_data.getAttribute('data-user-id');
    
    const current_user_data = document.querySelector('#user');

    const current_user = current_user_data.getAttribute('data-current-user');
    const current_user_id = current_user_data.getAttribute('data-current-id');
    console.log(user_to_follow)
    const button = document.querySelector('#follow_button')

    var is_following = false;

    // try{
        const csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

        fetch(`/users/${user_to_follow}/?format=json`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CsSRFToken': csrftoken,
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

