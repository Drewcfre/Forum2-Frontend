document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('sidebar-collapsed')

    document.getElementById('sidebar-label'   ).classList.toggle('visibility-hidden')
    document.getElementById('sidebar-search'  ).classList.toggle('visibility-hidden')
    document.getElementById('sidebar-sort'    ).classList.toggle('visibility-hidden')
    document.getElementById('sidebar-timespan').classList.toggle('visibility-hidden')

    document.getElementById('grid-toggle'   ).classList.toggle('visibility-hidden')
    document.getElementById('sidebar-toggle').classList.toggle('button-collapsed')

    document.getElementById('nav-boards').classList.toggle('visibility-hidden')

    const anchorTags = [
        [document.getElementById('ba1'), "<img src='/images/home.svg' alt='Main' width='30' height='30'>", "Main"],
        [document.getElementById('ba2'), "<img src='/images/anime.svg' alt='Anime' width='30' height='30'>", "Anime"],
        [document.getElementById('ba3'), "<img src='/images/cooking.svg' alt='Cooking' width='30' height='30'>", "Cooking"],
        [document.getElementById('ba4'), "<img src='/images/fitness.svg' alt='Fitness' width='30' height='30'>", "Fitness"],
        [document.getElementById('ba5'), "<img src='/images/technology.svg' alt='Technology' width='30' height='30'>", "Technology"],
        [document.getElementById('ba6'), "<img src='/images/video-games.svg' alt='Video Games' width='30' height='30'>", "Video Games"],

        [document.getElementById('bb1'), "<img src='/images/create.svg' alt='Create Thread' width='30' height='30'>", "Create Thread"],
    ]

    const profileAnchor = document.getElementById('bb2')
    if(profileAnchor) anchorTags.push([profileAnchor, "<img src='/images/user.svg' alt='User' width='30' height='30'>", "Profile"])

    const logoutAnchor = document.getElementById('bb3')
    if(logoutAnchor) anchorTags.push([logoutAnchor, "<img src='/images/logout.svg' alt='Logout' width='30' height='30'>", "Logout"])
    
    const loginAnchor = document.getElementById('bb4')
    if(loginAnchor) anchorTags.push([loginAnchor, "<img src='/images/sign-in.svg' alt='Login' width='30' height='30'>", "Login"])

    const signupAnchor = document.getElementById('bb5')
    if(signupAnchor) anchorTags.push([signupAnchor, "<img src='/images/sign-up.svg' alt='Sign Up' width='30' height='30'>", "Sign Up"])

    const adminBoard = document.getElementById('ba7')
    if(adminBoard) anchorTags.push([adminBoard, "<img src='/images/admin.svg' alt='Admin' width='30' height='30'>", "Admin"])


    let anchorIndex = 2
    if(document.getElementById('nav-boards').classList.contains('visibility-hidden')) anchorIndex = 1
    anchorTags.forEach(anchorTag => anchorTag[0].innerHTML = anchorTag[anchorIndex])

    document.getElementById('nav-account').classList.toggle('visibility-hidden')

    document.getElementById('site-header' ).classList.toggle('header-expanded')
    document.getElementById('main-content').classList.toggle('content-expanded')
});

document.getElementById('grid-toggle').addEventListener('click', () => {
    document.getElementById('main-content').classList.toggle('content-grid')
    document.getElementById('main-content').classList.toggle('thread-grid')
})