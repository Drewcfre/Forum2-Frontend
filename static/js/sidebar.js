document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('sidebar-collapsed')

    document.getElementById('sidebar-label'   ).classList.toggle('visibility-hidden')
    document.getElementById('sidebar-search'  ).classList.toggle('visibility-hidden')
    document.getElementById('sidebar-sort'    ).classList.toggle('visibility-hidden')
    document.getElementById('sidebar-timespan').classList.toggle('visibility-hidden')

    document.getElementById('grid-toggle'   ).classList.toggle('visibility-hidden')
    document.getElementById('sidebar-toggle').classList.toggle('button-collapsed')

    document.getElementById('site-header' ).classList.toggle('header-expanded')
    document.getElementById('main-content').classList.toggle('content-expanded')
});

document.getElementById('grid-toggle').addEventListener('click', () => {
    document.getElementById('main-content').classList.toggle('content-grid')
})