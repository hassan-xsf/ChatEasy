![Logo](https://res.cloudinary.com/drirwwvdw/image/upload/v1724098085/rtfjezyofnjjmsnppfeh.png)

# EasyChat v0.1 🎉

## Prerequisites 🛠️

- **Node.js**
- **React**
- **MongoDB**
- **Typescript**

## Installation 🚀

1. **Clone the repository:**

    ```bash
    git clone https://github.com/hassan-xsf/ChatEasy.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd client
    cd server
    ```

3. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

4. **Set up environment variables for backend:**

    Create a `.env` file in the *server* directory of the project and add the following variables:

    ```env
    PORT=XXXX
    MONGODB_URI=XXXX
    MONGODB_NAME=chatEasy
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET=XXXX
    ACCESS_TOKEN_EXPIRY=1d
    NODE_ENV=development
    ```

5. **Run the application:**

    ```bash
    npm start
    # or
    yarn start
    ```

    By default server proxy settings are `http://localhost:8000`, Change it from vite.config.ts.

## How to Contribute 🤝

1. **Fork the repository**: Click the "Fork" button at the top right of the repository page on GitHub.

2. **Create a feature branch**:

    ```bash
    git checkout -b feature/your-feature
    ```

3. **Make your changes**: Edit or add files as needed.

4. **Commit your changes**:

    ```bash
    git commit -am 'Add new feature'
    ```

5. **Push to the branch**:

    ```bash
    git push origin feature/your-feature
    ```

6. **Create a Pull Request**: Go to the GitHub repository and click "New Pull Request."

**NOTE**: This project was made a practice project just to experiment with Web Sockets, Took it too far.
Got bored, So couldn't focus on more but there's so much that can be implemented.
