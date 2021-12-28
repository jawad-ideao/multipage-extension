### 📝 Installation Requirements:

- Install git (https://git-scm.com/download/win)
- Install Nodejs (https://nodejs.org/en/download/)
- Install MongoDB (https://docs.mongodb.com/manual/installation/)
  - Alternative, Use MongoDB Atlas (MongoURI) for online database management (https://www.mongodb.com/cloud/atlas)
- ReactJS (https://reactjs.org/docs/getting-started.html)

## 🛠️ Installation Steps

1. Clone the repository

```bash
git clone (RepoLink)
```

2. Change the working directory

```bash
cd Dev-Essentials
```

3. Install dependencies

```bash
npm install
```

4. Build the app

```bash
npm run build
```

You are all set! Open [localhost:8080/popup.html](http://localhost:8080/popup.html) to see the popup screen.

## 🎉 Load Extension to Chrome

1. Build in Production

```bash
npm run build:prod
```

2. Go to [chrome://extensions/](chrome://extensions/) in your browser.

3. Toggle Developer Mode, from top Right.

4. Click on **Load Unpack.**

5. Select **Dist/** folder.

Wohoo 🥳, we you have made our own Chrome Extention.
