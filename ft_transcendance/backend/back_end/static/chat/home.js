
function checkWindowSize() {
    if (window.innerWidth <= 800) {
        window.location.href = "../../templates/Mobile.html";
    }
}

window.addEventListener('resize', checkWindowSize);

var typed = new Typed(".dynamic-h1", {
    strings : ["A New Place <br> For Professional<br> Ping Pong <br> Gamers ."],
    typeSpeed : 50,
    loope : true,
    backSpeed: 0

})

var typed = new Typed(".dynamic-h2", {
    strings : ["Experience the thrill of table tennis with our fast-paced Ping Pong Game! Master your skills, <br>compete with friends, and climb the leaderboards in this exciting arcade-style sports game."],
    typeSpeed : 20,
    startDelay: 4000,
    loope : true,
    backSpeed: 0
})

// setTimeout(function() {
//     console.log(5);
//     document.getElementById("button-container").style.display = "inline-block";
// }, 6000);
document.addEventListener('DOMContentLoaded', function() {
    checkWindowSize();
    document.getElementById('home').addEventListener('click', function() {
        window.location.href = '../../templates/Home_page.html'; 
    });
    
    document.getElementById('profile').addEventListener('click', function() {
        window.location.href = '../../templates/Profile_page.html'; 
    });
    document.getElementById('start').addEventListener('click', function() {
        window.location.href = '../../templates/Game_page.html'; 
    });
    document.getElementById('game').addEventListener('click', function() {
        window.location.href = '../../templates/Game_page.html'; 
    });
    
    document.getElementById('tournoi').addEventListener('click', function() {
        window.location.href = '../../templates/Tournoi_page.html'; 
    });
    
    document.getElementById('chat').addEventListener('click', function() {
        window.location.href = '../Chat_page/test_first_page.html'; 
    });
    
    document.getElementById('settings').addEventListener('click', function() {
        window.location.href = '../../templates/Setting_page.html'; 
    });
    
});

