document.addEventListener('DOMContentLoaded', () =>{
    

    document.querySelector('#follow_button').addEventListener('click', follow);

    


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
      
    if (search(user.followers, current_user) === current_user){
      


      const index = user.followers.indexOf(current_user);
      follow_button = document.querySelector('#follow_button');
      
      user.followers.splice(index, 1);
      let is_following = false;
      followButton.innerHTML = is_following ? 'Unfollow' : 'Follow'

      fetch(`http://127.0.0.1:8000/users/${user_to_follow}/`, {

        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),

      })

    }
    if(search(user.followers, current_user.username) != current_user && follow_button.innerHTML === 'Follow'){

    fetch(`http://127.0.0.1:8000/users/${user_to_follow}/`)
    .then(response => response.json())
    .then(user => {
        user.followers.push(current_user);
        const followButton = document.querySelector('#follow_button');
        
        let is_following = true;

        

        fetch(`http://127.0.0.1:8000/users/${user_to_follow}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      followButton.innerHTML = is_following ? 'Unfollow' : 'Follow';

      })

  }
});


}