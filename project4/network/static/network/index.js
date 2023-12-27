document.addEventListener('DOMContentLoaded', () =>{
    
    

    document.querySelector('#follow_button').addEventListener('click', follow)


});
function follow(){
    const user_to_follow_data = document.querySelector('#profile_info');
    var user_to_follow = user_to_follow_data.getAttribute('data-user-id');


    const current_user_data = document.querySelector('#user');
    
    var current_user = current_user_data.getAttribute('data-current-user');
    var current_user_id = current_user_data.getAttribute('data-current-id');
    console.log(profile);

    console.log(current_user.id);
    fetch(`/users/${profile}`,
    {
        method: 'PUT',
        

    })
}

