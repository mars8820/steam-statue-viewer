const apiKey = 'XXX'; //APIKEY//

function fetchSteamProfile() {
    const steamID = document.getElementById('steamID').value;
    const profileUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamID}`;

    fetch(profileUrl)
        .then(response => response.json())
        .then(data => {
            if (data.response.players.length > 0) {
                const player = data.response.players[0];
                document.getElementById('profileInfo').innerHTML = `
                    <p>user ID: ${player.personaname}</p>
                    <p>Personal Information Links: <a href="${player.profileurl}" target="_blank">Click to visit</a></p>
                    <img src="${player.avatarfull}" alt="avatar" style="width:100px; height:100px;">
                `;
                if (player.gameid && player.gameextrainfo) {
                    document.getElementById('currentGameInfo').innerHTML = `
                        <p>Currently playing: ${player.gameextrainfo}</p>
                    `;
                } else {
                    document.getElementById('currentGameInfo').innerHTML = '<p>Not currently playing the game。</p>';
                }
            } else {
                throw new Error('未找到相关用户信息');
            }
        })
        .catch(error => {
            document.getElementById('profileInfo').innerHTML = `<p>Error: ${error.message}</p>`;
            document.getElementById('currentGameInfo').innerHTML = '';
        });
}