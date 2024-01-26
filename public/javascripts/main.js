let currentAdventureId = null 
let modelElement = document.getElementById('#editModal')

function openEditModal(event) {
  event.preventDefault();
}

function openDeleteModal(event, adventure) {
  currentAdventureId = adventure._id;
  event.preventDefault();
}

function handleDeleteAdventure() {
  fetch(`/adventures/${currentAdventureId}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => {
    console.log(res)
  })
  .then(msg => {
    console.log(msg)
  }).catch(e => console.error(e))
}