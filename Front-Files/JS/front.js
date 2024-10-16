//load and remove .css files
let index = 0;
let login = 0;


function removeCssFiles(){
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach(link => {
        link.parentNode.removeChild(link);
    });
}

function loadCssFile(cssFile){
    removeCssFiles();
    let existLink = document.querySelector(`link[href="${cssFile}"]`);
    if (!existLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        document.head.appendChild(link);
    }
    // window.history.pushState({content, cssFile}, 'firstContent', `${content}`);
}

function navigateTo(content, cssFile, path) {
    history.pushState({ content, cssFile }, '', path);
    loadCssFile(cssFile);
}

function HomeContent(){
    // loadCssFile('../Css/Home.css', 'homeContent');
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
    if(templateId === 'firstContent'){
        // console.log(666);
        document.getElementById('intra42-login-btn').addEventListener('click', function() {
            // console.log(555);
            const intra42LoginUrl = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-e5437d72a82b82ecee1a09bda3d32caf037304254c571cacb12bc31aed110266&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Faccounts%2F42intra%2Flogin%2Fcallback%2F&response_type=code";
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


document.addEventListener('DOMContentLoaded', function() {
    
    window.addEventListener('popstate', function(event) {
        if (event.state) {
            LoadContent(event.state.content);
            loadCssFile(event.state.cssFile);
        }
    });
    checkWindowSize();
    //check_login_status();

    fetch('http://localhost:8000/api/check_login/', {
        method: 'GET',
        credentials: 'include', // This will send cookies with the request, if needed for session-based authentication
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to check login status');
    })
    .then(data => {
        if (data.isLoggedIn) {
            LoadContent('homeContent');
            // Update the UI or redirect the user
        } else {
            LoadContent('openningContent');
            // Show login button or handle unauthenticated state
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    LoadContent('openningContent');
    // if(login === 1){
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
       
    // }
    // document.getElementById('chat').addEventListener('click', function() {
    //     LoadContent('tournoiContent');
    // });
});

