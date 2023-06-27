let apiUrl='https://api.github.com/users/';

// Elements

let search=document.querySelector('.search');
let searchBtn=document.querySelector('.search-button');
let profileImg=document.querySelector('.profile-image');
let output=document.querySelector('.output-section');
let msg=document.querySelector('.message');
let toggleColor=document.querySelector('.light-dark');
let text=document.querySelector('.text');
let icon=document.querySelector('.icon');


async function getUser(username){
    let data=await fetch(apiUrl+username);
    let jsonData=await data.json();
    console.log(jsonData);

    if(jsonData.message=='Not Found'){
        // console.log('true')
        msg.classList.add('active');
        output.classList.add('hidden');
        output.innerHTML="";
        setTimeout(async function(){
            msg.classList.remove('active');
            output.classList.remove('hidden');
            await getUser('codeitmywaywithHarsh07');
        },7000);
    }
    else{

        let result = `
                <div class="left-section flex">
                    <img src="${jsonData.avatar_url
                    }" alt="profile-image" class="profile-image">

                    <div class="repos">
                        <div class="repo-heading">Repos<br><span class="bold">${jsonData.public_repos}</span>
                        </div>
                        <div class="repo-tags flex">
                            
                        </div>
                    </div>
                </div>
    
                <div class="profile-details flex">
    
                    <div class="details">
                        <p class="name_join flex">
                            <span class="name">${jsonData.name}</span>
                            <span class="date">
                            <i class="fa-solid fa-location-dot"></i>
                            ${jsonData.location}</span>
                        </p>

                        <a class="github-link" href=${jsonData.html_url
                        }>@${jsonData.login
                        }</a>

                        <p class="about">${jsonData.bio
                        }</p>

                        <div class="repo-follow flex">
    
                            <div class="followers">
                                <span class="follow">Followers</span><center><span class="bold">${jsonData.followers
                                }</span></center>
                            </div>
            
                            <div class="following">
                                <span class="follow">Following</span><center><span class="bold">${jsonData.following
                                }</span></center>
                            </div>
            
                        </div>
                    </div>
    
                </div>
    `;

    output.innerHTML=result;

    getRepos(username);

        
    }
}
// Initial appearance
getUser('codeitmywaywithHarsh07');

// <a href="" class="tags"></a>
// <a href="" class="tags"></a>
// <a href="" class="tags"></a> 
// <i class="fa-solid fa-sun"></i>
async function getRepos(username){
    let repoTags=document.querySelector('.repo-tags');
    let data=await fetch(apiUrl+username+'/repos');
    let jsonData=await data.json();
    // console.log(jsonData);

    jsonData.forEach((repo) => {
        // console.log(repo);
        let elem=document.createElement('a');
        elem.href=repo.html_url;
        elem.target='_blank';
        elem.classList.add('tags');
        elem.innerText=repo.name;
        // console.log(repo.name);
        // repoTags.appendChild(elem);
    });
}
// getRepos('codeitmywaywithHarsh07');

async function callUser(){
    let username=search.value;
    // console.log(username)
    if(username==''){
        return;
    }
    else{
        await getUser(username);
        search.value='';
    }
}

searchBtn.addEventListener('click',callUser);

// Automatically call when focus out
search.addEventListener('focusout',callUser);  

toggleColor.addEventListener('click',function(){
    document.body.classList.toggle('dark-theme');

    if(document.body.classList.contains('dark-theme')){
        text.innerHTML="Light";
        icon.classList.add('fa-sun');
        icon.classList.remove('fa-moon');
    }
    else{
        text.innerHTML="Dark";
        icon.classList.add('fa-moon');
        icon.classList.remove('fa-sun');

    }
});