const ApiKey = "0864896258de4af7b04c0b77b34491e7";
const baseUrl = "https://api.football-data.org/v2/";
const leagueId = "2021";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey
    }
};

function getListTeams() {
    title.innerHTML = "Daftar Tim Liga Primer Inggris"
    fetch(teamEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.teams);
            let teams = "";
            resJson.teams.forEach(team => {
                teams += `
                <li class="collection-item avatar">
                    <img src="${team.crestUrl}" alt="" class="circle">
                    <span class="title">${team.name}</span>
                    <p>Berdiri: ${team.founded} <br>
                       Markas: ${team.venue}
                    </p>
                    <a href="#DetailTeam" data-id="${team.id}" class="secondary-content"><i class="material-icons" data-id="${team.id}">info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + teams + '</ul>';
            const detail = document.querySelectorAll('.secondary-content');
            detail.forEach(btn => {
                btn.onclick = (event) => {
                    DetailTeam(event.target.dataset.id)
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function DetailTeam(id) {
    title.innerHTML = "PROFILE TEAM";
    let url = baseUrl + "teams/" + id

    fetch(url, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.squad)
            let teams = "";
            let i = 1;
            let Gambar = resJson.crestUrl;
            let Nama = resJson.name;
            let nama_pendek = resJson.shortName;
            let alamat = resJson.address;
            let kontak = resJson.phone;
            let Email = resJson.email;
            let berdiri = resJson.founded;
            let std = resJson.venue;
            let singkatan = resJson.tla;

            resJson.squad.forEach(data => {
                teams += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${data.name}</td>
                    <td>${data.position}</td>
                    <td>${data.dateOfBirth}</td>
                    <td>${data.countryOfBirth}</td>
                    <td>${data.nationality}</td>
                    <td>${data.shirtNumber}</td>
                    <td>${data.role}</td>
                </tr>
                `;
                i++;
            })

            contents.innerHTML = `
                <div class="card">
                        <table class="stripped responsive-table">
                        
                        <tr>
                            <td rowspan="10" width=7px>
                            <center><h5><b>${Nama}</b></h5></center>
                                <img src="${Gambar}" alt="" class="circle" width="300px">
                            </td>
                        </tr>   
                        <tr> 
                            <td>Nama</td>
                            <td>:</td>
                            <td>${nama_pendek}</td>  
                        </tr>
                        <tr> 
                            <td>Nama Singkatan</td>
                            <td>:</td>
                            <td>${singkatan}</td>  
                        </tr>       
                        <tr>
                            <td>Berdiri</td>
                            <td>:</td>
                            <td>${berdiri}</td>  
                        </tr>
                        <tr>
                            <td>Alamat</td>
                            <td>:</td>
                            <td>${alamat}</td>
                        </tr>
                        <tr>
                            <td>Kontak</td>
                            <td>:</td>
                            <td>${kontak}</td>
                        </tr>
                        <tr>
                            <td>E-mail</td>
                            <td>:</td>
                            <td>${Email}</td>
                        </tr>
                        <tr>
                            <td>Stadion</td>
                            <td>:</td>
                            <td>${std}</td> 
                        </tr>
                    </table>
                </div>

                <h5>DAFTAR PEMAIN</h5>
                <div class="card">
                    <table class="centered responsive-table">
                        <thead>
                            <th></th>
                            <th>Nama Pemain</th>
                            <th>Posisi</th>
                            <th>Tanggal Lahir</th>
                            <th>Domisili</th>
                            <th>Negara</th>
                            <th>Nomor Punggung</th>
                            <th>Role</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
        })
}


function getListStandings() {
    title.innerHTML = "Klasemen Sementara Liga Primer Inggris";
    fetch(standingEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.standings[0]);
            let teams = "";
            let i = 1;
            resJson.standings[0].table.forEach(team => {
                teams += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"></td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
                </tr>
                `;
                i++;
            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th></th>
                            <th>Nama Tim</th>
                            <th>PG</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getListMatches() {
    title.innerHTML = "Jadwal Pertandingan Liga Primer Inggris";
    fetch(matchEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.matches);
            let matchs = "";
            let i = 1;
            resJson.matches.forEach(match => {
                let d = new Date(match.utcDate).toLocaleDateString("id");
                let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
                let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
                matchs += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                    <td>${d}</td>
                    <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th>Peserta</th>
                            <th>Tanggal</th>
                            <th>Skor Akhir</th>
                        </thead>
                        <tbody>
                            ${matchs}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
            break;
        // case "teams":
        //     getDetailTeam(id);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});