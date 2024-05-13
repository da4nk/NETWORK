document.addEventListener('DOMContentLoaded', () =>{
    

    document.querySelector('#follow_button').addEventListener('click', (e) => {
      const followButton = e.target;

      followButton.innerHTML = (followButton.innerHTML === 'Follow') ? 'Unfollow' : 'Follow';

      follow();
    });

    


});        


function search(array, user){
  for(let i = 0; i < array.length; i++){
    if(array[i] === user){
      return user
    }

  } 
  return -1
}


async function follow(){

    const user_to_follow_data = document.querySelector('#profile_info');

    const user_to_follow = user_to_follow_data.getAttribute('data-user-id');
    
    const current_user_data = document.querySelector('#user');

    const current_user = current_user_data.getAttribute('data-current-user');

    fetch(`http://127.0.0.1:8000/users/${user_to_follow}/`)
    .then(response => response.json())
    .then(user => {
      // checks if user is already following 
  
    let follow_button = document.querySelector('#follow_button');
    if (search(user.followers, current_user) === current_user ){
      const index = user.followers.indexOf(current_user);
      user.followers.splice(index, 1);
      user.follower_count -= 1;
    }
    else{
      user.followers.push(current_user);
      user.follower_count += 1;
    }

    fetch(`http://127.0.0.1:8000/users/${user_to_follow}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({followers: user.followers, follower_count: user.follower_count})
      })
    
   


});


}