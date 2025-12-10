import {writable, type Writable} from "svelte/store";
import {processImage, URL, username} from "$lib/index.js";

export async function accessProfile(): Promise<any> {
    const response = await fetch(`${URL}/user/profile`, {method: 'GET', credentials: "include"});
    const data = await response.json();

    if(response.status === 200) return data.userData;
    else if(response.status === 404) return data.error;
}

export async function accessOtherProfile(otherUser: string): Promise<any> {
    const response = await fetch(`${URL}/anon/profile/${otherUser}`, {method: 'GET', credentials: "include"});
    const data = await response.json();
}

export let profileMessages: Writable<any> = writable([]);
export let selectedMessage: Writable<any> = writable(null);

export async function accessProfileMessages(): Promise<any> {
    const response = await fetch(`${URL}/user/messages`, {method: 'GET', credentials: "include"});
    const data = await response.json();

    if(response.status === 200) return data.messages;
    else if(response.status === 404) return data.error;
}

export let inProgress: Writable<boolean> = writable(false);

// Since most account edits require similar logic, we can combine them into one function, reducing redundancy.
// A switch statement is used to determine which edit is being made based on the form's ID.
export async function editAccount(event: any): Promise<void> {
    event.preventDefault();
    inProgress.set(true);

    let url: string = "";
    let body: any;
    let noCheck: boolean = false;

    let post = event.currentTarget;

    switch(post.id) {
        case "change-username":
            if (post.username.value !== post["confirm-username"].value) {
                alert("Usernames do not match! Change aborted.");
                inProgress.set(false);
                return;
            }

            url = `${URL}/user/username`;
            body = JSON.stringify({ username: event.currentTarget.username.value });
            break;
        case "change-password":
            if (post.password.value !== post["confirm-password"].value) {
                alert("Passwords do not match!");
                inProgress.set(false);
                return;
            }

            url = `${URL}/user/password`;
            body = JSON.stringify({ password: event.currentTarget.password.value });
            break;
        case "change-email":
            if (post.email.value !== post["confirm-email"].value) {
                alert("Emails do not match!");
                inProgress.set(false);
                return;
            }

            url = `${URL}/user/email`;
            body = JSON.stringify({ email: event.currentTarget.email.value });
            break;
        case "change-profile-picture":
            url = `${URL}/user/profilePic`;

            const file = event.currentTarget.profilePic.files[0];
            let imageData: any;
            if(file) imageData = await processImage(file);

            console.log(imageData);

            body = JSON.stringify({
                image: {
                    filename: imageData.filename,
                    mimetype: imageData.mimeType,
                    data: imageData.data,
                },
            });

            console.log(body);

            noCheck = true;
            break;
        case "change-title":
            url = `${URL}/user/title`;
            body = JSON.stringify({ title: event.currentTarget.title.value });
            noCheck = true;
            break;
        case "change-description":
            url = `${URL}/user/description`;
            body = JSON.stringify({ description: event.currentTarget.description.value });
            noCheck = true;
            break;
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: body,
        });

        const responseBody = await response.json();
        if (!response.ok) alert(`${response.status}: ${responseBody.error || "Unknown error!"}`);
        else {
            if (noCheck) alert("Profile updated! Reload the page to see changes.");
            else alert("Email sent to verify the change.");
        }
    }
    catch (err: any) { alert(err?.message || String(err)); }
    finally { inProgress.set(false); }
}

export async function sendMessage(event: any): Promise<void> {
    let body = JSON.stringify({
        from: username,
        content: JSON.stringify(event.currentTarget.message.value),
        date: new Date().toLocaleString()
    })

    await fetch(`${URL}/user/message`, {method: "PUT", credentials: "include", body: body});
}