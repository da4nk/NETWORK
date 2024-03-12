document.addEventListener('DOMContentLoaded', () =>{
    

    document.querySelector('#follow_button').addEventListener('click', (e) => {
      window.location.reload();
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

  console.log('follow button clicked');
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
      window.location.reload();

      const index = user.followers.indexOf(current_user);
      user.followers.splice(index, 1);
      let follower_count = user.follower_count;
      document.querySelector('#follower_count').innerHTML = `Followers: ${follower_count}`;
;
    }
    else if(search(user.followers, current_user.username) != current_user){
      window.location.reload();
      user.followers.push(current_user);
      let follower_count = user.follower_count;
      document.querySelector('#follower_count').innerHTML = `Followers: ${follower_count}`;
  
    }
  fetch(`http://127.0.0.1:8000/users/${user_to_follow}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({followers: user.followers, follower_count: user.follower_count})
  })

  console.log(user.followers);

});


}