document.getElementById('generateButton').addEventListener('click', function() {
  const namesTextarea = document.getElementById('names');
  const teamNumberInput = document.getElementById('teamNumber');
  const teamsContainer = document.getElementById('teamsContainer');
  
  teamsContainer.innerHTML = '';

  const names = namesTextarea.value.split(',').map(name => name.trim());
  const teamNumber = parseInt(teamNumberInput.value);

  if (names.length === 0 || teamNumber < 1) {
    alert('Please enter names and select a valid number of teams.');
    return;
  }

  const shuffledNames = shuffleArray(names);
  const teams = generateTeams(shuffledNames, teamNumber);
  

  teams.forEach((team, index) => {
    const teamElement = document.createElement('div');
    teamElement.classList.add('team');
    teamElement.innerHTML = `<h3>Team ${index + 1}</h3><ul>${team.join('')}</ul>`;
    teamsContainer.appendChild(teamElement);
  });
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateTeams(names, teamNumber) {
  const teams = new Array(teamNumber).fill().map(() => []);
  let currentTeamIndex = 0;
  
  names.forEach(name => {
    teams[currentTeamIndex].push(`<li>${name}</li>`);
    currentTeamIndex = (currentTeamIndex + 1) % teamNumber;
  });

  return teams;
}
