//load and remove .css files
let index = 0;
let login = 0;


function removeCssFiles(){
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    console.log(stylesheets);
    stylesheets.forEach(link => {
        link.parentNode.removeChild(link);
    });
}

function loadCssFile(cssFile, additionalCssFile = null, additionalCssFile2 = null){
    removeCssFiles();
    let existLink = document.querySelector(`link[href="${cssFile}"]`);
    if (!existLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        document.head.appendChild(link);
    }
    if (additionalCssFile) {
        let existAdditionalLink = document.querySelector(`link[href="${additionalCssFile}"]`);
        if (!existAdditionalLink) {
            const additionalLink = document.createElement('link');
            additionalLink.rel = 'stylesheet';
            additionalLink.href = additionalCssFile;
            document.head.appendChild(additionalLink);
        }
    }
    if (additionalCssFile2) {
        let existAdditionalLink = document.querySelector(`link[href="${additionalCssFile2}"]`);
        if (!existAdditionalLink) {
            const additionalLink = document.createElement('link');
            additionalLink.rel = 'stylesheet';
            additionalLink.href = additionalCssFile2;
            document.head.appendChild(additionalLink);
        }
    }
    // window.history.pushState({content, cssFile}, 'firstContent', `${content}`);
}

function navigateTo(content, cssFile, path) {
    history.pushState({ content, cssFile }, '', path);
    
    // if(cssFile != '../Css/Chat.css')
    //     loadCssFile(cssFile);
    if(cssFile === '../Css/Chat.css')
        loadCssFile('../Css/Chat.css', '../Css/bootstrap.css', "https://fonts.googleapis.com/icon?family=Material+Icons");
    else
        loadCssFile(cssFile);
}

function HomeContent(){
    // loadCssFile('../Css/Home.css', 'homeContent');
    var typed = new Typed(".dynamic-h1", {
        strings : ["A New Place <br> For Professional<br> <span class='pingpong'>Ping Pong</span> <br> Gamers ."],
        typeSpeed : 50,
        showCursor: false
    })
    
    var typed = new Typed(".dynamic-h2", {
        strings : ["Experience the thrill of table tennis with our fast-paced Ping Pong Game! Master your skills, <br>compete with friends, and climb the leaderboards in this exciting arcade-style sports game."],
        typeSpeed : 20,
        startDelay: 4200,
        showCursor: false
    })
    document.getElementById('start').addEventListener('click', (e) => {
        e.preventDefault();
        LoadContent('gameContent');
        navigateTo('gameContent', '../Css/Game.css',  '/Game');
    });
}

function GameContent(){
    // loadCssFile('../Css/Game.css', 'gameContent');
    document.getElementById('to_tournoi').addEventListener('click', (e) => {
        e.preventDefault();
        LoadContent('tournoiContent');
        navigateTo('tournoiContent', '../Css/Tournoi.css',  '/Tournoi');

    });
    document.getElementById('start').addEventListener('click', (e) => {
        e.preventDefault();
        LoadContent('ChooseGame');
        navigateTo('ChooseGame', '../Css/ChooseGame.css',  '/ChooseGame');

    });
}

function SettingContent(){
    // loadCssFile('../Css/Setting.css', 'settingContent');
    document.getElementById('Edit').addEventListener('click', (e) => {
        e.preventDefault();
        LoadContent('EditContent');
        navigateTo('EditContent', '../Css/Edit.css',  '/Edit');
    });
}

function ChooseGame(){
    // loadCssFile('../Css/ChooseGame.css', 'gameContent');
    document.getElementById('ping-pong').addEventListener('click', (e) => {
        e.preventDefault();
        LoadContent('ChooseAi');
        navigateTo('ChooseAi', '../Css/Ai.css',  '/AiorPlayer'); 
    });
    document.getElementById('star-wars').addEventListener('click', (e) => {
        e.preventDefault();
        LoadContent('StarWars');
        navigateTo('StarWars', '../Css/StarWars.css',  '/StarWars');
    });
}

function Aigame(){
    // loadCssFile('../Css/ChooseGame.css', 'gameContent');
    document.getElementById('playAI').addEventListener('click', (e) => {
        e.preventDefault();
        LoadContent('AIgame');
        navigateTo('AIgame', '../Css/3d.css',  '/AIgame');     
    });
}
function EditContent(){
    // loadCssFile('../Css/Edit.css', 'EditContent');
    document.getElementById('Avatar').addEventListener('click', (e) => {
        e.preventDefault();
        LoadContent('Avatar1');
        navigateTo('Avatar1', '../Css/avatar1.css',  '/Avatar1');

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
        navigateTo('openningContent', '../Css/openning.css',  '/OpeningPage');


        document.getElementById('clickme').addEventListener('click', (e) => {
        // console.log(666);

        //// check if the user is alredy login 
        
                // sent request to the backend to check if the user is login or not 
        
        //the user is not login yet
            // loadCssFile('../Css/first_page.css', 'firstContent');
            LoadContent('firstContent');
            navigateTo('firstContent', '../Css/first_page.css',  '/LoginPage')
        });
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
    if(templateId=== 'ChooseAi')
        Aigame();
    if(templateId === 'firstContent'){
        
        document.getElementById('intra42-login-btn').addEventListener('click', function() {
            // console.log(555);
            const intra42LoginUrl = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-a0d438e24b0c9119435025d9a17ae929ed3e2c3be61964f9b3d0dffbd9d314c7&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Faccounts%2F42intra%2Flogin%2Fcallback%2F&response_type=code";
            window.location.href = intra42LoginUrl;
            templateId = 'dataContent';
        });
    }
    if(templateId === 'tournoiContent')
        // loadCssFile('../Css/Tournoi.css', 'tournoiContent');
        if(templateId === 'mobile'){
            document.getElementById('back-home').addEventListener('click', (e) => {
                e.preventDefault();
                LoadContent('homeContent');
                navigateTo('homeContent', '../Css/Home.css',  '/Home');

        });
    }
    if(templateId === 'Avatar1' || templateId === 'Avatar2' ||templateId === 'Avatar3' || templateId === 'Avatar4'
     || templateId === 'Avatar5' || templateId === 'Avatar6' || templateId === 'Avatar7' || templateId === 'Avatar8'){
        const pages =[
            'Avatar1', 'Avatar2', 'Avatar3', 'Avatar4',
            'Avatar5', 'Avatar6', 'Avatar7', 'Avatar8'
        ];
        const csspages =[
            '../Css/avatar1.css', '../Css/avatar2.css', '../Css/avatar3.css', '../Css/avatar4.css',
            '../Css/avatar5.css', '../Css/avatar6.css', '../Css/avatar7.css', '../Css/avatar8.css'
        ];
        function rswapPage(){
            document.getElementById('r_click').addEventListener('click', (e) => {
                index = (index + 1) % pages.length;
                e.preventDefault();
                LoadContent(pages[index]);
                navigateTo(pages[index], csspages[index],  `/${pages[index]}`);


        });
        };
        function lswapPage(){
            document.getElementById('l_click').addEventListener('click', (e) => {
                index = (index - 1 + pages.length) % pages.length;
                e.preventDefault();
                LoadContent(pages[index]);
                navigateTo(pages[index], csspages[index],  `/${pages[index]}`);

            });
        };
        rswapPage();
        lswapPage();
    }
};

function checkWindowSize() {
    if (window.innerWidth <= 800) {
        // loadCssFile('../Css/Mobile.css', 'mobile');
        LoadContent('mobile');
        navigateTo('mobile', '../Css/Mobile.css',  'mobile');
    }
}

window.addEventListener('resize', checkWindowSize);

// function saveUser(newUser) {
//     let users = JSON.parse(localStorage.getItem('loggedInUsers')) || [];
//     users.push(newUser);
//     console.log("storage : " + users);
//     localStorage.setItem('loggedInUsers', JSON.stringify(users));
// }

function checkLoginStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const loginSuccess = urlParams.get('login_success');
    const newUser = urlParams.get('User');
    console.log("loginSuccess : " + loginSuccess);
    console.log("User : " + newUser);
    // saveUser(newUser);
    let users = JSON.parse(localStorage.getItem('loggedInUsers')) || [];
    const userExists = users.includes(newUser);
    console.log("storage : " + users);

    if (loginSuccess === 'True' && userExists) {
        // The user is successfully logged in, proceed to the logged-in UI
        LoadContent('homeContent');  // For example, load the home page content
    } else {
        users.push(newUser);
        localStorage.setItem('loggedInUsers', JSON.stringify(users));
        // Show login page or prompt to log in again
        LoadContent('openningContent');
    }
}

function checkUserLoginFromBackend() {
    fetch('http://localhost:8000/api/check-authentication/', {  // Your Django backend endpoint
        method: 'GET',
        credentials: 'include',  // This is important for including session cookies
    })
    .then(response => response.json())
    .then(data => {
        if (data.isLoggedIn) {
            console.log("User is authenticated!");
            navigateTo('homeContent', '../Css/Home.css',  '/Home');
            LoadContent('homeContent');
            document.getElementById('home').addEventListener('click', (e) => {
                e.preventDefault();
                LoadContent('homeContent');
                navigateTo('homeContent', '../Css/Home.css',  '/Home');
            });
            document.getElementById('game').addEventListener('click', (e) => {
                e.preventDefault();
                LoadContent('gameContent');
                navigateTo('gameContent', '../Css/Game.css',  '/Game');
    
            });
            document.getElementById('tournoi').addEventListener('click', (e) => {
                e.preventDefault();
                LoadContent('tournoiContent');
                navigateTo('tournoiContent', '../Css/Tournoi.css',  '/Tournoi');
    
            });
            document.getElementById('settings').addEventListener('click', (e) => {
                e.preventDefault();
                LoadContent('settingContent');
                navigateTo('settingContent', '../Css/Setting.css',  '/Settings');
            });
            document.getElementById('Chat').addEventListener('click', (e) => {
                e.preventDefault();
                LoadContent('ChatContent');
                navigateTo('ChatContent', '../Css/Chat.css', '/Chat');
            });
        } 
        else {
            console.log(data.isLoggedIn);
            console.log("User is not authenticated");
            LoadContent('openningContent');
        }
    })
    .catch(error => {
        console.error('Error checking login status:', error);
        LoadContent('openningContent');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    
    window.addEventListener('popstate', function(event) {
        if (event.state) {
            LoadContent(event.state.content);
            loadCssFile(event.state.cssFile);
        }
    });
    checkWindowSize();
    checkUserLoginFromBackend();
    // document.getElementById('chat').addEventListener('click', function() {
    //     LoadContent('tournoiContent');
    // });
});

