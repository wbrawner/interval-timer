function toggleSidebar() {
  const sidebar = document.getElementById('sidebar')
  if (sidebar.className === 'visible') {
    sidebar.className = ''
  } else {
    sidebar.className = 'visible'
  }
}

function newTimer() {
  console.warn('newTimer not yet implemented')
}
