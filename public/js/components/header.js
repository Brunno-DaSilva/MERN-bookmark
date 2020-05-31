class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="nav-bar">
          <ul>
            <li>
              <a href="/">
                <img
                  src="https://res.cloudinary.com/duprwuo4j/image/upload/c_scale,w_155/v1574831158/imgs_starwars/imgs/BLOGO_k36v5y.png"
                  alt="logo"
                />
              </a>
            </li>
            <li>
              <a href="/#">Home</a>
            </li>
            <li>
              <a href="https://github.com/DaSilvaBrunoTexas/MERN-bookmark">
                About the App
              </a>
            </li>
            <li>
              <a href="http://bruno-dasilva.com/">About me</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Header />, document.querySelector(".main-header"));
