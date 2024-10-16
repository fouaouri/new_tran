//load and remove .css files
let index = 0;
let login = 0;


function removeCssFiles(){
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach(link => {
        link.parentNode.removeChild(link);
    });
}

function loadCssFile(cssFile, content){
    removeCssFiles();
    let existLink = document.querySelector(`link[href="${cssFile}"]`);
    if (!existLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        document.head.appendChild(link);
    }
    if (window.location.hash !== `#${content}`) {
        window.history.pushState({content, cssFile}, 'firstContent', `#${content}`);
    }
}

function HomeContent(){
    loadCssFile('../static/Css/Home.css', 'homeContent');
    var typed = new Typed(".dynamic-h1", {
        strings : ["A New Place <br> For Professional<br> Ping Pong <br> Gamers ."],
        typeSpeed : 50,
        showCursor: false
    })
    
    var typed = new Typed(".dynamic-h2", {
        strings : ["Experience the thrill of table tennis with our fast-paced Ping Pong Game! Master your skills, <br>compete with friends, and climb the leaderboards in this exciting arcade-style sports game."],
        typeSpeed : 20,
        startDelay: 4200,
        showCursor: false
    })
    document.getElementById('start').addEventListener('click', function() {
        LoadContent('gameContent');
    });
}

function GameContent(){
    loadCssFile('../static/Css/Game.css', 'gameContent');
    document.getElementById('to_tournoi').addEventListener('click', function() {
        LoadContent('tournoiContent');
    });
    document.getElementById('start').addEventListener('click', function() {
        LoadContent('ChooseGame');
    });
}

function SettingContent(){
    loadCssFile('../static/Css/Setting.css', 'settingContent');
    document.getElementById('Edit').addEventListener('click', function() {
        loadCssFile('../static/Css/Edit.css', 'EditContent');
        LoadContent('EditContent');
    });
}

function ChooseGame(){
    loadCssFile('../static/Css/ChooseGame.css', 'gameContent');
    document.getElementById('ping-pong').addEventListener('click', function() {
        loadCssFile('../static/Css/Ai.css', 'ChooseAi');
        LoadContent('ChooseAi');
    });
}

function EditContent(){
    loadCssFile('../static/Css/Edit.css', 'EditContent');
    document.getElementById('Avatar').addEventListener('click', function() {
        loadCssFile('../static/Css/avatar1.css', 'avatar1');
        LoadContent('Avatar1');
    });
}

function LoadContent(templateId){

    const template = document.getElementById(templateId);
    if (!template) {
        console.error(`Template with id "${templateId}" not found`);
        return;
    }
    const templateContent = template.content.cloneNode(true);
    const dynamicContent = document.getElementById('templates-area');
    dynamicContent.innerHTML = '';

    dynamicContent.appendChild(templateContent);
    if(templateId === 'openningContent'){
        loadCssFile('../static/Css/openning.css', 'openningContent');
        document.getElementById('clickme').addEventListener('click', function() {
            loadCssFile('../static/Css/first_page.css', 'firstContent');
            LoadContent('firstContent');
            
        });
    }
    // console.log(templateId);
    if(templateId === 'firstContent'){
        // console.log(666);
        document.getElementById('intra42-login-btn').addEventListener('click', function() {
            // console.log(555);
            const intra42LoginUrl = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-e5437d72a82b82ecee1a09bda3d32caf037304254c571cacb12bc31aed110266&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Faccounts%2F42intra%2Flogin%2Fcallback%2F&response_type=code";
            window.location.href = intra42LoginUrl;
            templateId = 'dataContent';
        });
    }
    if(templateId === 'dataContent'){
        loadCssFile('../static/Css/data_page.css', 'dataContent');
        LoadContent('dataContent');
    }
    if(templateId === 'homeContent')
        HomeContent();
    if(templateId === 'gameContent')
        GameContent();
    if(templateId === 'settingContent')
        SettingContent();
    if(templateId === 'ChooseGame')
        ChooseGame();
    if(templateId === 'EditContent')
        EditContent();
    if(templateId === 'tournoiContent')
        loadCssFile('../static/Css/Tournoi.css', 'tournoiContent');
        if(templateId === 'mobile'){
            document.getElementById('back-home').addEventListener('click', function() {
            LoadContent('homeContent');
        });
    }
    if(templateId === 'Avatar1' || templateId === 'Avatar2' ||templateId === 'Avatar3' || templateId === 'Avatar4'
     || templateId === 'Avatar5' || templateId === 'Avatar6' || templateId === 'Avatar7' || templateId === 'Avatar8'){
        const pages =[
            'Avatar1', 'Avatar2', 'Avatar3', 'Avatar4',
            'Avatar5', 'Avatar6', 'Avatar7', 'Avatar8'
        ];
        const csspages =[
            '../static/Css/avatar1.css', '../static/Css/avatar2.css', '../static/Css/avatar3.css', '../static/Css/avatar4.css',
            '../static/Css/avatar5.css', '../static/Css/avatar6.css', '../static/Css/avatar7.css', '../static/Css/avatar8.css'
        ];
        function rswapPage(){
            document.getElementById('r_click').addEventListener('click', function() {
                index = (index + 1) % pages.length;
                loadCssFile(csspages[index], pages[index]);
                LoadContent(pages[index]);
        });
        };
        function lswapPage(){
            document.getElementById('l_click').addEventListener('click', function() {
                index = (index - 1 + pages.length) % pages.length;
                loadCssFile(csspages[index], pages[index]);
                LoadContent(pages[index]);
            });
        };
        rswapPage();
        lswapPage();
    }
};

function checkWindowSize() {
    if (window.innerWidth <= 800) {
        loadCssFile('../static/Css/Mobile.css', 'mobile');
        LoadContent('mobile');
    }
}

window.addEventListener('resize', checkWindowSize);

window.addEventListener('hashchange', function() {
    const currentHash = window.location.hash.replace('#', '');
    LoadContent(currentHash);
});


// let tokens;
function checkTokenInCookies(tokenName) {
    // Split the cookies string into individual cookies
    const cookies = document.cookie.split('; ');
    console.log(cookies);
    // Loop through each cookie
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        
        // Split the cookie into name and value
        const [name, value] = cookie.split('=');
        
        // Check if the cookie name matches the token name you're looking for
        if (name === tokenName) {
            console.log(`Token found: ${value}`); // Token exists, do something with the value
            return true; // Return true if the token is found
        }
    }

    console.log('Token not found.');
    return false; // Return false if the token is not found
}
async function checkAuthentication() {

    let authenticated = false;
    try {
        const response = await fetch('http://localhost:8000/token/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const tokenExists = checkTokenInCookies(response);
        if (!tokenExists) {
            LoadContent('openningContent');
    
            // Proceed with authenticated actions
        } else {
            // Handle unauthenticated actions
            LoadContent('homeContent');
                document.getElementById('home').addEventListener('click', function() {
                    LoadContent('homeContent');
                });
                document.getElementById('game').addEventListener('click', function() {
                    LoadContent('gameContent');
                });
                document.getElementById('tournoi').addEventListener('click', function() {
                    LoadContent('tournoiContent');
                });
                document.getElementById('settings').addEventListener('click', function() {
                    LoadContent('settingContent');
                });
        }
        // const data = await response.json();
        // console.log('Response JSON:', data);
        // console.log('Tokens:', tokens);
        // if(data.refresh_token != null && data.refresh_token === tokens)
        //     authenticated = true;
        // localStorage.setItem('tokens', data.refresh_token);
        // data.refresh_token = null;
    } catch (error) {
        console.error('Error:', error);
    }

    // if(authenticated === false)
    //     LoadContent('openningContent');
    // else if (authenticated === true)
    //     {
    //         LoadContent('homeContent');
    //         document.getElementById('home').addEventListener('click', function() {
    //             LoadContent('homeContent');
    //         });
    //         document.getElementById('game').addEventListener('click', function() {
    //             LoadContent('gameContent');
    //         });
    //         document.getElementById('tournoi').addEventListener('click', function() {
    //             LoadContent('tournoiContent');
    //         });
    //         document.getElementById('settings').addEventListener('click', function() {
    //             LoadContent('settingContent');
    //         });
    //     }
}

document.addEventListener('DOMContentLoaded', function() {
    
    checkAuthentication();
    window.addEventListener('popstate', function(event) {
        if (event.state) {
            LoadContent(event.state.content);
            loadCssFile(event.state.cssFile, event.state.content);
        }
    });
    checkWindowSize();
        
});

