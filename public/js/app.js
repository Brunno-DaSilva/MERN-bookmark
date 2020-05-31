const BookmarkList = (props) => {
  console.log(props);
  return (
    <tr>
      <td>{props.bookmark.title}</td>
      <td>
        <a href={props.bookmark.url} target="_blank">
          {props.bookmark.url}
        </a>
      </td>
      <td onClick={() => props.deleteBookmark(props.bookmark._id, props.index)}>
        <i class="fas fa-trash-alt"></i>
      </td>

      <td onClick={() => props.updateBookmarks(props.bookmark._id)}>
        <i class="fas fa-pencil-alt"></i>
      </td>
    </tr>
  );
};

class App extends React.Component {
  state = {
    title: "",
    url: "",
    bookmarks: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch("http://localhost:3000/bookmarks")
      .then((response) => response.json())
      .then((data) => this.setState({ bookmarks: data }));
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    fetch("/bookmarks", {
      body: JSON.stringify({
        title: this.state.title,
        url: this.state.url,
      }),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((createBookmark) => createBookmark.json())
      .then((newBookmark) => {
        this.setState({
          title: "",
          url: "",
          bookmarks: [newBookmark, ...this.state.bookmarks],
        });
      })
      .catch((error) => console.log(error));
  };

  deleteBookmark = (id, index) => {
    // console.log(id, index);
    fetch(`/bookmarks/${id}`, {
      method: "DELETE",
    }).then((data) => {
      this.setState({
        bookmarks: [
          //Slicing everything before and after the item to be deleted
          ...this.state.bookmarks.slice(0, index),
          ...this.state.bookmarks.slice(index + 1),
        ],
      });
    });
  };

  updateBookmarks = (bookmark) => {
    bookmark.complete = !bookmark.complete;

    fetch(`bookmarks/${bookmark._id}`, {
      body: JSON.stringify(bookmark),
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.getData();
      });
  };

  render() {
    return (
      <div className="bookmark-container">
        <div className="main-title">
          <h1>Bookmarks</h1>
        </div>

        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.title}
              id="title"
              onChange={this.handleChange}
              placeHolder="Site Name"
            />
            <input
              type="text"
              value={this.state.url}
              id="url"
              onChange={this.handleChange}
              placeHolder="Site URL: https://"
            />

            <input type="submit" />
          </form>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <th>Site Title</th>
              <th>Visit Site</th>
              <th className="danger">Remove</th>
              <th className="danger">Edit</th>
            </thead>
            <tbody>
              {this.state.bookmarks.map((bookmark, index) => {
                return (
                  <BookmarkList
                    bookmark={bookmark}
                    index={index}
                    deleteBookmark={this.deleteBookmark}
                    updateBookmarks={this.updateBookmarks}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
