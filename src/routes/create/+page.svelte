<main>
    <h1>Create a New Thread</h1>
    <form enctype="multipart/form-data" method="POST" action="/anon/catalog">
        <div>
            <label for="image">Image: </label>
            <input id="image" name="image" type="file" accept="image/*">
        </div>
        <div>
            <label for="board">Board:</label>
            <input type="text" id="board" name="board" required />
        </div>
        <div>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required />
        </div>
        <div>
            <label for="content">Content:</label>
            <textarea id="content" name="content"></textarea>
        </div>
        <button type="submit">Create Thread</button>
    </form>
</main>